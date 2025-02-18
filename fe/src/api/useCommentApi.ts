import { useAxiosInstance } from "../shared/useAxiosInstance"; // ✅ Import axios instance correctly

export interface CommentResponseModel {
  commentId: string;
  title: string;
  comment: string;
}

export interface CommentRequestModel {
  title: string;
  comment: string;
}

export const useCommentApi = () => {
  const axiosInstance = useAxiosInstance();

  // Fetch All Comments (SSE Stream)
  const fetchAllComments = async (): Promise<CommentResponseModel[]> => {
    const comments: CommentResponseModel[] = [];
    const response = await axiosInstance.get("/comments", {
      responseType: "text",
      headers: {
        Accept: "text/event-stream",
      },
    });

    const lines = response.data.split("\n");
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("data:")) {
        try {
          const comment = JSON.parse(trimmedLine.substring(5).trim());
          comments.push(comment);
        } catch (error) {
          console.error("Error parsing SSE event:", trimmedLine, error);
        }
      }
    }

    return comments;
  };

  // Fetch Comment by ID
  const fetchCommentById = async (commentId: string): Promise<CommentResponseModel> => {
    const response = await axiosInstance.get<CommentResponseModel>(`/comments/${commentId}`);
    return response.data;
  };

  // Create Comment
  const createComment = async (comment: CommentRequestModel): Promise<CommentResponseModel> => {
    const response = await axiosInstance.post<CommentResponseModel>("/comments", comment);
    return response.data;
  };

  // Update Comment
  const updateComment = async (commentId: string, comment: CommentRequestModel): Promise<CommentResponseModel> => {
    console.log(`Updating comment with ID: ${commentId}`, comment);
  
    const response = await axiosInstance.put<CommentResponseModel>(`/comments/${commentId}`, comment);
    return response.data;
  };
  

  // Delete Comment
  const deleteComment = async (commentId: string): Promise<void> => {
    await axiosInstance.delete(`/comments/${commentId}`);
  };

  return {
    fetchAllComments,
    fetchCommentById,
    createComment,
    updateComment,
    deleteComment,
  };
};
