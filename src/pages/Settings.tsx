import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Settings(props: any) {
  const { setIsLoggedIn } = props;
  const [updateForm, setUpdateForm] = useState<any>({
    email: "",
    password: "",
    username: "",
    bio: "",
    image: "",
  });
  const navigate = useNavigate();
  const onSubmit = async (e: any, updateForm: any) => {
    e.preventDefault();
    const data = localStorage.getItem("user");
    if (!data) {
      return;
    }
    const { user } = JSON.parse(data);
    await fetch("https://api.realworld.io/api/user", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user: updateForm,
      }),
    });
  };
  const onChange = (e: any) => {
    setUpdateForm({
      ...updateForm,
      [e.target.id]: e.target.value,
    });
  };
  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="settings-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Your Settings</h1>

            <form onSubmit={(e) => onSubmit(e, updateForm)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    id=""
                    placeholder="URL of profile picture"
                    onChange={onChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Username"
                    id="username"
                    value={updateForm.username}
                    onChange={onChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    rows={8}
                    placeholder="Short bio about you"
                    id="bio"
                    value={updateForm.bio}
                    onChange={onChange}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={updateForm.email}
                    onChange={onChange}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    className="form-control form-control-lg"
                    type="password"
                    placeholder="New Password"
                    id="password"
                    value={updateForm.password}
                    onChange={onChange}
                  />
                </fieldset>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary pull-xs-right"
                >
                  Update Settings
                </button>
              </fieldset>
            </form>
            <hr />
            <button className="btn btn-outline-danger" onClick={logout}>
              Or click here to logout.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
