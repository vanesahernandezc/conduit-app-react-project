import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function SignUp() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userRegister, setUserRegister] = useState<any>({
    username: "",
    email: "",
    password: "",
  });
  const onChange = (e: any) => {
    setUserRegister((prevState: any) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const navigate = useNavigate();
  const register = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(() => true);
      const response = await fetch("https://api.realworld.io/api/users", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: userRegister }),
      });
      const registerApi = await response.json();
      localStorage.setItem("userRegister", JSON.stringify(userRegister));
      navigate("/");
    } catch (error) {
      console.log(error);
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

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Username"
                  value={userRegister.username}
                  id="username"
                  onChange={onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value={userRegister.email}
                  id="email"
                  onChange={onChange}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={userRegister.password}
                  id="password"
                  onChange={onChange}
                />
              </fieldset>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={register}
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
