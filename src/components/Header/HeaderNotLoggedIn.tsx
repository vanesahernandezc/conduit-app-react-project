import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function HeaderNotLoggedIn() {
  const location = useLocation();
  const [click, setclick] = useState(false);

  const isSameURL = (route: any) => {
    if (route === location.pathname) {
      return true;
    }
  };
  const cambiarValor = () => {
    setclick(!click);
  };

  return (
    <header className="ng-scope ng-isolate-scope">
      <nav className="navbar navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            conduit
          </Link>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* <!-- Add "active" className when you're on that page" --> */}
              <Link
                // className={isSameURL("/") ? "nav-link active" : "nav-link"}
                className={click ? "nav-link active" : "nav-link"}
                onClick={cambiarValor}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={isSameURL("/login") ? "nav-link active" : "nav-link"}
                to="/login"
              >
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={
                  isSameURL("/register") ? "nav-link active" : "nav-link"
                }
                to="/register"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
