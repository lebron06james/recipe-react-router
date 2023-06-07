import { useState } from 'react';

// styles
import styles from './CustomForm.module.css';

// library imports
import { PlusIcon } from '@heroicons/react/24/solid'

const CustomForm = ({ addTask }) => {
  const [task, setTask] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addTask({
      name: task,
      checked: false,
      id: Date.now()
    })
    setTask("")
  }

  return (
    <form
      className={styles.todo}
      onSubmit={handleFormSubmit}
      >
      <div className={styles.wrapper}>
        <input
          type="text"
          id="task"
          className={styles.input}
          value={task}
          onInput={(e) => setTask(e.target.value)}
          required
          autoFocus
          maxLength={60}
          placeholder="Enter Task"
        />
        <label
          htmlFor="task"
          className={styles.label}
        >Enter Task</label>
      </div>
      <button
        className={styles.btn}
        aria-label="Add Task"
        type="submit"
        >
        <PlusIcon />
      </button>
    </form>
  )
}
export default CustomForm