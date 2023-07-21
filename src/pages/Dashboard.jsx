// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// library imports
import { toast } from "react-toastify";

// components
import Intro from "../components/Intro";
import AddRecipeGroupForm from "../components/AddRecipeGroupForm";
import RecipeGroupItem from "../components/RecipeGroupItem";

import axios from "axios";

//  helper functions
import { createRecipeGroup, deleteItem, fetchData, waait } from "../helpers";

import Cookies from "js-cookie";

// const isObjectEmpty = (objectName) => {
//   return (
//     objectName &&
//     Object.keys(objectName).length === 0 &&
//     objectName.constructor === Object
//   );
// };

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === "{}";
};

// loader
export async function dashboardLoader() {
  // cookie domain
  const cookieDomain = await import.meta.env.VITE_COOKIE_DOMAIN;

  // const userName = await fetchData("userName");
  const userName = await Cookies.get("userName", { domain: cookieDomain });
  // const user = await fetchData("user");

  const userString = await Cookies.get("user", { domain: cookieDomain });
  const user = userString ? JSON.parse(userString) : null;

  // get api url env
  const apiUrl = await import.meta.env.VITE_API_URL;

  let recipegroups = [];

  if (user) {
    // recipegroups
    // const recipegroups = fetchData("recipegroups");

    const recipegroupsresponse = await fetch(
      `${apiUrl}/api/sourcerecipegroups`,
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );

    const json = await recipegroupsresponse.json();

    if (recipegroupsresponse.ok) {
      recipegroups = json;
    }
  }

  // cookie from node server testing

  let axiosConfig = {
    withCredentials: true,
  };

  // // set cookie axios
  // const obj = { name: "hayup anlupet" };
  // const setcookiedata = await axios.post(
  //   "http://localhost:8000/new",
  //   obj,
  //   axiosConfig
  // );

  // console.log(setcookiedata.data);

  // get cookie axios
  const getcookiedata = await axios.get(
    "http://localhost:8000/name",
    axiosConfig
  );

  console.log(getcookiedata.data);

  if(isObjectEmpty(getcookiedata.data)) {
    console.log('empty response data');
  }

  // // logout cookies
  // const logoutcookiedata = await axios.get(
  //   "http://localhost:8000/logout", {
  //     withCredentials: true,
  //   }
  // );

  // console.log(logoutcookiedata.data);

  // ----------------------------------------

  // set cookie fetch
  // const cookieresponse = await axios.post(
  //   `http://localhost:8000/setcookie`
  // );

  // if (cookieresponse.ok) {
  //   console.log('set cookie ', cookieresponse);
  // }

  // // get cookie
  // const getcookieresponse = await fetch(
  //   `http://localhost:8000/getcookie`
  // );

  // if (getcookieresponse.ok) {
  //   console.log('get cookie ', getcookieresponse);
  // }

  // end cookie from node server testing

  return { userName, user, recipegroups };
}

// action
export async function dashboardAction({ request }) {
  await waait();

  // get api url env
  const apiUrl = await import.meta.env.VITE_API_URL;

  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  const email = values.email;
  const password = values.password;

  const postvalue = { email: email, password: password };

  // new user submission
  if (_action === "newUser") {
    try {
      const response = await fetch(`${apiUrl}/api/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postvalue),
      });

      const json = await response.json();

      if (!response.ok) {
        return toast.error(
          `Oops, that didn't go right. Error message: ${json.error}`
        );
      }
      if (response.ok) {
        // cookie domain
        const cookieDomain = await import.meta.env.VITE_COOKIE_DOMAIN;
        // cookieSecure
        const cookieSecure = await import.meta.env.VITE_COOKIE_SECURE;

        const cookieSecureSite = !!+cookieSecure;

        console.log("secure site: ", cookieSecureSite, cookieDomain);

        // localStorage.setItem("user", JSON.stringify(json));
        Cookies.set("user", JSON.stringify(json), {
          expires: 7,
          path: "/",
          domain: cookieDomain,
          sameSite: "strict",
          httpOnly: false,
          secure: cookieSecureSite,
        });
        // localStorage.setItem("userName", JSON.stringify(json.username));
        Cookies.set("userName", json.username, {
          expires: 7,
          path: "/",
          domain: cookieDomain,
          sameSite: "strict",
          httpOnly: false,
          secure: cookieSecureSite,
        });

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

      // cookie domain
      const cookieDomain = await import.meta.env.VITE_COOKIE_DOMAIN;

      // const user = await fetchData("user");
      const userString = await Cookies.get("user", { domain: cookieDomain });
      const user = userString ? JSON.parse(userString) : null;

      // generate random Color
      let recipegroups = [];
      let existingRecipeGroupLength = 0;
      if (user) {
        const recipegroupsresponse = await fetch(
          `${apiUrl}/api/sourcerecipegroups`,
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
        `${apiUrl}/api/sourcerecipegroups/`,
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
