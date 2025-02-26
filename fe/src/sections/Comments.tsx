import React, { useEffect, useState } from "react";
import { useCommentApi, CommentRequestModel, CommentResponseModel } from "../api/useCommentApi";
import "./Comments.css";
import Section from "../Section";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight, FaTrash, FaCheck } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "../shared/useAxiosInstance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Comments = () => {
  const { t } = useTranslation();
  const { fetchAllComments, createComment, deleteComment, approveComment } = useCommentApi();
  const [approvedComments, setApprovedComments] = useState<CommentResponseModel[]>([]);
  const [pendingComments, setPendingComments] = useState<CommentResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState({ title: "", comment: "" });
  const { user } = useAuth0();
  const isAdmin = user?.email === "admin@pt.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllComments();
        console.log("Fetched raw comments after reload:", JSON.stringify(data, null, 2)); // 🔥 Full data structure
  
        setApprovedComments(data.filter(comment => comment.isApproved === true || comment.approved === true));
setPendingComments(data.filter(comment => comment.isApproved === false || comment.approved === false));

  
        console.log("Approved comments after filtering:", approvedComments);
        console.log("Pending comments after filtering:", pendingComments);
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

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setApprovedComments(prev => prev.filter(comment => comment.commentId !== commentId));
      setPendingComments(prev => prev.filter(comment => comment.commentId !== commentId));
      toast.success("Comment deleted successfully!");

    } catch (error) {
      console.error("Error deleting comment:", error);
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
  
      console.log("Updated state after approval:", { approvedComments, pendingComments });
      toast.success("Comment approved!");

    } catch (error) {
      console.error("Error approving comment:", error);
    }
  };
  
  
  

  const PrevArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <FaArrowLeft
        className={className}
        style={{ ...style, display: "block", color: "black", fontSize: "28px", left: "-55px" }}
        onClick={onClick}
      />
    );
  };

  const NextArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <FaArrowRight
        className={className}
        style={{ ...style, display: "block", color: "black", fontSize: "28px", right: "-55px" }}
        onClick={onClick}
      />
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="comments-section">
      <Section id="comments" title={t("comments.title")}>
        
        {!isAdmin && <button className="add-comment-btn" onClick={() => setShowModal(true)}>+</button>}

        {/* Approved Comments Section (Visible to Everyone) */}
        {approvedComments.length > 0 ? (
          <Slider {...settings} className="comments-carousel">
            {approvedComments.map((comment) => (
              <div key={comment.commentId} className="comment-card">
                <h3>{comment.title}</h3>
                <p>{comment.comment}</p>
                {isAdmin && <button className="delete-btn" onClick={() => handleDelete(comment.commentId)}>
                      <FaTrash />
                    </button>}
              </div>
            ))}
          </Slider>
        ) : (
          <p className="no-comments">{t("comments.noComments")}</p>
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
                    <button className="delete-btn" onClick={() => handleDelete(comment.commentId)}>
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

      {/* Add Comment Modal (Only for Non-Admins) */}
      {!isAdmin && showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{t("comments.title")}</h2>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder={t("comments.placeholderTitle")}
                value={newComment.title}
                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                required
              />
              <textarea
                placeholder={t("comments.title")}
                value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                required
              />
              <div className="modal-buttons">
                <button type="submit">{t("comments.submit")}</button>
                <button type="button" onClick={() => setShowModal(false)}>{t("comments.cancel")}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
