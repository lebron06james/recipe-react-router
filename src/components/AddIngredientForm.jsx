// react imports
import { useEffect, useRef, useState } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// library imports
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

// helper functions
import {
  formatCurrency,
} from "../helpers";

const AddIngredientForm = ({
  recipes,
  userName,
  usertype,
  sourceIngredients,
}) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  const [name, setName] = useState("");
  const [sqlid, setSqlid] = useState(0);
  const [unit, setUnit] = useState(0);
  const [price, setPrice] = useState(0);

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    // console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setName(item.name);
    setSqlid(item.id);
    setUnit(item.unit);
    setPrice(item.price);
  };

  const handleOnFocus = () => {
    // console.log("Focused");
  };

  const handleOnClear = () => {
    // console.log("Cleared");
    setName("");
    setSqlid(0);
    setUnit(0);
    setPrice(0);
  };

  const formatResult = (item) => {
    return (
      <>
        <div
          className="recipe"
          style={{
            "--accent": "0 65% 50%",
            "marginRight": "20px",
            "overflow-x": "hidden"
          }}
        >
          <div className="progress-text">
            <h4>name: {item.name}</h4>
            <small>id:{item.id}</small>
          </div>
          <div className="progress-text">
            <h4>unit: {item.unit}</h4>
            <small>price: {formatCurrency(item.price)}</small>
          </div>
          {/* <progress max={10} value={10}>
        {formatPercentage(10 / 10)}
      </progress> */}
        </div>

        {/* <span style={{ display: "block", textAlign: "left" }}>
          id: <b>{item.id}</b>
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          name: <b>{item.name}</b>
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          unit: <b>{item.unit}</b>
        </span>
        <span style={{ display: "block", textAlign: "left" }}>
          price: <b>₱ {item.price}</b>
        </span> */}
      </>
    );
  };

  useEffect(() => {
    if (!isSubmitting) {
      // clear form
      formRef.current.reset();
      // reset focus
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {recipes.length === 1 && `${recipes.map((budg) => budg.name)}`}
        </span>{" "}
        Ingredient
      </h2>
      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
        hidden={usertype !== "Chef"}
      >
        <div className="ingredient-inputs">
          <div className="grid-xs">
            <ReactSearchAutocomplete
              items={sourceIngredients}
              onSearch={handleOnSearch}
              onHover={handleOnHover}
              onSelect={handleOnSelect}
              onFocus={handleOnFocus}
              autoFocus
              formatResult={formatResult}
              showClear={true}
              onClear={handleOnClear}
            />
          </div>
        </div>
        <div className="ingredient-inputs">
          <div className="grid-xs">
            <label htmlFor="newIngredient">Ingredient Name</label>
            <input
              type="text"
              name="newIngredient"
              id="newIngredient"
              placeholder="e.g., Chicken"
              required
              value={name}
              ref={focusRef}
              readonly
              style={{ backgroundColor: "peachpuff" }}
              // peachpuff
              // rosybrown
              // thistle
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newIngredientSqlId">Id</label>
            <input
              type="text"
              name="newIngredientSqlId"
              id="newIngredientSqlId"
              placeholder="e.g., 5"
              required
              value={sqlid}
              readonly
              style={{ backgroundColor: "peachpuff" }}
            />
          </div>
        </div>
        <div className="ingredient-inputs">
          <div className="grid-xs">
            <label htmlFor="newIngredientUnit">Unit</label>
            <input
              type="text"
              name="newIngredientUnit"
              id="newIngredientUnit"
              placeholder="e.g., grams"
              required
              value={unit}
              readonly
              style={{ backgroundColor: "thistle" }}
            />
          </div>
          <div className="grid-xs">
            <label htmlFor="newIngredientPrice">Price per unit</label>
            <input
              type="number"
              inputMode="decimal"
              name="newIngredientPrice"
              id="newIngredientPrice"
              placeholder="e.g., 3.50"
              required
              value={price}
              readonly
              style={{ backgroundColor: "thistle" }}
            />
          </div>
        </div>
        <div className="ingredient-inputs">
          <div className="grid-xs">
            <label htmlFor="newIngredientAmount">Amount / Quantity</label>
            <input
              type="number"
              step="0.1"
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
            {recipes
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((recipe) => {
                return (
                  <option key={recipe.id} value={recipe.id}>
                    {recipe.name}
                  </option>
                );
              })}
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
            style={{ backgroundColor: "rosybrown" }}
          />
        </div>
        <input type="hidden" name="_action" value="createIngredient" />
        <button
          type="submit"
          className="btn btn--dark"
          disabled={isSubmitting}
          hidden={usertype !== "Chef"}
        >
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Ingredient</span>
              <PlusCircleIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};
export default AddIngredientForm;
