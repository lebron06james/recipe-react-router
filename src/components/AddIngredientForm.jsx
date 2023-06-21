// react imports
import { useEffect, useRef } from "react"

// rrd imports
import { useFetcher } from "react-router-dom"

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid"

const AddIngredientForm = ({ recipes }) => {
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset()
      // reset focus
      focusRef.current.focus()
    }

  }, [isSubmitting])

  return (
    <div className="form-wrapper">
      <h2 className="h3">Add New{" "}<span className="accent">
        {recipes.length === 1 && `${recipes.map((budg) => budg.name)}`}
      </span>{" "}
        Ingredient
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        <div className="ingredient-inputs">
          <div className="grid-xs">
            <label htmlFor="newIngredient">Ingredient Name</label>
            <input
              type="text"
              name="newIngredient"
              id="newIngredient"
              placeholder="e.g., Chicken"
              ref={focusRef}
              required
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newIngredientAmount">Amount in ml/mg</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newIngredientAmount"
              id="newIngredientAmount"
              placeholder="e.g., 3.5"
              required
            />
          </div>
        </div>
        <div className="grid-xs" hidden={recipes.length === 1}>
          <label htmlFor="newIngredientRecipe">Recipe Category</label>
          <select name="newIngredientRecipe" id="newIngredientRecipe" required>
            {
              recipes
                .sort((a, b) => a.createdAt - b.createdAt)
                .map((recipe) => {
                  return (
                    <option key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </option>
                  )
                })
            }
          </select>
        </div>
        <input type="hidden" name="_action" value="createIngredient" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Add Ingredient</span>
                <PlusCircleIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddIngredientForm