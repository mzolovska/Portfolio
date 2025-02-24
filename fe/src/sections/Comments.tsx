import React, { useEffect, useState } from "react";
import { useCommentApi, CommentRequestModel } from "../api/useCommentApi";
import "./Comments.css";
import Section from "../Section";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";


const Comments = () => {
  const { t } = useTranslation();

  const { fetchAllComments, createComment } = useCommentApi();
  const [comments, setComments] = useState<CommentRequestModel[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [newComment, setNewComment] = useState({ title: "", comment: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllComments();
        console.log("Fetched comments:", data); // Debugging
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, []);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.title.trim() || !newComment.comment.trim()) return; // Prevent empty submission

    try {
      const createdComment = await createComment(newComment);
      console.log("Created comment:", createdComment); // Debugging
      setComments((prev) => [...prev, createdComment]);
      setShowModal(false);
      setNewComment({ title: "", comment: "" }); // Reset form
    } catch (error) {
      console.error("Error adding comment:", error);
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
    slidesToShow: 3, // Show 3 comments at a time on large screens
    slidesToScroll: 1, // Scroll one comment at a time
    autoplay: true,
    autoplaySpeed: 3000,
    initialSlide: 0, // Start at the first comment
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Show 2 comments at a time on medium screens
          slidesToScroll: 1, // Scroll one at a time
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1, // Show 1 comment at a time on small screens
          slidesToScroll: 1, // Scroll one at a time
        },
      },
    ],
  };
  
  return (
    <div className="comments-section">
    <Section id="comments" title={t("comments.title")}>
    <button className="add-comment-btn" onClick={() => setShowModal(true)}>+</button>

        {/* Comments Carousel */}
        {comments.length > 0 ? (
          <Slider {...settings} className="comments-carousel">
            {comments.map((comment, index) => (
              <div key={index} className="comment-card">
                <h3>{comment.title}</h3>
                <p>{comment.comment}</p>
              </div>
            ))}
          </Slider>
        ) : (
          <p className="no-comments">{t("comments.noComments")}</p>
        )}
      </Section>

      {/* Add Comment Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Add a Comment</h2>
            <form onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder={t("comments.placeholderTitle")}
                value={newComment.title}
                onChange={(e) => setNewComment({ ...newComment, title: e.target.value })}
                required
              />
              <textarea
              placeholder={t("comments.placeholderComment")}
              value={newComment.comment}
                onChange={(e) => setNewComment({ ...newComment, comment: e.target.value })}
                required
              />
              <div className="modal-buttons">
              <button type="submit">{t("comments.submit")}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Comments;
