// rrd imports
import { Form, Link } from "react-router-dom";

// library imports
import { BanknotesIcon, ChatBubbleOvalLeftEllipsisIcon, FireIcon } from "@heroicons/react/24/outline";

// helper functions
import {
//   calculateSpentByRecipe,
  formatCurrency,
  formatPercentage,
} from "../helpers";

const RecipeGroupItem = ({ recipegroup }) => {
  const { id, name, updatedby, color } = recipegroup;
//   const spent = calculateSpentByRecipe(id);

  return (
    <div
      className="recipe"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <FireIcon width={20} />
      </div>

      <progress max={10} value={10}>
        {formatPercentage(10 / 10)}
      </progress>

      <div className="progress-text">
        <small>id: { id }</small>
        <small>Updated by: { updatedby }</small>
      </div>

      <div className="progress-text">
        <small></small>
      </div>

      <div className="flex-sm">
        Click button below to add a new Recipe
        <Link to={`/recipegroup/${id}`} className="btn">
          <span>Add Recipe</span>
          <BanknotesIcon width={20} />
        </Link>
        {/* <Link to={`/comment/${id}`} className="btn">
          <span>Add Comment</span>
          <ChatBubbleOvalLeftEllipsisIcon width={20} />
        </Link> */}
      </div>

    </div>
  );
};
export default RecipeGroupItem;