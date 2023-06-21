// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, TrashIcon, FireIcon } from "@heroicons/react/24/outline";

// helper functions
import {
  calculateSpentByRecipe,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const RecipeItem = ({ recipe, usertype, showDelete = false }) => {
  const { id, name, amount, color } = recipe;
  const spent = calculateSpentByRecipe(id);

  return (
    <div
      className="recipe"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        {/* <p>{formatCurrency(amount)} Recipeed</p> */}
        <p>for {amount} Pax</p>
      </div>
      {/* <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress> */}
      <progress max={10} value={10}>
        {formatPercentage(10 / 10)}
      </progress>
      {/* <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div> */}
      <div className="progress-text">
        <small>10 ingredients</small>
        <small>10 servings</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(ev) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this recipe?"
                )
              ) {
                ev.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn" hidden={usertype !== 'Chef'}>
              <span>Delete Recipe</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`/recipe/${id}`} className="btn">
            <span>View Details</span>
            <FireIcon width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};
export default RecipeItem;
