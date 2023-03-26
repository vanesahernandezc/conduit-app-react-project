import { useEffect, useState } from "react";

function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [articles, setArticles] = useState<any>([]);

  const getArticles = async (username: string) => {
    const api = await fetch(
      `https://api.realworld.io/api/articles?author=${username}`
    );
    // return await api.json();
    return Promise.resolve({
      articles: [
        {
          slug: "Jonghyun-Y-si-fuera-ella-146543",
          title: "Jonghyun - Y si fuera ella",
          description: "A really good song",
          body: "The song \"Y si fuera Ella\" is a touching ballad by the late K-Pop artist Jonghyun of SHINee. The song, released in 2010 as part of his first solo album, tells the story of Jonghyun imagining what life would be like for his loved one without him. With his emotive and sweet voice, Jonghyun expresses his desire to be someone that his loved one can trust and always rely on.\n\nThe lyrics of the song have been praised for their emotionality and Jonghyun's ability to convey his feelings through music. The song has become a K-Pop classic and has been loved by fans all around the world, not only for the emotional lyrics but also for Jonghyun's ability as a composer and artist.\n\nIn summary, \"Y si fuera Ella\" is an iconic and emotional K-Pop song that continues to be loved by fans all around the world. With its touching lyrics and Jonghyun's sweet and emotive voice, the song is a perfect example of Jonghyun's ability as a composer and artist to touch people's hearts through his music.",
          tagList: [],
          createdAt: "2023-03-26T04:42:11.642Z",
          updatedAt: "2023-03-26T04:43:13.479Z",
          favorited: false,
          favoritesCount: 0,
          author: {
            username: "vanHerC",
            bio: null,
            image: "https://api.realworld.io/images/smiley-cyrus.jpeg",
            following: false,
          },
        },
      ],
      articlesCount: 1,
    });
  };

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      throw new Error("User not found");
    }

    (async () => {
      const { user } = await JSON.parse(data);
      setProfile(user);
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
