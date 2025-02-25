import React, { useEffect, useState } from "react";
import { useCommentApi, CommentRequestModel, CommentResponseModel } from "../api/useCommentApi";
import "./Comments.css";
import Section from "../Section";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { AdminControls } from "./AdminControls";
import { useAuth0 } from "@auth0/auth0-react";
import axiosInstance from "../shared/useAxiosInstance"; // ✅ Import axios instance correctly

const Comments = () => {
  const { t } = useTranslation();
  const { fetchAllComments, createComment, updateComment, deleteComment } = useCommentApi();
  const [comments, setComments] = useState<CommentResponseModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState({ title: "", comment: "" });
  const { user } = useAuth0();
  const isAdmin = user?.email === "admin@pt.com";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllComments();
        console.log("Fetched comments from API:", data); // Debugging log
        if (Array.isArray(data)) {
          setComments(data); // Ensure only valid data updates state
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    fetchData();
  }, []); // No dependency array change needed
  

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.title.trim() || !newComment.comment.trim()) return;

    try {
      const createdComment = await createComment(newComment);
      setComments((prev) => [...prev, createdComment]);
      setShowModal(false);
      setNewComment({ title: "", comment: "" });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleModify = async (updatedData: CommentResponseModel) => {
    try {
      const updated = await updateComment(updatedData.commentId, {
        title: updatedData.title,
        comment: updatedData.comment,
      });

      setComments((prev) =>
        prev.map((comment) => (comment.commentId === updated.commentId ? updated : comment))
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      console.log("Deleting comment with ID:", commentId);
      
      await axiosInstance.delete(`/comments/${commentId}`);
      
      // ✅ Only remove the deleted comment
      setComments((prevComments) => 
        prevComments.filter(comment => comment.commentId !== commentId)
      );
  
      console.log("✅ Comment deleted successfully");
    } catch (error) {
      console.error("❌ Error deleting comment:", error);
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
    slidesToScroll: 1,  // 👈 This should be 1 for smooth scrolling
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1, // 👈 This should be 1
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1, // 👈 This ensures one comment per scroll
        },
      },
    ],
  };
  

  return (
    <div className="comments-section">
      <Section id="comments" title={t("comments.title")}>

        {/* Only show add button if user is NOT an admin */}
        {!isAdmin && (
          <button className="add-comment-btn" onClick={() => setShowModal(true)}>+</button>
        )}

        {comments.length > 0 ? (
          <Slider {...settings} className="comments-carousel">
            {comments.map((comment) => (
              <div key={comment.commentId} className="comment-card">
                <h3>{comment.title}</h3>
                <p>{comment.comment}</p>

                {/* 🔧 Admin Controls (Only Modify & Delete) */}
                {isAdmin && (
                  <AdminControls
                    entity={comment}
                    entityType={t("comments.title")}
                    fields={[
                      { key: "title", label: t("comments.placeholderTitle") },
                      { key: "comment", label: t("comments.title") },
                    ]}
                    onModify={handleModify}
                    onDelete={() => handleDelete(comment.commentId)}
                  />
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <p className="no-comments">{t("comments.noComments")}</p>
        )}
      </Section>

      {/* Add Comment Modal (Only for non-admin users) */}
      {!isAdmin && showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{t("comments.title")}</h2>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder={t("comments.title")}
                value={newComment.title}
                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                required
              />
              <textarea
                placeholder={t("comments.comment")}
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
