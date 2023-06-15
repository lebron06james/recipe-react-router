// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

export async function logoutAction() {
  // delete the user
  deleteItem({
    key: "user"
  })
  deleteItem({
    key: "userName"
  })
  deleteItem({
    key: "events"
  })
  deleteItem({
    key: "recipes"
  })
  deleteItem({
    key: "comments"
  })
  deleteItem({
    key: "ingredients"
  })
  toast.success("You've signed-out sucessfully!")
  // return redirect
  return redirect("/")
}