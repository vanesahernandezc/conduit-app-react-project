import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
export function Editor(props: any) {
  const { setIsLoggedIn } = props;
  const [form, setForm] = useState({
    title: "",
    description: "",
    body: "",
    tagList: [],
  });

  const { slug } = useParams();
  const navigate = useNavigate();
  //TODO: after create a new article see demo to see where it goes

  useEffect(() => {
    (async () => {
      await getArticletoEdit();
    })();
  }, [slug]);

  const getArticletoEdit = async () => {
    try {
      const data = localStorage.getItem("user");
      if (!data) {
        return;
      }
      const user = JSON.parse(data);
      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
      const { article } = await response.json();
      setForm(article);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e: SyntheticEvent, form: any) => {
    e.preventDefault();
    const data = localStorage.getItem("user");
    if (!data) {
      return;
    }
    const user = JSON.parse(data);
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
    navigate("/");
  };

  const onChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
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
                    value={form?.title}
                    onChange={onChange}
                    id="title"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={form?.description}
                    onChange={onChange}
                    id="description"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows={8}
                    placeholder="Write your article (in markdown)"
                    value={form?.body}
                    onChange={onChange}
                    id="body"
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={form?.tagList}
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
            <hr />
          </div>
        </div>
      </div>
      {/* {JSON.stringify(form)} */}
    </div>
  );
}
