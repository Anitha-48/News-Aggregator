import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

import "../css/dashboard.css";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  FaBars,
  FaTimes
} from "react-icons/fa";

function Dashboard() {

  const [news, setNews] = useState([]);

  const [search, setSearch] = useState("");

  const [category, setCategory] = useState("all");

  const [open, setOpen] = useState(false);

  const [showSidebar, setShowSidebar] =
    useState(false);

  const navigate = useNavigate();

  const username =
    localStorage.getItem("username");

  // ================= FETCH NEWS =================

  useEffect(() => {

    fetchNews(category);

  }, [category]);

  const fetchNews = async (cat) => {

    try {

      const url =

        cat === "all"

          ? "http://127.0.0.1:8000/get_news/"

          : `http://127.0.0.1:8000/get_news/?category=${cat}`;

      const response =
        await axios.get(url);

      setNews(
        Array.isArray(response.data)
          ? response.data
          : []
      );

    } catch (error) {

      console.log(error);

      setNews([]);

    }
  };

  // ================= SEARCH FILTER =================

  const filteredNews =
    (news || []).filter((item) => {

      const matchesSearch =
        item.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =

        category === "all"

          ? true

          : item.category
              ?.toLowerCase()
              === category.toLowerCase();

      return (
        matchesSearch &&
        matchesCategory
      );
    });

  // ================= SAVE NEWS =================

  const handleSave = async (item) => {

    try {

      await axios.post(

        "http://127.0.0.1:8000/save_news/",

        {
          title: item.title,
          description: item.description,
          image: item.image,
          news_url: item.news_url,
          category: item.category
        }
      );

      toast.success(
        "News Saved Successfully!"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to save news"
      );
    }
  };

  // ================= LOGOUT =================

  const logout = () => {

    localStorage.clear();

    window.location.href =
      "/login";
  };

  // ================= SIDEBAR TOGGLE =================

  const toggleSidebar = () => {

    setShowSidebar(!showSidebar);

  };

  const firstLetter =
    username?.charAt(0).toUpperCase();

  return (

    <>

      {/* MOBILE NAVBAR */}

      <div className="mobile-navbar">

        <h2>
          NewsHub
        </h2>

        <button
          className="menu-toggle"
          onClick={toggleSidebar}
        >

          {
            showSidebar
            ? <FaTimes />
            : <FaBars />
          }

        </button>

      </div>

      <div className="dashboard">

        {/* SIDEBAR */}

        <div
          className={
            showSidebar
            ? "sidebar active"
            : "sidebar"
          }
        >

          <h2 className="logo">
            NewsHub
          </h2>

          <ul>

            <li
              onClick={() => {

                navigate("/");

                setShowSidebar(false);

              }}
            >
              Home
            </li>

            {/* CATEGORY */}

            <li
              onClick={() =>
                setOpen(!open)
              }
            >
              Categories ▼
            </li>

            {open && (

              <div className="dropdown-menu">

                <li onClick={() => setCategory("sports")}>
                  Sports
                </li>

                <li onClick={() => setCategory("technology")}>
                  Technology
                </li>

                <li onClick={() => setCategory("education")}>
                  Education
                </li>

                <li onClick={() => setCategory("politics")}>
                  Politics
                </li>

                <li onClick={() => setCategory("health")}>
                  Health
                </li>

                <li onClick={() => setCategory("business")}>
                  Business
                </li>

                <li onClick={() => setCategory("entertainment")}>
                  Entertainment
                </li>

                <li onClick={() => setCategory("weather")}>
                  Weather
                </li>

                <li onClick={() => setCategory("transport")}>
                  Transport
                </li>

                <li onClick={() => setCategory("agriculture")}>
                  Agriculture
                </li>

                <li onClick={() => setCategory("crime")}>
                  Crime
                </li>

              </div>
            )}

            <li
              onClick={() => {

                navigate("/saved");

                setShowSidebar(false);

              }}
            >
              Saved News
            </li>

            <li>
              Trending
            </li>

            <li
              onClick={() => {

                navigate("/podcast");

                setShowSidebar(false);

              }}
            >
              Podcast 🎧
            </li>

            <li
              onClick={() => {

                navigate("/settings");

                setShowSidebar(false);

              }}
            >
              Settings
            </li>

            <li onClick={logout}>
              Logout
            </li>

          </ul>

        </div>

        {/* MAIN CONTENT */}

        <div className="main-content">

          {/* TOPBAR */}

          <div className="topbar">

            <input
              type="text"
              placeholder="Search latest news..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <div className="profile-section">

              <div className="welcome-text">

                <h3>
                  Hi, {username} 👋
                </h3>

                <p>
                  Welcome back
                </p>

              </div>

              <div className="letter-avatar">
                {firstLetter}
              </div>

            </div>

          </div>

          {/* CATEGORY BUTTONS */}

          <div className="categories">

            <button
              onClick={() =>
                setCategory("all")
              }
            >
              All
            </button>

            <button
              onClick={() =>
                setCategory("sports")
              }
            >
              Sports
            </button>

            <button
              onClick={() =>
                setCategory("technology")
              }
            >
              Technology
            </button>

            <button
              onClick={() =>
                setCategory("business")
              }
            >
              Business
            </button>

            <button
              onClick={() =>
                setCategory("health")
              }
            >
              Health
            </button>

            <button
              onClick={() =>
                setCategory("politics")
              }
            >
              Politics
            </button>

          </div>

          {/* NEWS GRID */}

          <div className="news-grid">

            {
              filteredNews.map(
                (item, index) => (

                  <div
                    className="news-card"
                    key={index}
                  >

                    <img
                      src={
                        item.image ||
                        "https://via.placeholder.com/300"
                      }
                      alt=""
                    />

                    <div className="news-content">

                      <h3>
                        {item.title}
                      </h3>

                      <p>
                        {item.description}
                      </p>

                      {/* BUTTON GROUP */}

                      <div className="card-buttons">

                        <a
                          href={item.news_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Read More
                        </a>

                        <button
                          onClick={() =>
                            handleSave(item)
                          }
                        >
                          Save ⭐
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )
            }

          </div>

        </div>

      </div>

    </>
  );
}

export default Dashboard;