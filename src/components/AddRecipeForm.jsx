// reacts
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddRecipeForm = ({ event }) => {

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
        Create recipe
      </h2>
      
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="grid-xs">
          <label htmlFor="newRecipe">Recipe Name</label>
          <input
            type="text"
            name="newRecipe"
            id="newRecipe"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newRecipeAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newRecipeAmount"
            id="newRecipeAmount"
            placeholder="e.g., $350"
            required
            inputMode="decimal"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newRecipeEvent">Event Id</label>
          <input
            type="text"
            name="newRecipeEvent"
            id="newRecipeEvent"
            value={event.id}
            readonly
          />
        </div>
        <input type="hidden" name="_action" value="createRecipe" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create recipe</span>
                <CurrencyDollarIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddRecipeForm