import styles from "./comment-list.module.css";

const CommentList = (props) => {
  const { items } = props;
console.log(items);
  return (
    <ul className={styles.comments}>
      {items.map(({name, _id, text}) => (
        <li key={_id}>
          <p>{text}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
