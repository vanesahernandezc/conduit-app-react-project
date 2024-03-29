import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export function Header(props: any) {
  const { isLoggedIn } = props;
  const location = useLocation();
  const [click, setclick] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUser(user);
    }
  }, [isLoggedIn]);

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
            {isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      isSameURL("/editor") ? "nav-link active" : "nav-link"
                    }
                    to="/editor"
                  >
                    <i className="ion-compose"></i>&nbsp;New Article{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isSameURL("/settings") ? "nav-link active" : "nav-link"
                    }
                    to="/settings"
                  >
                    <i className="ion-gear-a"></i>&nbsp;Settings{" "}
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={
                      isSameURL("/login") ? "nav-link active" : "nav-link"
                    }
                    to="/profile"
                  >
                    <img
                      className="user-pic"
                      src={user?.image}
                      alt={user?.username}
                    />
                    &nbsp; {user?.username}
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className={
                      isSameURL("/login") ? "nav-link active" : "nav-link"
                    }
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
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}
