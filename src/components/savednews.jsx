import { useEffect, useState } from "react";
import axios from "axios";
import "../css/savednews.css";

function SavedNews() {

  const [savedNews, setSavedNews] = useState([]);

  // FETCH SAVED NEWS
  useEffect(() => {

    fetchSavedNews();

  }, []);

  // GET SAVED NEWS
  const fetchSavedNews = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/get_saved_news/"
      );

      console.log(response.data);

      setSavedNews(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.log(error);

      setSavedNews([]);
    }
  };

  return (

    <div className="saved-container">

      {/* HEADER */}
      <div className="saved-header">

        <h1>
          ⭐ Saved News
        </h1>

        <p>
          Your bookmarked articles appear here
        </p>

      </div>

      {/* EMPTY STATE */}
      {
        savedNews.length === 0 ? (

          <div className="empty-box">

            <h2>
              No Saved News Yet 😢
            </h2>

            <p>
              Click Save button on news to add here
            </p>

          </div>

        ) : (

          <div className="saved-grid">

            {
              savedNews.map((item) => (

                <div
                  className="saved-card"
                  key={item.id}
                >

                  {/* IMAGE */}
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/300"
                    }
                    alt="news"
                  />

                  {/* CONTENT */}
                  <div className="saved-content">

                    <h3>
                      {item.title}
                    </h3>

                    <p>
                      {item.description}
                    </p>

                    <a
                      href={item.news_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Read More →
                    </a>

                    <p
                      style={{
                        marginTop: "10px",
                        fontWeight: "bold"
                      }}
                    >
                      Category: {item.category}
                    </p>

                  </div>

                </div>
              ))
            }

          </div>
        )
      }

    </div>
  );
}

export default SavedNews;