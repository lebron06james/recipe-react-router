// rrd imports
import { Link, useFetcher } from "react-router-dom";

// library import
import { TrashIcon } from "@heroicons/react/24/solid";

// helper imports
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";

const IngredientItem = async ({ ingredient, user, showRecipe }) => {
  const fetcher = useFetcher();

  const { usertype, token } = user;

  // const recipe = getAllMatchingItems({
  //   category: "recipes",
  //   key: "id",
  //   value: ingredient.recipeId,
  // })[0];

  // get api url env
  const apiUrl = await import.meta.env.VITE_API_URL;

  // const response = await fetch(`${apiUrl}/name`, {
  //   credentials: "include",
  //   method: "GET",
  //   headers: { "Content-Type": "application/json" },
  // });

  // const json = await response.json();
  // const isAuth = json.isAuth;
  // const userName = await json.userName;
  // const user = await json.user;

  let recipe = {};

  const reciperesponse = await fetch(
    `${apiUrl}/api/sourcerecipes/${ingredient.recipeId}`,
    {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const recipejson = await reciperesponse.json();

  if (reciperesponse.ok) {
    recipe = recipejson;
  }

  return (
    <>
      <td>{ingredient.name}</td>
      <td>{ingredient.amount}</td>
      <td>{ingredient.unit}</td>
      <td>{formatCurrency(ingredient.price)}</td>
      <td>{formatDateToLocaleString(ingredient.createdAt)}</td>
      <td>{ingredient.createdBy}</td>
      {showRecipe && (
        <td>
          <Link
            to={`/recipe/${recipe._id}`}
            style={{
              "--accent": recipe.color,
            }}
          >
            {recipe.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post" hidden={usertype !== 'Chef'}>
          <input type="hidden" name="_action" value="deleteIngredient" />
          <input type="hidden" name="ingredientId" value={ingredient._id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${ingredient.name} ingredient`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};
export default IngredientItem;