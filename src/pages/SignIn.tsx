import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const navigate = useNavigate();
  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  // TODO: set the error message in case email or password input is empty
  // TODO: just after click sign in button
  //TODO: check if the email input is empty
  //TODO: check if the password input is empty
  //TODO: if its empty show the message
  const login = async (e: any) => {
    e.preventDefault();
    const hasInputUser = formData.email.trim() === "";
    setErrorUser(hasInputUser);
    const hasInputPassword = formData.password.trim() === "";
    setErrorPassword(hasInputPassword);
    if (hasInputUser || hasInputPassword) {
      return;
    }

    // if (formData.email.trim() === "" ||formData.password.trim() === "" ) {
    //   setErrorUser(true);
    //   return;
    // }
    // if (formData.password.trim() === "") {
    //   setErrorPasword(true);
    //   return;
    // }
    try {
      setIsLoading(() => true);
      const api = await fetch("https://api.realworld.io/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: formData }),
      });
      const user = await api.json();
      localStorage.setItem("user", JSON.stringify(user));
      //or the stringify can acaparate the whole line
      navigate("/");
    } catch (error) {
    } finally {
      setIsLoading(() => false);
    }
  };

  // TODO: redirect user to the personalized home page
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link to="??">Need an account?</Link>
              </p>
              {/* <div className="ng-isolate-scope">
                <div className="error-messages">
                  <p className="error-messages">
                    {errorUser ? "email can't be blank" : null}
                  </p>
                  <p className="error-messages">
                    {errorPassword ? "password can't be blank" : null}
                  </p>
                </div>
              </div> */}

              <form>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    id="email"
                    onChange={onChange}
                  />
                  {errorUser && (
                    <p className="error-messages">email can't be blank</p>
                  )}
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={onChange}
                    id="password"
                  />
                  {errorPassword && (
                    <p className="error-messages">password can't be blank</p>
                  )}
                </fieldset>
                <button
                  onClick={login}
                  className="btn btn-lg btn-primary pull-xs-right"
                  disabled={isLoading}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
