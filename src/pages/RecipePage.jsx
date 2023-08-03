// rrd imports
import {
  useRouteError,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

// library imports
import { toast } from "react-toastify";
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// components
import AddIngredientForm from "../components/AddIngredientForm";
import RecipeItem from "../components/RecipeItem";
import Table from "../components/Table";

// helpers
import {
  fetchData,
  waait,
  createIngredient,
  deleteItem,
  getAllMatchingItems,
} from "../helpers";

// components
import Intro from "../components/Intro";

// library imports
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/24/outline";

// loader
export async function recipeLoader({ params }) {
  // get api url env
  const apiUrl = await import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/name`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const isAuth = json.isAuth;
  const userName = await json.userName;
  const user = await json.user;

  const recipe = await getAllMatchingItems({
    category: "recipes",
    key: "id",
    value: params.id,
  })[0];

  // get the recipegroup

  // const recipegroup = await getAllMatchingItems({
  //   category: "recipegroups",
  //   key: "id",
  //   value: recipe.recipegroupId,
  // })[0];

  let recipegroup = {};

  if (user) {
    // recipegroup
    // const recipegroups = fetchData("recipegroups");

    const recipegroupresponse = await fetch(
      `${apiUrl}/api/sourcerecipegroups/${recipe.recipegroupId}`,
      {
        credentials: "include",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const rcjson = await recipegroupresponse.json();

    if (recipegroupresponse.ok) {
      recipegroup = rcjson;
    }
  }

  const ingredients = await getAllMatchingItems({
    category: "ingredients",
    key: "recipeId",
    value: params.id,
  });

  if (!recipe) {
    throw new Error("The recipe you’re trying to find doesn’t exist");
  }

  const sourceIngredients = await fetch(
    `https://my-json-server.typicode.com/silverstory/ingredients/ingredients`
  ).then((response) => response.json());

  return {
    userName,
    user,
    recipe,
    recipegroup,
    ingredients,
    sourceIngredients,
  };
}

// action
export async function recipeAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createIngredient") {
    try {
      createIngredient({
        name: values.newIngredient,
        amount: values.newIngredientAmount,
        unit: values.newIngredientUnit,
        price: values.newIngredientPrice,
        createdBy: values.newUserName,
        recipeId: values.newIngredientRecipe,
        ingredientSqlId: values.newIngredientSqlId,
      });
      return toast.success(`Ingredient ${values.newIngredient} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your ingredient.");
    }
  }

  if (_action === "deleteIngredient") {
    try {
      deleteItem({
        key: "ingredients",
        id: values.ingredientId,
      });
      return toast.success("Ingredient deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your ingredient.");
    }
  }
}

const RecipePage = () => {
  const {
    userName,
    user,
    recipe,
    ingredients,
    recipegroup,
    sourceIngredients,
  } = useLoaderData();
  const { usertype } = user;
  const navigate = useNavigate();

  return (
    <>
      {userName ? (
        <div
          className="grid-lg"
          style={{
            "--accent": recipe.color,
          }}
        >
          <div className="flex-md">
            <button className="btn btn--dark" onClick={() => navigate(-1)}>
              <ArrowUturnLeftIcon width={20} />
              <span>Go Back</span>
            </button>
          </div>
          <h1 className="h2">
            <span className="accent">{recipe.name} Recipe</span>
          </h1>
          <h1>
            from{" "}
            <span>
              {recipegroup.name}
              {"."}
            </span>
          </h1>
          <div className="grid-sm">
            <p>
              This page contains all of the ingredients from the recipe{" "}
              <strong>{recipe.name}</strong> under{" "}
              <strong>
                {recipegroup.name}
                {"."}
              </strong>
            </p>
          </div>

          {/* comment button */}
          <div className="grid-sm">
            <span>Tap <b><small>"Add Comment"</small></b> button to add comments</span>
            <Link to={`/comment/${recipegroup._id}`} className="btn">
              <span>Add Comment</span>
              <ChatBubbleOvalLeftEllipsisIcon width={20} />
            </Link>
          </div>
          {/* end comment button */}

          <div className="flex-lg">
            <RecipeItem recipe={recipe} usertype={usertype} showDelete={true} />
            <AddIngredientForm
              recipes={[recipe]}
              usertype={usertype}
              userName={userName}
              sourceIngredients={sourceIngredients}
            />
          </div>
          {ingredients && ingredients.length > 0 && (
            <div className="grid-md">
              <h2>
                <span className="accent">{recipe.name}</span> Ingredients
              </h2>
              <Table ingredients={ingredients} user={user} showRecipe={false} />
            </div>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default RecipePage;
