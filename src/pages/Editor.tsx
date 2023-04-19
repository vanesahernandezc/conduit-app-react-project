import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Editor(props: any) {
  const { setIsLoggedIn } = props;
  const [form, setForm] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });
  const navigate = useNavigate();

  const onSubmit = async (e: SyntheticEvent, form: any) => {
    e.preventDefault();
    const data = localStorage.getItem("user");
    if (!data) {
      return;
    }
    const { user } = JSON.parse(data);
    await fetch("https://api.realworld.io/api/articles", {
      method: "POST",
      headers: {
        authorization: `Bearer ${user.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        article: form,
      }),
    });
  };

  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    //TODO: send these values to th database
    //  -get the token
    // -put the token on headers
    // -Send data with post+
    //TODO: block the inputs
    //TODO: Redirect to the article page

    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={(e) => onSubmit(e, form)}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={form.title}
                    onChange={onChange}
                    id="title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={form.description}
                    onChange={onChange}
                    id="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={form.body}
                    onChange={onChange}
                    id="body"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={form.tagList}
                    onChange={onChange}
                    id="tagList"
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="submit"
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
