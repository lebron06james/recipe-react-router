import { useState, useEffect } from 'react';

// styles
import styles from './EditForm.module.css';

// library imports
import { CheckIcon } from '@heroicons/react/24/solid'

const EditForm = ({ editedComment, updateComment, closeEditMode, event, userName }) => {
  const [updatedCommentName, setUpdatedCommentName] = useState(editedComment.name);

  useEffect(()=> {
    const closeModalIfEscaped = (e) => {
      e.key === "Escape" && closeEditMode();
    }

    window.addEventListener('keydown', closeModalIfEscaped)

    return () => {
      window.removeEventListener('keydown', closeModalIfEscaped)
    }
  }, [closeEditMode])

  const handleFormSubmit = (e) => {
    e.preventDefault();
    updateComment({...editedComment, name: updatedCommentName})
  }

  return (
    <div
      role="dialog"
      aria-labelledby="editTask"
      onClick={(e) => {e.target === e.currentTarget && closeEditMode()}}
      >
      <form
        className={styles.todo}
        onSubmit={handleFormSubmit}
        >
        <div className={styles.wrapper}>
          <input
            type="text"
            id="editComment"
            className={styles.input}
            value={updatedCommentName}
            onInput={(e) => setUpdatedCommentName(e.target.value)}
            required
            autoFocus
            maxLength={60}
            placeholder="Update Comment"
          />
          <label
            htmlFor="editComment"
            className={styles.label}
          >Update Comment</label>
        </div>
        <div className={styles.wrapper} hidden={true}>
          <label htmlFor="newCommentEvent">Event Id</label>
          <input
            type="text"
            name="newCommentEvent"
            id="newCommentEvent"
            className={styles.input}
            value={event.id}
            readonly
          />
        </div>
        <div className={styles.wrapper} hidden={true}>
          <label htmlFor="newCommentUser">User Name</label>
          <input
            type="text"
            name="newCommentUser"
            id="newCommentUser"
            className={styles.input}
            value={userName}
            readonly
          />
        </div>
        <button
          className={styles.btn}
          aria-label={`Confirm edited comment to now read ${updatedCommentName}`}
          type="submit"
          >
          <CheckIcon strokeWidth={2} height={24} width={24} />
        </button>
      </form>
    </div>
  )
}
export default EditForm