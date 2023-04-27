import { useEffect, useState } from "react";

function Article() {
  const [articles, setArticle] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const item = localStorage.getItem("user");
        if (!item) {
          return;
        }
        const user = JSON.parse(item);

        const response = await fetch(
          `https://api.realworld.io/api/articles/nitai-164834`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${user.token}`,
              "content-type": "application/json",
            },
          }
        );
        const responseData = await response.json();

        setArticle(responseData.article);
      } catch (error) {}
    })();
  }, []);

  return (
    <>
      (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articles?.title}</h1>

            <div className="article-meta">
              <a href="??">
                <img src={user?.image} alt="descript" />
              </a>
              <div className="info">
                <a href="??" className="author">
                  {user?.username}
                </a>
                <span className="date">January 20th</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {user?.username}
                <span className="counter">(10)</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{articles?.body}</p>
              <h2 id="introducing-ionic">Introducing RealWorld.</h2>
              <p>
                It's a great solution for learning how other frameworks work.
              </p>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html">
                <img src={user?.image} alt="descript" />
              </a>
              <div className="info">
                <a href="??" className="author">
                  {user?.username}
                </a>
                <span className="date">January 20th</span>
              </div>
              <button className="btn btn-sm btn-outline-secondary">
                <i className="ion-plus-round"></i>
                &nbsp; Follow {user?.username}
              </button>
              &nbsp;
              <button className="btn btn-sm btn-outline-primary">
                <i className="ion-heart"></i>
                &nbsp; Favorite Post <span className="counter">(29)</span>
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form">
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img
                    src={user?.image}
                    alt="descript"
                    className="comment-author-img"
                  />
                  <button className="btn btn-sm btn-primary">
                    Post Comment
                  </button>
                </div>
              </form>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="??" className="comment-author">
                    <img
                      alt="descript"
                      src={user?.image}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="??" className="comment-author">
                    {user?.username}
                  </a>
                  <span className="date-posted">Dec 29th</span>
                </div>
              </div>

              <div className="card">
                <div className="card-block">
                  <p className="card-text">
                    With supporting text below as a natural lead-in to
                    additional content.
                  </p>
                </div>
                <div className="card-footer">
                  <a href="??" className="comment-author">
                    <img
                      alt="descript"
                      src={user?.image}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="??" className="comment-author">
                    {user?.username}
                  </a>
                  <span className="date-posted">Dec 29th</span>
                  <span className="mod-options">
                    <i className="ion-edit"></i>
                    <i className="ion-trash-a"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )
    </>
  );
}

export default Article;