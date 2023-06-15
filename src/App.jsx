import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Library
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Layouts
import Main, { mainLoader } from "./layouts/Main";

// Actions
import { logoutAction } from "./actions/logout";
import { deleteRecipe } from "./actions/deleteRecipe";
import { deleteEvent } from "./actions/deleteEvent";

// Routes
import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import SignupPage, { signupAction, signupLoader } from "./pages/SignupPage";
import Error from "./pages/Error";
import RecipePage, { recipeAction, recipeLoader } from "./pages/RecipePage";
import CommentPage, { commentLoader } from "./pages/CommentPage";
import IngredientsPage, {
  ingredientsAction,
  ingredientsLoader,
} from "./pages/IngredientsPage";
import EventMenuPage, {
  eventMenuAction,
  eventMenuLoader,
} from "./pages/EventMenuPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: "event/:id",
        element: <EventMenuPage />,
        loader: eventMenuLoader,
        action: eventMenuAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteEvent,
          },
        ],
      },
      {
        path: "comment/:id",
        element: <CommentPage />,
        loader: commentLoader,
        errorElement: <Error />,
      },
      {
        path: "recipe/:id",
        element: <RecipePage />,
        loader: recipeLoader,
        action: recipeAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteRecipe,
          },
        ],
      },
      {
        path: "ingredients",
        element: <IngredientsPage />,
        loader: ingredientsLoader,
        action: ingredientsAction,
        errorElement: <Error />,
      },
      {
        path: "signup",
        element: <SignupPage />,
        loader: signupLoader,
        action: signupAction,
        errorElement: <Error />,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
