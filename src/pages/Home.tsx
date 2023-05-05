import { useEffect, useState } from "react";
import { IArticle } from "../interface/IArticles";
import { Link } from "react-router-dom";

export function Home(props: any) {
  const { isLoggedIn } = props;
  const [htmlArticles, setHtmlArticles] = useState<any>();
  const [htmlTag, setHtmlTag] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(2);

  useEffect(() => {
    (async () => {
      await callApiGlobal();
      await getTags();
    })();
  }, []);

  async function getTags() {
    try {
      const api = await fetch("https://api.realworld.io/api/tags");
      const data = await api.json();
      console.log(data);
      const tagsApi = toHtmlTag(data.tags);
      setHtmlTag(tagsApi);
    } catch (error) {
      console.error(error);
    }
  }

  async function callApiGlobal() {
    try {
      setLoading(true);
      const api = await fetch("https://api.realworld.io/api/articles");
      const data = await api.json();
      const globalHtml = toHtml(data.articles);

      setHtmlArticles(globalHtml);
    } catch (error) {
      console.error(error);
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleFavoriteClick = async (article: any) => {
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
      await callApiGlobal();
    } catch (error) {
      console.error(error);
    }
  };
  //TODO: fix tag CSS render in the right part of ur screen

  function toHtml(articles: [] | null) {
    if (!articles || articles.length === 0) {
      return <p className="article-preview">"No articles here...yet"</p>;
    }
    const item = localStorage.getItem("user");
    if (!item) {
      return;
    }
    const user = JSON.parse(item);

    return articles.map((article: IArticle, index: number) => (
      <div className="ng-scope ng-isolate-scope">
        <div className="article-preview" key={index}>
          <div className="ng-isolate-scope">
            <div className="article-meta">
              <Link
                to={`https://api.realworld.io/api/profiles/${article.author.image}`}
              >
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
                className={`btn btn-sm pull-xs-right ${
                  article.favorited ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={(e) => {
                  handleFavoriteClick(article);
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
            {article.tagList.map((tag: any, index: number) => (
              <ul className="tag-list" key={index}>
                <li className="tag-default tag-pill tag-outline ng-binding ng-scope">
                  {tag}
                </li>
              </ul>
            ))}
          </div>
        </div>
      </div>
    ));
  }
  function toHtmlTag(tags: any) {
    if (!tags || tags.length === 0) {
      return <p className="article-preview">" No tags are here... yet."</p>;
    }
    return tags.map((tag: any, index: number) => (
      <div key={index} className="tag-default tag-pill ng-binding ng-scopet">
        {tag}
      </div>
    ));
  }
  return (
    <div className="home-page">
      {!isLoggedIn && (
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
      )}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {/*&& -return just if its logged, noted that just run another space in the feed space */}
                {isLoggedIn && (
                  <li className="nav-item">
                    <button
                      className={`nav-link ${active === 1 && "active"}`}
                      id="1"
                      onClick={(e) => {
                        callApiFeed();
                        setActive(1);
                      }}
                    >
                      Your Feed
                    </button>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    className={`nav-link ${active === 2 && "active"}`}
                    id="2"
                    onClick={(e) => {
                      callApiGlobal();
                      setActive(2);
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
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              {htmlTag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
