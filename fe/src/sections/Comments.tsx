import { useEffect, useState } from "react";
import { useCommentApi, CommentResponseModel, CommentRequestModel } from "../api/useCommentApi";
import { AdminControls } from "./AdminControls";

const Comments = () => {
  const { fetchAllComments, createComment, updateComment, deleteComment } = useCommentApi();
  const [comments, setComments] = useState<CommentResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllComments();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async (newData: CommentRequestModel) => {
    try {
      const createdComment = await createComment(newData);
      setComments((prev) => [...prev, createdComment]);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleModify = async (updatedData: CommentResponseModel) => {
    try {
      const updatedComment = await updateComment(updatedData.commentId, {
        title: updatedData.title,
        comment: updatedData.comment,
      });

      setComments((prev) =>
        prev.map((c) => (c.commentId === updatedComment.commentId ? updatedComment : c))
      );
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.commentId !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div>
      <h2>Comments</h2>

      {/* User Add Comment Form */}
      <AdminControls
        entityType="Comment"
        fields={[
          { key: "title", label: "Title" },
          { key: "comment", label: "Comment" },
        ]}
        onAdd={handleAdd}
        isSection={true} // This ensures the form is only for adding new comments
      />

      {/* List of Comments */}
      {comments.length > 0 ? (
        comments.map((commentData) => (
          <div key={commentData.commentId} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
            <p><strong>{commentData.title}</strong></p>
            <p>{commentData.comment}</p>

            {/* Admin Controls for Modify/Delete */}
            <AdminControls
              entity={commentData}
              entityType="Comment"
              fields={[
                { key: "title", label: "Title" },
                { key: "comment", label: "Comment" },
              ]}
              onModify={handleModify}
              onDelete={handleDelete}
            />
          </div>
        ))
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default Comments;
