// rrd imports
import { useLoaderData } from "react-router-dom";

// library import
import { toast } from "react-toastify";

// component imports
import Table from "../components/Table";

//  helper functions
import { deleteItem, fetchData, waait } from "../helpers";

// components
import Intro from "../components/Intro";

// loader
export async function ingredientsLoader() {
  const userName = await fetchData("userName");
  const ingredients = await fetchData("ingredients");
  return { userName, ingredients };
}

// action
export async function ingredientsAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

const IngredientsPage = () => {
  const { userName, ingredients } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="grid-lg">
          <h1>All Ingredients</h1>
          {ingredients && ingredients.length > 0 ? (
            <div className="grid-md">
              <h2>
                Recent Ingredients <small>({ingredients.length} total)</small>
              </h2>
              <Table ingredients={ingredients} />
            </div>
          ) : (
            <p>No Ingredients to show</p>
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default IngredientsPage;
