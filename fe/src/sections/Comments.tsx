import React, { useEffect, useState } from "react";
import { useCommentApi, CommentRequestModel, CommentResponseModel } from "../api/useCommentApi";
import "./Comments.css";
import Section from "../Section";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaTrash, FaCheck } from "react-icons/fa";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = () => {
  const { fetchAllComments, createComment, deleteComment, approveComment } = useCommentApi();
  const [approvedComments, setApprovedComments] = useState<CommentResponseModel[]>([]);
  const [pendingComments, setPendingComments] = useState<CommentResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState({ title: "", comment: "" });
  const { user } = useAuth0();
  const isAdmin = user?.email === "admin@pt.com";

  // 🔥 State for delete confirmation modal
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; commentId: string | null }>({
    show: false,
    commentId: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllComments();
        setApprovedComments(data.filter(comment => comment.isApproved === true || comment.approved === true));
        setPendingComments(data.filter(comment => comment.isApproved === false || comment.approved === false));
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.title.trim() || !newComment.comment.trim()) return;

    try {
      await createComment(newComment);
      setShowModal(false);
      setNewComment({ title: "", comment: "" });
      toast.success("Your comment has been sent for approval!");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm.commentId) return;

    try {
      await deleteComment(deleteConfirm.commentId);
      setApprovedComments(prev => prev.filter(comment => comment.commentId !== deleteConfirm.commentId));
      setPendingComments(prev => prev.filter(comment => comment.commentId !== deleteConfirm.commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      console.error("Error deleting comment:", error);
    } finally {
      setDeleteConfirm({ show: false, commentId: null }); // Close modal after deleting
    }
  };

  const handleApprove = async (commentId: string) => {
    try {
      await approveComment(commentId);
      setPendingComments(prev => prev.filter(comment => comment.commentId !== commentId));
      setApprovedComments(prev => {
        const approvedComment = pendingComments.find(comment => comment.commentId === commentId);
        return approvedComment ? [...prev, { ...approvedComment, isApproved: true }] : prev;
      });
      toast.success("Comment approved!");
    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };

  const PrevArrow = (props: any) => (
    <FaArrowLeft className={props.className} style={{ ...props.style, display: "block", color: "black", fontSize: "28px", left: "-55px" }} onClick={props.onClick} />
  );

  const NextArrow = (props: any) => (
    <FaArrowRight className={props.className} style={{ ...props.style, display: "block", color: "black", fontSize: "28px", right: "-55px" }} onClick={props.onClick} />
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="comments-section">
      <Section id="comments" title={"Comments"}>
        
        {!isAdmin && <button className="add-comment-btn" onClick={() => setShowModal(true)}>+</button>}

        {/* Approved Comments Section */}
        {approvedComments.length > 0 ? (
          <Slider {...settings} className="comments-carousel">
            {approvedComments.map((comment) => (
              <div key={comment.commentId} className="comment-card">
                <h3>{comment.title}</h3>
                <p>{comment.comment}</p>
                {isAdmin && (
                  <button className="delete-btn" onClick={() => setDeleteConfirm({ show: true, commentId: comment.commentId })}>
                    <FaTrash />
                  </button>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <p className="no-comments">No comments yet.</p>
        )}

        {/* Pending Comments Section (Only for Admins) */}
        {isAdmin && (
          <>
            <h2>Pending Comments</h2>
            {pendingComments.length > 0 ? (
              <div className="pending-comments">
                {pendingComments.map((comment) => (
                  <div key={comment.commentId} className="comment-card">
                    <h3>{comment.title}</h3>
                    <p>{comment.comment}</p>
                    <button className="approve-btn" onClick={() => handleApprove(comment.commentId)}>
                      <FaCheck />
                    </button>
                    <button className="delete-btn" onClick={() => setDeleteConfirm({ show: true, commentId: comment.commentId })}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p>No pending comments.</p>
            )}
          </>
        )}
      </Section>


      {!isAdmin && showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Comment</h2>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder={"Name"}
                value={newComment.title}
                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                required
              />
              <textarea
                placeholder={"Comment"}
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* 🛑 Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm({ show: false, commentId: null })}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Are you sure?</h2>
            <p>Do you really want to delete this comment? This action cannot be undone.</p>
            <div className="modal-buttons">
              <button className="confirm-btn" onClick={handleDelete}>Yes, Delete</button>
              <button className="cancel-btn" onClick={() => setDeleteConfirm({ show: false, commentId: null })}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;

