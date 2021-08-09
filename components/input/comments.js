import { useContext, useEffect, useState } from "react";
import CommentList from "./comment-list";
import NewComment from "./new-comment";
import styles from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

const Comments = (props) => {
  const { eventId } = props;
  const [comments, setComments] = useState([]);
console.log(comments, 'comments');
  const { showNotification } = useContext(NotificationContext);

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
    showNotification({
      title: "Sending comment",
      message: "Sending lorem ipsum",
      status: "pending",
    });

    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.ok
          ? response.json()
          : response.json().then((data) => {
              throw new Error(data.message || "Something went wrong");
            });
      })
      .then((data) => {
        showNotification({
          title: "Success",
          message: "Success lorem ipsum",
          status: "success",
        });
      })
      .catch((error) => {
        showNotification({
          title: "Error",
          message: error.message || "Error lorem ipsum",
          status: "error",
        });
      });
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
