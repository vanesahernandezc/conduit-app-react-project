import { useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const navigate = useNavigte();
  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const login = async (e: any) => {
    e.preventDefault();
    try {
      console.log(formData);
      const api = await fetch("https://api.realworld.io/api/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: formData }),
      });

      const users = await api.json();
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // TODO: send the data (email & password)

  /**
   * - create a fetch function
   * - send data through post fetch
   * - disabled the sign in button
   **/

  // TODO: receive a response
  // TODO: In case of error show the error message responsed
  // TODO: save the data
  // TODO: redirect user to the personalized home page
  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="??">Need an account?</Link>
            </p>

            <form>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={formData.email}
                  id="email"
                  onChange={onChange}
                />
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
              </fieldset>
              <button
                onClick={login}
                className="btn btn-lg btn-primary pull-xs-right"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
