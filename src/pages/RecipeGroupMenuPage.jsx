// rrd imports
import {
  Form,
  useRouteError,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

// library imports
import { toast } from "react-toastify";
import {
  BanknotesIcon,
  TrashIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HomeIcon,
  ArrowUturnLeftIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

// components
import Intro from "../components/Intro";
import AddRecipeForm from "../components/AddRecipeForm";
import AddIngredientForm from "../components/AddIngredientForm";
import RecipeItem from "../components/RecipeItem";
import Table from "../components/Table";

//  helper functions
import {
  createRecipe,
  createIngredient,
  deleteItem,
  fetchData,
  waait,
  getAllMatchingItems,
} from "../helpers";

// loader
export async function recipegroupMenuLoader({ params }) {
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

  // get one recipegroup
  // const recipegroup = await getAllMatchingItems({
  //   category: "recipegroups",
  //   key: "_id",
  //   value: params.id,
  // })[0];

  let recipegroup = {};

  const recipegroupresponse = await fetch(
    `${apiUrl}/api/sourcerecipegroups/${params.id}`,
    {
      credentials: "include",
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );

  const rcjson = await recipegroupresponse.json();

  if (recipegroupresponse.ok) {
    recipegroup = rcjson;
  }

  // get all recipes under the current recipegroup

  let recipes = [];
  let existingRecipesLength = 0;
  if (user) {
    const recipesresponse = await fetch(
      `${apiUrl}/api/sourcerecipes/filter/${params.id}`,
      {
        credentials: "include",
        method: "GET",
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    const recipesjson = await recipesresponse.json();
    if (recipesresponse.ok) {
      recipes = recipesjson;
      existingRecipesLength = recipes.length;
    }
  }

  // const recipes = await getAllMatchingItems({
  //   category: "recipes",
  //   key: "recipegroupId",
  //   value: recipegroup._id,
  // });

  let ingredients = [];

  recipes.forEach((recipe) => {
    const _ingredients = getAllMatchingItems({
      category: "ingredients",
      key: "recipeId",
      value: recipe._id,
    });

    ingredients = [...ingredients, ..._ingredients];
  });

  const sourceIngredients = await fetch(
    `https://my-json-server.typicode.com/silverstory/ingredients/ingredients`
  ).then((response) => response.json());

  return {
    recipegroup,
    userName,
    user,
    recipes,
    ingredients,
    sourceIngredients,
  };
}

// action
export async function recipegroupMenuAction({ request }) {
  await waait();

  // get api url env
  const apiUrl = await import.meta.env.VITE_API_URL;

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  // get logged-in user
  const response = await fetch(`${apiUrl}/name`, {
    credentials: "include",
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const json = await response.json();
  const isAuth = json.isAuth;
  const userName = await json.userName;
  const user = await json.user;

  if (!response.ok) {
    return toast.error(
      `Please log in. The app is unable to retrieve user information. Error message: ${json.error}`
    );
  }
  if (response.ok) {
    // // wag maglagay ng kahit ano dito. bawal.
    // // return toast.success(`You are logged-in ${json.userName}`);
  }
  // end get logged-in user

  // // new user submission
  // if (_action === "newUser") {
  //   try {
  //     localStorage.setItem("userName", JSON.stringify(values.userName));
  //     return toast.success(`Welcome, ${values.userName}`);
  //   } catch (e) {
  //     throw new Error("There was a problem creating your account.");
  //   }
  // }

  if (_action === "createRecipe") {
    // db recipe
    try {
      // generate random Color
      let recipes = [];
      let existingRecipesLength = 0;
      if (user) {
        const recipesresponse = await fetch(
          `${apiUrl}/api/sourcerecipes/filter/${values.newRecipeRecipeGroup}`,
          {
            credentials: "include",
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const recipesjson = await recipesresponse.json();
        if (recipesresponse.ok) {
          recipes = recipesjson;
          existingRecipesLength = recipes.length;
        }
      }
      const randomColor = `${existingRecipesLength * 34} 65% 50%`;
      // end generate random Color

      const newItem = {
        name: values.newRecipe,
        amount: values.newRecipeAmount,
        createdBy: values.newUserName,
        serving: values.newRecipeServing,
        instruction: values.newRecipeInstruction,
        cookingtime: values.newRecipeCookingTime,
        recipegroupId: values.newRecipeRecipeGroup,
        recipegroupName: values.newRecipeRecipeGroupName,
        color: randomColor,
      };

      let recipe = {};

      const reciperesponse = await fetch(`${apiUrl}/api/sourcerecipes/`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      const recipejson = await reciperesponse.json();

      if (!reciperesponse.ok) {
        return toast.error(
          `There was a problem creating your recipe category. ${recipejson.error}`
        );
      }
      if (reciperesponse.ok) {
        // setTitle('')
        // setLoad('')
        // setReps('')
        // setError(null)
        // setEmptyFields([])
        recipe = recipejson;
        return toast.success("Recipe created!");
      }
    } catch (e) {
      throw new Error("There was a problem creating your recipe.");
    }
    // end db recipe

    // try {
    //   createRecipe({
    //     name: values.newRecipe,
    //     amount: values.newRecipeAmount,
    //     createdBy: values.newUserName,
    //     serving: values.newRecipeServing,
    //     instruction: values.newRecipeInstruction,
    //     cookingtime: values.newRecipeCookingTime,
    //     recipegroupId: values.newRecipeRecipeGroup,
    //   });
    //   return toast.success("Recipe created!");
    // } catch (e) {
    //   throw new Error("There was a problem creating your recipe.");
    // }
  }

  if (_action === "createIngredient") {
    try {
      createIngredient({
        name: values.newIngredient,
        amount: values.newIngredientAmount,
        unit: values.newIngredientUnit,
        price: values.newIngredientPrice,
        createdBy: values.newUserName,
        recipeId: values.newIngredientRecipe,
        recipeName: values.newIngredientRecipeName,
        recipegroupId: values.newIngredientRecipeGroup,
        recipegroupName: values.newIngredientRecipeGroupName,
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

const RecipeGroupMenuPage = () => {
  const {
    recipegroup,
    userName,
    user,
    recipes,
    ingredients,
    sourceIngredients,
  } = useLoaderData();
  const { usertype } = user;
  const navigate = useNavigate();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <div className="flex-md">
            <button className="btn btn--dark" onClick={() => navigate(-1)}>
              <ArrowUturnLeftIcon width={20} />
              <span>Go Back</span>
            </button>
          </div>
          <h1>
            List of,{" "}
            <span className="accent">
              {recipegroup.name}
              {"."}
            </span>
          </h1>
          <div className="grid-sm">
            <p>
              This page contains all of the recipes from the category{" "}
              <strong>{recipegroup.name}</strong>
            </p>
          </div>
          {/* delete button */}
          <div
            className="flex-sm"
            // hidden={usertype !== 'Chef'}
            hidden
          >
            <Form
              method="post"
              action="delete"
              onSubmit={(ev) => {
                if (
                  !confirm(
                    "Are you sure you want to permanently delete this recipegroup?"
                  )
                ) {
                  ev.preventDefault();
                }
              }}
            >
              <button
                type="submit"
                className="btn btn--warning"
                hidden={usertype !== "Chef"}
              >
                <span>Delete this category</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          </div>
          {/* end delete button */}

          {/* comment button */}
          {/* <div className="grid-sm">
            Recent comment: comment name here
            <Link to={`/comment/${recipegroup._id}`} className="btn">
              <span>Add Comment</span>
              <ChatBubbleOvalLeftEllipsisIcon width={20} />
            </Link>
          </div> */}
          {/* end comment button */}

          <div className="grid-sm">
            {recipes && recipes.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddRecipeForm
                    recipegroup={recipegroup}
                    userName={userName}
                    usertype={usertype}
                  />
                  <AddIngredientForm
                    recipes={recipes}
                    recipegroupId={recipegroup._id}
                    recipegroupName={recipegroup.name}
                    userName={userName}
                    usertype={usertype}
                    sourceIngredients={sourceIngredients}
                  />
                </div>
                <h2>Existing Recipes</h2>
                <div className="recipes">
                  {recipes.map((recipe) => (
                    <RecipeItem
                      key={recipe.id}
                      recipe={recipe}
                      usertype={usertype}
                    />
                  ))}
                </div>
                {ingredients && ingredients.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Ingredients</h2>
                    <Table
                      ingredients={ingredients
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                      recipe={recipes}
                      user={user}
                    />
                    {ingredients.length > 8 && (
                      <Link to="/ingredients" className="btn btn--dark">
                        View all ingredients
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Your recipes, designed in one place.</p>
                <p hidden={usertype !== "Chef"}>
                  Create a Recipe to get started!
                </p>
                <AddRecipeForm
                  recipegroup={recipegroup}
                  userName={userName}
                  usertype={usertype}
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};
export default RecipeGroupMenuPage;
