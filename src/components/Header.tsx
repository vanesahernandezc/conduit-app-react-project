import { useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();

  const isSameURL = (route: any) => {
    if (route === location.pathname) {
      return true;
    }
  };

  return (
    <header className="ng-scope ng-isolate-scope">
      <nav className="navbar navbar-light">
        <div className="container">
          <a className="navbar-brand" href="index.html">
            conduit
          </a>
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              {/* <!-- Add "active" className when you're on that page" --> */}
              <a
                className={isSameURL("/") ? "nav-link active" : "nav-link"}
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  isSameURL("/editor") ? "nav-link active" : "nav-link"
                }
                href="/editor"
              >
                {" "}
                <i className="ion-compose"></i>&nbsp;New Article{" "}
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  isSameURL("/settings") ? "nav-link active" : "nav-link"
                }
                href="/settings"
              >
                {" "}
                <i className="ion-gear-a"></i>&nbsp;Settings{" "}
              </a>
            </li>
            <li className="nav-item">
              <a
                className={isSameURL("/login") ? "nav-link active" : "nav-link"}
                href="/login"
              >
                Sign in
              </a>
            </li>
            <li className="nav-item">
              <a
                className={
                  isSameURL("/register") ? "nav-link active" : "nav-link"
                }
                href="/register"
              >
                Sign up
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
