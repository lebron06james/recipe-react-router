// rrd import
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem, getAllMatchingItems } from "../helpers";

export function deleteRecipeGroup({ params }) {
  try {
    deleteItem({
      key: "recipegroups",
      id: params.id,
    });

    const associatedRecipes = getAllMatchingItems({
      category: "recipes",
      key: "recipegroupId",
      value: params.id,
    });

    associatedRecipes.forEach((recipe) => {

      const associatedIngredients = getAllMatchingItems({
        category: "ingredients",
        key: "recipeId",
        value: recipe.id,
      });

      associatedIngredients.forEach((ingredient) => {
        deleteItem({
          key: "ingredients",
          id: ingredient.id,
        });
      });

      deleteItem({
        key: "recipes",
        id: recipe.id,
      });
    });

    const associatedComments = getAllMatchingItems({
      category: "comments",
      key: "recipegroupId",
      value: params.id,
    });

    associatedComments.forEach((comment) => {

      deleteItem({
        key: "comments",
        id: comment.id,
      });

    });

    toast.success("RecipeGroup deleted successfully!");
  } catch (e) {
    throw new Error("There was a problem deleting your recipegroup.");
  }
  return redirect("/");
}
