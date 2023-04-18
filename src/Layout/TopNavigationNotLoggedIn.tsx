import { Outlet } from "react-router-dom";
import { HeaderNotLoggedIn } from "../components/Header/HeaderNotLoggedIn";

export function TopNavigationNotLoggedIn(props: any) {
  return (
    <>
      <HeaderNotLoggedIn />
      <Outlet />
    </>
  );
}
