import { useState } from "react";

// rrd imports
import {
  useRouteError,
  Link,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

// library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid";

// custom hooks
import useLocalStorage from "../hooks/useLocalStorage";

// custom components
import CustomForm from "../components/CustomForm";
import EditForm from "../components/EditForm";
import CommentList from "../components/CommentList";

//  helper functions
import { fetchData, waait, getAllMatchingItems } from "../helpers";

// components
import Intro from "../components/Intro";

// loader
export async function commentLoader({ params }) {

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

  // get the recipegroup
  // const recipegroup = await getAllMatchingItems({
  //   category: "recipegroups",
  //   key: "id",
  //   value: params.id,
  // })[0];

  let recipegroup = {};

  if (user) {
    // recipegroup

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
  }

  const _comments = await getAllMatchingItems({
    category: "comments",
    key: "recipegroupId",
    value: recipegroup._id,
  });

  // recipes.forEach((recipe) => {

  //   const _ingredients = getAllMatchingItems({
  //     category: "ingredients",
  //     key: "recipeId",
  //     value: recipe.id,
  //   });

  //   ingredients = [...ingredients, ..._ingredients];

  // });

  const { usertype } = user;

  const userprompt = "(" + usertype + ") " + userName;

  return { recipegroup, userName, userprompt, _comments };
}

function CommentPage() {
  const { recipegroup, userName, userprompt, _comments } = useLoaderData();
  const navigate = useNavigate();

  // const [tasks, setTasks] = useLocalStorage('react-todo.tasks', []);
  // const [comments, setComments] = useLocalStorage('comments', recipegroup._id);
  const [comments, setComments] = useLocalStorage(
    "comments",
    [],
    recipegroup._id
  );
  const [previousFocusEl, setPreviousFocusEl] = useState(null);
  const [editedComment, setEditedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const addComment = (comment) => {
    setComments((prevState) => [...prevState, comment]);
  };

  const deleteComment = (id) => {
    setComments((prevState) => prevState.filter((t) => t.id !== id));
  };

  const toggleComment = (id) => {
    setComments((prevState) =>
      prevState.map((t) => (t.id === id ? { ...t, checked: !t.checked } : t))
    );
  };

  const updateComment = (comment) => {
    setComments((prevState) =>
      prevState.map((t) =>
        t.id === comment.id ? { ...t, name: comment.name } : t
      )
    );
    closeEditMode();
  };

  const closeEditMode = () => {
    setIsEditing(false);
    previousFocusEl.focus();
  };

  const enterEditMode = (comment) => {
    setEditedComment(comment);
    setIsEditing(true);
    setPreviousFocusEl(document.activeElement);
  };

  return (
    <>
      {userName ? (
        <div className="container">
          <div className="flex-md">
            <button className="btn btn--dark" onClick={() => navigate(-1)}>
              <ArrowUturnLeftIcon width={20} />
              <span>Go Back</span>
            </button>
            {/* <Link to="/" className="btn btn--dark">
          <HomeIcon width={20} />
          <span>Go home</span>
        </Link> */}
          </div>
          <header>
            {/* uncomment for events */}
            {/* <h3>Comments for Event</h3> */}
            <h3>Comments for recipe group</h3>
            <h1>
              {/* uncomment for events */}
              {/* {recipegroup.name}, {recipegroup.pax} Pax */}
              {recipegroup.name}
            </h1>
            
            {/* uncomment for events */}
            {/* <h3>
              RecipeGroup starts on{" "}
              <strong>{recipegroup.recipegroupdate}</strong> at{" "}
              <strong>{recipegroup.recipegrouptime}</strong>
            </h3>
            <h3>
              Holding room - <strong>{recipegroup.holdingroom}</strong>
            </h3>
            <h4>
              Venue - <strong>{recipegroup.venue}</strong>
            </h4> */}
          </header>
          {isEditing && (
            <EditForm
              editedComment={editedComment}
              updateComment={updateComment}
              closeEditMode={closeEditMode}
              recipegroup={recipegroup}
              userName={userprompt}
            />
          )}
          <CustomForm
            addComment={addComment}
            recipegroup={recipegroup}
            userName={userprompt}
          />
          {comments && (
            <CommentList
              comments={comments}
              deleteComment={deleteComment}
              toggleComment={toggleComment}
              enterEditMode={enterEditMode}
              recipegroup={recipegroup}
              userName={userprompt}
            />
          )}
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default CommentPage;
