import { Outlet } from "react-router-dom";
import { HeaderLoggedIn } from "../components/Header/HeaderLoggedIn";

export function TopNavigationLoggedIn(props: any) {
  return (
    <>
      <HeaderLoggedIn />
      <Outlet />
    </>
  );
}
