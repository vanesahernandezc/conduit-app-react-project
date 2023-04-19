import { useEffect, useState } from "react";
import { Article } from "../interface/IArticles";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function Home(props: any) {
  const { isLoggedIn } = props;
  const [articles, setArticles] = useState<Article[]>([]);
  const location = useLocation();
  const [feedArticles, setFeedArticles] = useState<any>([]);
  const isSameURL = (route: any) => {
    if (route === location.pathname) {
      return true;
    }
  };
  useEffect(() => {
    const reqApi = async () => {
      const api = await fetch("https://api.realworld.io/api/articles");
      const data = await api.json();
      setArticles(data.articles);
    };
    reqApi();
  }, []);
  //Test this problem

  // useEffect(() => {
  //   const yourFeedApi = async () => {
  //     const response = await fetch(
  //       "https://api.realworld.io/api/articles/feed?limit=10&offset=0"
  //     );
  //     const feedApi = await response.json();
  //     setFeedArticles(feedApi);
  //   };
  //   yourFeedApi();
  // }, []);

  const yourFeedHTML = feedArticles?.map((feedArt: any, index: any) => (
    <div className="article-preview" key={index}>
      <div className="article-meta">
        <Link to="profile.html">
          <img src={feedArt.author.image} alt="" />
        </Link>
        <div className="info">
          <Link to="???" className="author">
            {feedArt.author.username}
          </Link>
          <span className="date">
            {new Date(feedArt.createdAt).toDateString()}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {feedArt.favoritesCount}
        </button>
      </div>
      <Link to="???" className="preview-link">
        <h1>{feedArt.title}</h1>
        <p>{feedArt.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  ));

  const articlesHtml = articles?.map((article: Article, index: number) => (
    <div className="article-preview" key={index}>
      <div className="article-meta">
        <Link to="profile.html">
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
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
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
                {isLoggedIn ? (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="???">
                        Your Feed
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link active" to="???">
                        Global Feed
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link active" to="???">
                        Global Feed
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
            {articlesHtml}
            {yourFeedHTML ?? "No articles are here...yet."}
          </div>
        </div>
      </div>
    </div>
  );
}
