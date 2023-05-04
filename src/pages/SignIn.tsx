import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignIn(props: any) {
  const { setIsLoggedIn } = props;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  function isValidEmail(email: any) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const [isLoading, setIsLoading] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const navigate = useNavigate();
  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const login = async (e: any) => {
    e.preventDefault();
    const hasInputUser = formData.email.trim() === "";
    setErrorUser(hasInputUser);
    const hasInputPassword = formData.password.trim() === "";
    setErrorPassword(hasInputPassword);
    if (hasInputUser || hasInputPassword) {
      return;
    }
    if (!isValidEmail(formData.email)) {
      setCheckValidEmail(true);
      return;
    }

    try {
      setIsLoading(true);
      const api = await fetch("https://api.realworld.io/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: formData }),
      });

      const { user } = await api.json();
      if (!api.ok) {
        setErrorLogin(true);
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      setIsLoggedIn(true);

      navigate("/");
    } catch (error) {
      setIsLoading(false);
      return;
    } finally {
      setIsLoading(false);
    }
  };

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
              {errorLogin && (
                <p className="error-messages">email or password is invalid</p>
              )}

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
                  {checkValidEmail && (
                    <p className="error-messages">
                      Include an '@' symbol in the email address.
                    </p>
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
