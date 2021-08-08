import { useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "./comments.module.css";

const Comments = (props) => {
  const { eventId } = props;
  const [comments, setComments] = useState([]);

  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetch("/api/comments/" + eventId)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-type": "application/json" },
    });

    //I can add .then and load data
  };

  return (
    <section className={styles.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
