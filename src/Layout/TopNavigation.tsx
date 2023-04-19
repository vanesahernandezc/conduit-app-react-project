import { Outlet } from "react-router-dom";
import { Header } from "../components/Header/Header";

export function TopNavigation(props: any) {
  const { isLoggedIn } = props;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
}
