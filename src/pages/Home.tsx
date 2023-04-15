import { useEffect, useState } from "react";
import { Article } from "../interface/IArticles";
import { Link } from "react-router-dom";

export function Home() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const reqApi = async () => {
      const api = await fetch("https://api.realworld.io/api/articles");
      const data = await api.json();
      setArticles(data.articles);
    };
    reqApi();
  }, []);

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
                <li className="nav-item">
                  <Link className="nav-link active" to="???">
                    Global Feed
                  </Link>
                </li>
              </ul>
            </div>
            {articlesHtml}
          </div>
        </div>
      </div>
    </div>
  );
}
