// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems, fetchData } from "../helpers";

export async function deleteRecipeGroup({ params }) {
  try {
    // check for existing recipes
    let count = 0;
    const associatedRecipes = getAllMatchingItems({
      category: "recipes",
      key: "recipegroupId",
      value: params.id,
    });

    associatedRecipes.forEach((recipe) => {
      count++;
    });

    if (count > 0) {
      toast.error(
        "I'm sorry, I have found existing recipes for this Category. You are not allowed to delete it."
      );
    } else {
      // uncomment the commen check for sosec+chef+menu app
      // check for existing comments
      // let cnt = 0;
      // const associatedComments = getAllMatchingItems({
      //   category: "comments",
      //   key: "recipegroupId",
      //   value: params.id,
      // });

      // associatedComments.forEach((comment) => {
      //   cnt++;
      // });

      // if (cnt > 0) {
      //   throw new Error(
      //     "I'm sorry, I have found existing comments for this Catgeory. You are not allowed to delete this."
      //   );
      // }

      // no exisiting anything, you can safely delete thid category here

      const user = await fetchData("user");

      let recipegroup = {};

      const recipegroupresponse = await fetch(
        `http://localhost/api/sourcerecipegroups/${params.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const json = await recipegroupresponse.json();

      if (recipegroupresponse.ok) {
        recipegroup = json;
      }

      // --------------------------------------------------------------

      // the working localStorage strategy
      // // delete the recipegroup first
      // deleteItem({
      //   key: "recipegroups",
      //   id: params.id,
      // });

      // // delete all the recipes
      // const associatedRecipes = getAllMatchingItems({
      //   category: "recipes",
      //   key: "recipegroupId",
      //   value: params.id,
      // });

      // associatedRecipes.forEach((recipe) => {

      //   const associatedIngredients = getAllMatchingItems({
      //     category: "ingredients",
      //     key: "recipeId",
      //     value: recipe.id,
      //   });

      //   associatedIngredients.forEach((ingredient) => {
      //     deleteItem({
      //       key: "ingredients",
      //       id: ingredient.id,
      //     });
      //   });

      //   deleteItem({
      //     key: "recipes",
      //     id: recipe.id,
      //   });

      // });

      // const associatedComments = getAllMatchingItems({
      //   category: "comments",
      //   key: "recipegroupId",
      //   value: params.id,
      // });

      // associatedComments.forEach((comment) => {

      //   deleteItem({
      //     key: "comments",
      //     id: comment.id,
      //   });

      // });

      toast.success("Recipe Category deleted successfully!");
    }

  } catch (e) {
    throw new Error("There was a problem deleting your recipe category.");
  }
  return redirect("/");
}
