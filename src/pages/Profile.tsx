import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export function Profile() {
  const [htmlArticles, setHtmlArticles] = useState<any>();
  const [active, setActive] = useState("1");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) {
      const user = JSON.parse(data);
      setUser(user);
    }
  }, []);
  const navigate = useNavigate();
  const handleClick = (event: any) => {
    setActive(event.target.id);
  };

  async function callFavoritedArticles() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }

      const user = JSON.parse(item);
      setLoading(true);
      const response = await fetch(
        `https://api.realworld.io/api/articles?favorited=${user.username}&limit=5&offset=0`,
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
      const favoritedHtml = toHtml(responseData.articles);
      // const slugArticle = onClick(responseData.)
      setHtmlArticles(favoritedHtml);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }
  //fUNCTION TO FAVORITE AN ARTICLE THROUGH THE BUTTON
  async function favoriteAnArticle() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }
      const user = JSON.parse(item);
      setLoading(true);
      const response = await fetch(
        `https://api.realworld.io/api/articles/${user.title}/favorite`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
    } catch {
      console.log("error");
    }
  }
  async function callMyArticles() {
    try {
      const item = localStorage.getItem("user");
      if (!item) {
        return;
      }
      const user = JSON.parse(item);
      setLoading(true);
      const response = await fetch(
        `https://api.realworld.io/api/articles?author=${user.username}&limit=5&offset=0`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );

      const responseData = await response.json();

      const feedHtml = toHtml(responseData.articles);

      setHtmlArticles(feedHtml);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    (async () => {
      await callMyArticles();
    })();
  }, []);

  function toHtml(articles: [] | null) {
    if (!articles || articles.length === 0) {
      return <p className="article-preview">"No articles here...yet"</p>;
    }

    return articles.map((article: any, index: number) => (
      <div className="article-preview" key={index}>
        <div className="article-meta">
          <button>
            <img src={article.author.image} alt="" />
          </button>
          <div className="info">
            <Link to="???" className="author">
              <div className="author ng-binding">{article.author.username}</div>
            </Link>
            <span className="date">
              {new Date(article.createdAt).toDateString()}
            </span>
          </div>
          <button
            onClick={favoriteAnArticle}
            className="btn btn-outline-primary btn-sm pull-xs-right"
          >
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
        <Link to="???" className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    ));
  }

  // const getAnArticle = async (slug: any) => {
  //   try {
  //     const response = await fetch(
  //       `https://api.realworld.io/api/profiles/${slug}`
  //     );
  //     const responseData = await response.json();
  //     console.log({ responseData });
  //     if (responseData) {
  //       const { slug } = responseData;
  //       console.log(slug);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // };
  //TODO: take the information of the post im clicking
  //TODO: pass to a fetch the title information through a variable in fetch
  //TODO: navigate to that page

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img
                className="user-img"
                src={user?.image}
                alt={user?.username}
              />
              <h4 className="ng-binding">{user?.username}</h4>
              <p className="ng-binding">{user?.bio}</p>
              <a
                className="btn btn-sm btn-outline-secondary action-btn"
                href="/settings"
              >
                <i className="ion-gear-a"></i> Edit Profile Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <button
                    className={`nav-link ${active === "1" && "active"}`}
                    id="1"
                    onClick={(e) => {
                      callMyArticles();
                      handleClick(e);
                    }}
                  >
                    My Articles
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={active === "2" ? "nav-link active" : "nav-link"}
                    id="2"
                    onClick={(e) => {
                      callFavoritedArticles();
                      handleClick(e);
                    }}
                  >
                    Favorited Articles
                  </button>
                </li>
              </ul>
            </div>
            {loading ? (
              <p className="article-preview">Loading articles...</p>
            ) : (
              htmlArticles
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
