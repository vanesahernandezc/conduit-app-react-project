import { useEffect, useState } from "react";
import { IArticle } from "../interface/IArticles";
import { useParams } from "react-router-dom";
function Article(props: any) {
  const { isLoggedIn } = props;
  const [articles, setArticle] = useState<IArticle | null>(null);
  const [user, setUser] = useState<any>(null);
  const { slug } = useParams();
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
          `https://api.realworld.io/api/articles/${slug}`,
          {
            method: "GET",
            headers: {
              authorization: `Bearer ${user.token}`,
              "content-type": "application/json",
            },
          }
        );
        const responseData = await response.json();
        console.log(responseData);
        setArticle(responseData.article);
      } catch (error) {}
    })();
  }, []);

  const renderList = (tagList: string[] | undefined) => {
    if (!tagList) {
      return;
    }
    return tagList?.map((tag, index: number) => (
      <li
        key={index}
        className="tag-default tag-pill tag-outline ng-binding ng-scope"
      >
        {tag}
      </li>
    ));
  };

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articles?.title}</h1>

            <div className="article-meta">
              <a href="??">
                <img src={articles?.author.image} alt="descript" />
              </a>
              <div className="info">
                <a href="??" className="author">
                  {articles?.author.username}
                </a>
                <span className="date">{articles?.updatedAt.toString()}</span>
              </div>
              {isLoggedIn ? (
                <>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {articles?.author.username}
                    <span className="counter">(10)</span>
                  </button>
                  &nbsp;
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Post <span className="counter">(29)</span>
                  </button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{articles?.body}</p>
            </div>
          </div>

          <ul className="tag-list"> {renderList(articles?.tagList)}</ul>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html">
                <img src={articles?.author.image} alt="descript" />
              </a>
              <div className="info">
                <a href="??" className="author">
                  {articles?.author.username}
                </a>
                <span className="date">{articles?.updatedAt.toString()}</span>
              </div>
              {isLoggedIn ? (
                <>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {articles?.author.username}
                  </button>
                  &nbsp;
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Post <span className="counter">(29)</span>
                  </button>
                </>
              ) : null}
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
                      src={articles?.author.image}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="??" className="comment-author">
                    {articles?.author.username}
                  </a>
                  <span className="date-posted">
                    {articles?.createdAt.toString()}
                  </span>
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
                      src={articles?.author.image}
                      className="comment-author-img"
                    />
                  </a>
                  &nbsp;
                  <a href="??" className="comment-author">
                    {articles?.author.username}
                  </a>
                  <span className="date-posted">
                    {" "}
                    {articles?.createdAt.toString()}
                  </span>
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
    </>
  );
}

export default Article;
