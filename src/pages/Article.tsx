import { useEffect, useState } from "react";
import { IArticle } from "../interface/IArticles";
import { Link, useParams } from "react-router-dom";
import { IUser } from "../interface/IUser";
import { IComments } from "../interface/IComments";
import { useNavigate } from "react-router-dom";
function Article(props: any) {
  const { isLoggedIn } = props;
  const [article, setArticle] = useState<IArticle | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [comments, setComments] = useState<IComments[]>([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      getUser();
      await Promise.all([callArticlesApi(), callCommentsApi()]);
    })();
  }, []);

  function getUser() {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUser(user);
    }
  }

  async function callArticlesApi() {
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
      console.log("thisfunctioncallapi");
      setArticle(responseData.article);
    } catch (error) {}
  }

  async function callCommentsApi() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }
      const user = JSON.parse(item);

      const response = await fetch(
        `https://api.realworld.io/api/articles/${slug}/comments`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      setComments(responseData.comments);
    } catch (error) {}
  }

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
  const getCreatedArticle = async () => {
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
          body: JSON.stringify({
            comment: comments,
          }),
        }
      );
      const { article } = await response.json();
      setComments(article);
    } catch (error) {
      console.error(error);
    }
  };

  const renderComments = (comments: IComments[]) => {
    if (!comments) {
      return;
    }
    return comments?.map((comment, index: number) => (
      <div key={index} className="card">
        <div className="card-block">
          <p className="card-text">{comment.body}</p>
        </div>
        <div className="card-footer">
          <a href="??" className="comment-author">
            <img
              alt="name"
              src={comment.author.image}
              className="comment-author-img"
            />
          </a>
          &nbsp;
          <a href="?" className="comment-author">
            {comment.author.username}
          </a>
          <span className="date-posted">Dec 29th</span>
          {user?.username === comment.author.username && (
            <>
              <span className="mod-options">
                <i
                  className="ion-trash-a"
                  onClick={() => deleteComment(comment)}
                ></i>
              </span>
            </>
          )}
        </div>
      </div>
    ));
  };

  const deleteComment = async (comment: any) => {
    console.count();
    const data = localStorage.getItem("user");
    if (!data) {
      return;
    }
    const user = JSON.parse(data);
    await fetch(
      `https://api.realworld.io/api/articles/${article?.slug}/comments/${comment.id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${user.token}`,
          "content-type": "application/json",
        },
      }
    );
    await callCommentsApi();
  };
  //TODO: make works this button
  async function createComment() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }

      const user = JSON.parse(item);

      const response = await fetch(
        `https://api.realworld.io/api/articles/${article?.slug}/comments`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            comment: comments,
          }),
        }
      );
      const responseData = await response.json();
      setComments(responseData.comments);
      await callCommentsApi();
    } catch (error) {
      console.error(error);
    }
  }

  async function followUser() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }

      const user = JSON.parse(item);

      const response = await fetch(
        `https://api.realworld.io/api/profiles/${article?.author.username}/follow`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {}
  }
  //TODO: BUTTON FOLLOW AND UNFOLLOW AT CLICKING
  async function UnfollowUser() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }

      const user = JSON.parse(item);

      const response = await fetch(
        `https://api.realworld.io/api/profiles/${article?.author.username}/follow`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {}
  }

  async function favoriteArticle() {
    const item = localStorage.getItem("user");
    if (!item) {
      return;
    }
    const user = JSON.parse(item);

    try {
      const response = await fetch(
        `https://api.realworld.io/api/articles/${article?.slug}/favorite`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function editArticle() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }

      const user = JSON.parse(item);

      const response = await fetch(
        `https://api.realworld.io/api/articles/${article?.slug}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
      const responseData = await response.json();

      console.log("aqui");
    } catch (error) {}
  }

  async function deleteArticle() {
    const item = localStorage.getItem("user");
    if (!item) {
      return;
    }
    const user = JSON.parse(item);

    try {
      const response = await fetch(
        `https://api.realworld.io/api/articles/${article?.slug}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  //TODO:  when its not signing its not receiving article fetch to read it
  const getAnArticleAtCreating = async () => {
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
      setArticle(article);
    } catch (error) {
      console.error(error);
    }
  };

  function renderArticleButtons() {
    return (
      <>
        {article?.author.username === user?.username ? (
          <>
            {" "}
            <Link
              to={`/editor/${article?.slug}`}
              className="btn btn-outline-secondary btn-sm"
              ui-sref="app.editor({ slug: $ctrl.article.slug })"
              onClick={editArticle}
            >
              <i className="ion-edit"></i> Edit Article
            </Link>
            &nbsp;
            <button
              className="btn btn-outline-danger btn-sm"
              ng-class="{disabled: $ctrl.isDeleting}"
              ng-click="$ctrl.deleteArticle()"
              onClick={deleteArticle}
            >
              <i className="ion-trash-a"></i> Delete Article
            </button>
          </>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={followUser}
            >
              <i className="ion-plus-round"></i>
              &nbsp; Follow {article?.author.username}
            </button>
            &nbsp;
            <button
              onClick={favoriteArticle}
              className="btn btn-sm btn-outline-primary"
            >
              <i className="ion-heart"></i>
              &nbsp; Favorite Post <span className="counter">(29)</span>
            </button>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article?.title}</h1>

            <div className="article-meta">
              <a href="??">
                <img src={article?.author.image} alt="descript" />
              </a>
              <div className="info">
                <a href="??" className="author">
                  {article?.author.username}
                </a>
                <span className="date">{article?.updatedAt.toString()}</span>
              </div>
              <>{renderArticleButtons()}</>
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{article?.body}</p>
            </div>
          </div>

          <ul className="tag-list"> {renderList(article?.tagList)}</ul>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html">
                <img src={article?.author.image} alt="descript" />
              </a>
              <div className="info">
                <a href="??" className="author">
                  {article?.author.username}
                </a>
                <span className="date">{article?.updatedAt.toString()}</span>
              </div>
              {renderArticleButtons()}
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
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={createComment}
                  >
                    Post Comment
                  </button>
                </div>
              </form>

              {renderComments(comments)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Article;
