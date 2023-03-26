import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const onChange = (e: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };
  const login = async (e: any) => {
    e.preventDefault();
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
      console.log(error);
    } finally {
      setIsLoading(() => false);
    }
  };

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
                disabled={isLoading}
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
