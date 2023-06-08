import { useState } from 'react';

// styles
import styles from './CustomForm.module.css';

// library imports
import { PlusIcon } from '@heroicons/react/24/solid'

const CustomForm = ({ addComment, event, userName }) => {
  const [comment, setComment] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addComment({
      name: comment,
      checked: false,
      eventId: event.id,
      userName: userName,
      id: Date.now()
    })
    setComment("")
  }

  return (
    <form
      className={styles.todo}
      onSubmit={handleFormSubmit}
      >
      <div className={styles.wrapper}>
        <input
          type="text"
          id="comment"
          className={styles.input}
          value={comment}
          onInput={(e) => setComment(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Comment"
        />
        <label
          htmlFor="comment"
          className={styles.label}
        >Enter Comment</label>
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
          hidden={true}
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
          hidden={true}
        />
      </div>
      <button
        className={styles.btn}
        aria-label="Add Comment"
        type="submit"
        >
        <PlusIcon />
      </button>
    </form>
  )
}
export default CustomForm