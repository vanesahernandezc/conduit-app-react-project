import { useEffect, useState } from "react";

function Profile() {
  const [articles, setArticles] = useState<any>([]);

  const getArticles = async (username: string) => {
    const api = await fetch(
      `https://api.realworld.io/api/articles?author=${username}`
    );
    return await api.json();
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      throw new Error("User not found");
    }

    (async () => {
      const { user } = await JSON.parse(data);
      const { articles } = await getArticles(user.username);
      setArticles(articles);
    })();
  }, []);

  const authorHTML = articles.map((article: any, index: any) => {
    return (
      <div key={index} className="col-xs-12 col-md-10 offset-md-1">
        <img src={article.author.image} className="user-img" alt="profile" />
        <h4>{article.author.username}</h4>
        <p>{article.author.bio}</p>
      </div>
    );
  });

  const articleHTML = articles.map((article: any, index: any) => {
    return (
      <div key={index} className="article-preview">
        <div className="article-meta">
          <a href="??">
            <img src={article.author.image} alt="author" />
          </a>
          <div className="info">
            <a href="??" className="author">
              {article.author.username}
            </a>
            <span className="date">{article.updatedAt}</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> {article.favoritesCount}
          </button>
        </div>
        <a href="??" className="preview-link">
          <h1>{article.title}</h1>
          <p>{article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    );
  });

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">{authorHTML}</div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="??">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="??">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {articleHTML}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
