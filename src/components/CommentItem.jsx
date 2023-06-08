import { useState } from "react";

// styles
import styles from "./CommentItem.module.css";

// Library imports
import { CheckIcon } from "@heroicons/react/24/outline";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TrashIcon } from "@heroicons/react/24/outline";

const CommentItem = ({ comment, deleteComment, toggleComment, enterEditMode, userName }) => {
  const [isChecked, setIsChecked] = useState(comment.checked);

  const handleCheckboxChange = (e) => {
    setIsChecked(!isChecked);
    toggleComment(comment.id);
  };

  return (
    <li className={styles.task}>
      <div className={styles["task-group"]}>
        {/* <input
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleCheckboxChange}
          name={task.name}
          id={task.id}
        /> */}
        <label htmlFor="userName" className={styles.label}>
          {comment.userName}:
        </label>
        <label htmlFor={comment.id} className={styles.label}>
          {comment.name}
          {/* <p className={styles.checkmark}>
            <CheckIcon strokeWidth={2} width={24} height={24} />
          </p> */}
        </label>
      </div>
      <div className={styles["task-group"]} hidden={comment.userName !== userName}>
        <button
          className="btn"
          aria-label={`Update ${comment.name} Task`}
          onClick={() => enterEditMode(comment)}
        >
          <PencilSquareIcon width={24} height={24} />
        </button>
        <button
          className={`btn ${styles.delete}`}
          aria-label={`Delete ${comment.name} Comment`}
          onClick={() => deleteComment(comment.id)}
        >
          <TrashIcon width={24} height={24} />
        </button>
      </div>
    </li>
  );
};
export default CommentItem;
