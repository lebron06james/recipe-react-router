// reacts
import { useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon, FireIcon } from "@heroicons/react/24/solid"

const AddRecipeForm = ({ recipegroup, usertype }) => {

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
        hidden={usertype !== 'Chef'}
      >
        <div className="grid-xs">
          <label htmlFor="newRecipe">Recipe Name</label>
          <input
            type="text"
            name="newRecipe"
            id="newRecipe"
            placeholder="e.g., Fried Chicken"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newRecipeAmount">Amount in ml/mg</label>
          <input
            type="number"
            step="0.01"
            name="newRecipeAmount"
            id="newRecipeAmount"
            placeholder="e.g., 50"
            required
            inputMode="decimal"
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newRecipeRecipeGroup">Category Id</label>
          <input
            type="text"
            name="newRecipeRecipeGroup"
            id="newRecipeRecipeGroup"
            value={recipegroup.id}
            readonly
          />
        </div>
        <input type="hidden" name="_action" value="createRecipe" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting} hidden={usertype !== 'Chef'}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create recipe</span>
                <FireIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddRecipeForm