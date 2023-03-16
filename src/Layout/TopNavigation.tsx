import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function TopNavigation() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default TopNavigation;
