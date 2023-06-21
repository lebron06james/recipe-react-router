// reacts
import React, { useState, useEffect, useRef } from "react";

// rrd imports
import { Form, useFetcher } from "react-router-dom"

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid"

const AddRecipeGroupForm = ({ userName, user }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting"

  const { usertype } = user;

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  }, [isSubmitting])

  const categories = [
    {name: 'Breakfast recipes', id: 1},
    {name: 'Lunch recipes', id: 2},
    {name: 'Dinner recipes', id: 3},
    {name: 'Appetizer recipes', id: 4},
    {name: 'Salad recipes', id: 5},
    {name: 'Main-course recipes', id: 6},
    {name: 'Side-dish recipes', id: 7},
    {name: 'Baked-goods recipes', id: 8},
    {name: 'Dessert recipes', id: 9},
    {name: 'Snack recipes', id: 10},
    {name: 'Soup recipes', id: 11},
    {name: 'Holiday recipes', id: 12},
    {name: 'Vegetarian Dishes', id: 13},
    {name: 'Beverages', id: 14}
  ]

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Create Recipe Category
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
      >
        {/* <div className="grid-xs">
          <label htmlFor="newRecipeGroup">Recipe Category</label>
          <input
            type="text"
            name="newRecipeGroup"
            id="newRecipeGroup"
            placeholder="e.g., Main-course recipes"
            required
            ref={focusRef}
          />
        </div> */}

        <div className="grid-xs">
          <label>Pick a Recipe Category</label>
          <select name="newRecipeGroup" id="newRecipeGroup" required ref={focusRef}>
            {
              categories
                // .sort((a, b) => a.name - b.name)
                .map((category) => {
                  return (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  )
                })
            }
          </select>
        </div>

        <div className="grid-xs">
          <label htmlFor="newUserName">User Name</label>
          <input
            type="text"
            name="newUserName"
            id="newUserName"
            value={userName}
            readonly
          />
        </div>

        <input type="hidden" name="_action" value="createRecipeGroup" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting} hidden={usertype !== 'Chef'}>
          {
            isSubmitting ? <span>Submitting…</span> : (
              <>
                <span>Create Category</span>
                <CurrencyDollarIcon width={20} />
              </>
            )
          }
        </button>
      </fetcher.Form>
    </div>
  )
}
export default AddRecipeGroupForm