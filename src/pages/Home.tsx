import { useEffect, useState } from "react";
import { IArticle } from "../interface/IArticles";

export function Home() {
  const [articles, setArticles] = useState<IArticle[]>([]);

  useEffect(() => {
    const reqApi = async () => {
      const api = await fetch("https://api.realworld.io/api/articles");
      const data = await api.json();
      setArticles(data.articles);
    };
    reqApi();
  }, []);

  const articlesHtml = articles?.map((article: IArticle, index: number) => (
    <div className="article-preview" key={index}>
      <div className="article-meta">
        <a href="profile.html">
          <img src={article.author.image} alt="" />
        </a>
        <div className="info">
          <a href="???" className="author">
            {article.author.username}
          </a>
          <span className="date">
            {new Date(article.createdAt).toDateString()}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a href="???" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </a>
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
                  <a className="nav-link active" href="???">
                    Global Feed
                  </a>
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
