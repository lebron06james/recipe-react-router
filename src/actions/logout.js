// rrd imports
import { redirect } from "react-router-dom";

// library
import { toast } from "react-toastify";

// helpers
import { deleteItem } from "../helpers";

import Cookies from 'js-cookie';

export async function logoutAction() {

  // delete the user
  // deleteItem({
  //   key: "user"
  // })
  // deleteItem({
  //   key: "userName"
  // })

  // cookie domain
  const cookieDomain = await import.meta.env.VITE_COOKIE_DOMAIN;

  await Cookies.remove('user', { path: '/', domain: cookieDomain });
  await Cookies.remove('userName', { path: '/', domain: cookieDomain });


  // deleteItem({
  //   key: "recipegroups"
  // })
  // deleteItem({
  //   key: "recipes"
  // })
  // deleteItem({
  //   key: "comments"
  // })
  // deleteItem({
  //   key: "ingredients"
  // })
  toast.success("You've signed-out sucessfully!")
  // return redirect
  return redirect("/")
}