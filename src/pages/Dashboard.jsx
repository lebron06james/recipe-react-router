// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddRecipeGroupForm from "../components/AddRecipeGroupForm";
import RecipeGroupItem from "../components/RecipeGroupItem";

//  helper functions
import {
  createRecipeGroup,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const recipegroups = fetchData("recipegroups");
  return { userName, recipegroups };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  const email =  values.email;
  const password = values.password;

  const postvalue = {"email": email, "password": password};

  // new user submission
  if (_action === "newUser") {
    try {

      const response = await fetch('https://recipe-auth.cyclic.app/api/user/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postvalue)
      });

      const json = await response.json();
  
      if (!response.ok) {
        return toast.error(`Oops, that didn't go right. Error message: ${json.error}`);
      }
      if (response.ok) {

        localStorage.setItem('user', JSON.stringify(json));
        localStorage.setItem("userName", JSON.stringify(json.username));

        return toast.success(`Welcome, ${json.username}`);
  
      }

    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createRecipeGroup") {
    try {
      createRecipeGroup({
        name: values.newRecipeGroup,
        updatedby: values.newUserName,
      });
      return toast.success("Recipe Category created!");
    } catch (e) {
      throw new Error("There was a problem creating your recipe category.");
    }
  }

}

const Dashboard = () => {
  const { userName, recipegroups } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {recipegroups && recipegroups.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddRecipeGroupForm userName={userName} />
                  {/* <AddIngredientForm recipes={recipes} /> */}
                </div>
                <h2>Existing Recipe Categories</h2>
                <div className="recipes">
                  {recipegroups.map((recipegroup) => (
                    <RecipeGroupItem key={recipegroup.id} recipegroup={recipegroup} />
                  ))}
                </div>

              </div>
            ) : (
              <div className="grid-sm">
                <p>Conveniently organize recipes in one spot.</p>
                <p>Create a recipe category to get started!</p>
                <AddRecipeGroupForm userName={userName} />
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
export default Dashboard;