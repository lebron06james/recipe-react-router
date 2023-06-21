// component import
import CommentItem from "./CommentItem";

// styles
import styles from "./CommentList.module.css";

const CommentList = ({
  comments,
  deleteComment,
  toggleComment,
  enterEditMode,
  recipegroup,
  userName,
}) => {
  return (
    <ul className={styles.tasks}>
      {/* {comments.sort((a, b) => b.id - a.id).map(comment => ( */}
      {comments
        .filter((comment) => {
          return comment.recipegroupId === recipegroup.id;
        })
        .sort((a, b) => b.id - a.id)
        .map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            deleteComment={deleteComment}
            toggleComment={toggleComment}
            enterEditMode={enterEditMode}
            userName={userName}
          />
        ))}
    </ul>
  );
};
export default CommentList;
