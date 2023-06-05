// reacts
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddEventForm = () => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create event
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newEvent">Event Name</label>
          <input
            type="text"
            name="newEvent"
            id="newEvent"
            placeholder="e.g., Event One 2023"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newEventAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newEventAmount"
            id="newEventAmount"
            placeholder="e.g., 50"
            required
            inputMode="decimal"
          />
        </div>
        <input type="hidden" name="_action" value="createEvent" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create event</span>
                <CurrencyDollarIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddEventForm