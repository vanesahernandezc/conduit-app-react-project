import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRegister, setUserRegister] = useState<any>({
    username: "",
    email: "",
    password: "",
  });
  const { username, email, password } = userRegister;
  function isValidEmail(email: any) {
    return /\S+@\S+\.\S+/.test(email);
  }
  const [errorUser, setErrorUser] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const onChange = (e: any) => {
    setUserRegister((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const register = async (e: any) => {
    e.preventDefault();
    const hasInputUser = userRegister.username.trim() === "";
    setErrorUser(hasInputUser);
    const hasInputPassword = userRegister.password.trim() === "";
    setErrorPassword(hasInputPassword);
    const hasInputEmail = userRegister.email.trim() === "";
    setErrorEmail(hasInputEmail);
    if (hasInputUser || hasInputPassword || hasInputEmail) {
      return;
    }
    if (!isValidEmail(userRegister.email)) {
      setCheckValidEmail(true);
      return;
    }

    try {
      setIsLoading(() => true);
      const response = await fetch("https://api.realworld.io/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userRegister }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const registerApi = await response.json();
      localStorage.setItem("userRegister", JSON.stringify(userRegister));
      navigate("/");
    } catch (error) {
      console.log(error);
      setCheckValidEmail(false);
      setIsLoading(() => false);
      setErrorLogin(true);
    } finally {
      setIsLoading(() => false);
    }
  };
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign up</h1>
            <p className="text-xs-center">
              <Link to="???">Have an account?</Link>
            </p>
            {errorLogin && (
              <p className="error-messages">email or username has been taken</p>
            )}

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value={userRegister.username}
                  id="username"
                  onChange={onChange}
                  disabled={isLoading}
                />
                {errorUser && (
                  <p className="error-messages">username can't be blank</p>
                )}
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={userRegister.email}
                  id="email"
                  onChange={onChange}
                  disabled={isLoading}
                />
                {errorEmail && (
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
                  value={userRegister.password}
                  id="password"
                  onChange={onChange}
                  disabled={isLoading}
                />
                {errorPassword && (
                  <p className="error-messages">password can't be blank</p>
                )}
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={register}
                disabled={isLoading}
              >
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
