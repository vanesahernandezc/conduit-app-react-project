import { useEffect, useState } from "react";
import { IArticle } from "../interface/IArticles";
import { Link } from "react-router-dom";

export function Home(props: any) {
  const { isLoggedIn } = props;

  const [htmlArticles, setHtmlArticles] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("2");

  useEffect(() => {
    (async () => {
      await callApiGlobal();
    })();
  }, []);

  const handleClick = (event: any) => {
    setActive(event.target.id);
  };

  async function callApiGlobal() {
    try {
      setLoading(true);
      const api = await fetch("https://api.realworld.io/api/articles");
      const data = await api.json();

      const globalHtml = toHtml(data.articles);

      setHtmlArticles(globalHtml);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  }

  async function callApiFeed() {
    try {
      const item = localStorage.getItem("user");

      if (!item) {
        return;
      }
      const user = JSON.parse(item);
      setLoading(true);
      const response = await fetch(
        "https://api.realworld.io/api/articles/feed?limit=10&offset=0",
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const selectFavorite = async (article: any) => {
    const item = localStorage.getItem("user");
    if (!item) {
      return;
    }
    const user = JSON.parse(item);

    try {
      const response = await fetch(
        `https://api.realworld.io/api/articles/${article.slug}/favorite`,
        {
          method: article.favorited ? "DELETE" : "POST",

          headers: {
            authorization: `Bearer ${user.token}`,
            "content-type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //articles like responseData.articles
  function toHtml(articles: [] | null) {
    if (!articles || articles.length === 0) {
      return <p className="article-preview">"No articles here...yet"</p>;
    }

    return articles.map((article: IArticle, index: number) => (
      <div className="article-preview" key={index}>
        <div className="article-meta">
          <Link to="https://api.realworld.io/api/profiles/vanka1">
            <img src={article.author.image} alt="" />
          </Link>
          <div className="info">
            <Link to="???" className="author">
              {article.author.username}
            </Link>
            <span className="date">
              {new Date(article.createdAt).toDateString()}
            </span>
          </div>

          <button
            // btn btn-sm btn-primary
            // btn btn-sm btn-outline-primary
            className={`btn btn-sm pull-xs-right btn-${
              !article.favorited && "outline"
            }-primary`}
            onClick={() => {
              selectFavorite(article);
              callApiGlobal();
            }}
          >
            <i className="ion-heart"></i>
            {article.favoritesCount}
          </button>
        </div>

        <Link to={`/article/${article.slug}`} className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </Link>
      </div>
    ));
  }

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1 className="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {/*&& -return just if its logged, noted that just run another space in the feed space */}
                {isLoggedIn && (
                  <li className="nav-item">
                    <button
                      className={`nav-link ${active === "1" && "active"}`}
                      id="1"
                      onClick={(e) => {
                        callApiFeed();
                        handleClick(e);
                      }}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className={active === "2" ? "nav-link active" : "nav-link"}
                    id="2"
                    onClick={(e) => {
                      callApiGlobal();
                      handleClick(e);
                    }}
                  >
                    Global Feed
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
