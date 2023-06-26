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
export async function dashboardLoader() {
  const userName = await fetchData("userName");
  const user = await fetchData("user");

  let recipegroups = [];

  if (user) {
    // recipegroups
    // const recipegroups = fetchData("recipegroups");

    const recipegroupsresponse = await fetch(
      "https://recipe-auth.cyclic.app/api/sourcerecipegroups",
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await recipegroupsresponse.json();

    if (recipegroupsresponse.ok) {
      recipegroups = json;
    }
  }

  return { userName, user, recipegroups };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  const email = values.email;
  const password = values.password;

  const postvalue = { email: email, password: password };

  // new user submission
  if (_action === "newUser") {
    try {
      const response = await fetch(
        "https://recipe-auth.cyclic.app/api/user/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(postvalue),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        return toast.error(
          `Oops, that didn't go right. Error message: ${json.error}`
        );
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        localStorage.setItem("userName", JSON.stringify(json.username));

        return toast.success(`Welcome, ${json.username}`);
      }
    } catch (e) {
      throw new Error("There was a problem creating your account.");
    }
  }

  if (_action === "createRecipeGroup") {
    try {
      // createRecipeGroup({
      //   name: values.newRecipeGroup,
      //   updatedby: values.newUserName,
      // });

      const user = await fetchData("user");

      // generate random Color
      let recipegroups = [];
      let existingRecipeGroupLength = 0;
      if (user) {
        const recipegroupsresponse = await fetch(
          "https://recipe-auth.cyclic.app/api/sourcerecipegroups",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await recipegroupsresponse.json();
        if (recipegroupsresponse.ok) {
          recipegroups = json;
          existingRecipeGroupLength = recipegroups.length;
        }
      }
      const randomColor = `${existingRecipeGroupLength * 34} 65% 50%`;
      // end generate random Color

      const newItem = {
        name: values.newRecipeGroup,
        updatedby: values.newUserName,
        color: randomColor,
      };

      let recipegroup = {};

      const recipegroupresponse = await fetch(
        "https://recipe-auth.cyclic.app/api/sourcerecipegroups/",
        {
          method: "POST",
          body: JSON.stringify(newItem),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      const json = await recipegroupresponse.json();

      if (!recipegroupresponse.ok) {
        return toast.error(
          `There was a problem creating your recipe category. ${json.error}`
        );
      }
      if (recipegroupresponse.ok) {
        // setTitle('')
        // setLoad('')
        // setReps('')
        // setError(null)
        // setEmptyFields([])
        recipegroup = json;
        return toast.success("Recipe Category created!");
      }
    } catch (e) {
      throw new Error("There was a problem creating your recipe category.");
    }
  }
}

const Dashboard = () => {
  const { userName, user, recipegroups } = useLoaderData();

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
                  <AddRecipeGroupForm userName={userName} user={user} />
                  {/* <AddIngredientForm recipes={recipes} /> */}
                </div>
                <h2>Existing Recipe Categories</h2>
                <div className="recipes">
                  {recipegroups.map((recipegroup) => (
                    <RecipeGroupItem
                      key={recipegroup._id}
                      recipegroup={recipegroup}
                      user={user}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid-sm">
                <p>Conveniently organize recipes in one spot.</p>
                <p>Create a recipe category to get started!</p>
                <AddRecipeGroupForm userName={userName} user={user} />
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
