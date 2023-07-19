// rrd imports
import { Outlet, useLoaderData } from "react-router-dom";

// assets
import wave from "../assets/wave.svg";

// components
import Nav from "../components/Nav";

//  helper functions
import { fetchData } from "../helpers"

import Cookies from 'js-cookie';

// loader
export async function mainLoader() {
  // cookie domain
  const cookieDomain = await import.meta.env.VITE_COOKIE_DOMAIN;

  // const userName = await fetchData("userName");
  const userName = await Cookies.get('userName', { domain: cookieDomain });
  // const user = await fetchData("user");
    const userString = await Cookies.get('user', { domain: cookieDomain });
  const user = userString ? JSON.parse(userString) : null;

  return { userName, user }
}

const Main = () => {
  const { userName } = useLoaderData()

  return (
    <div className="layout">
      <Nav userName={userName} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  )
}
export default Main