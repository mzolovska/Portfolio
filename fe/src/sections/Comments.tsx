import React from 'react';
import Section from '../Section';
import './Comments.css';
import { useEffect, useState } from "react";
import { useCommentApi, CommentResponseModel } from '../api/useCommentApi';


const Comments = () => {
  const { fetchAllComments } = useCommentApi();
  const [commentData, setCommentData] = useState<CommentResponseModel[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllComments();
        setCommentData(data);
      } catch (error) {
        console.error("Error fetching Comment data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Section id="comments" title="Comments">
      {commentData.length > 0 ? (
        <ul>
          {commentData.map((comment) => (
            <li key={comment.commentId}>
              <strong>{comment.title}:</strong> {comment.comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </Section>
  );
};

export default Comments;