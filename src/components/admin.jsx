import axios from "axios";
import { toast } from "react-toastify";
import "../css/admin.css";

import { useNavigate } from "react-router-dom";

import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  FaPlus,
  FaUsers,
  FaChartBar,
  FaNewspaper,
  FaFire,
  FaFileExport,
  FaBars,
  FaTimes
} from "react-icons/fa";

function Admin() {

  // ================= STATES =================

  const [news, setNews] = useState([]);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");

  const [newsUrl, setNewsUrl] = useState("");

  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);

  // MOBILE SIDEBAR

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const navigate = useNavigate();

  const formRef = useRef(null);

  // ================= USER =================

  const username =
    localStorage.getItem("username") ||
    "Admin";

  const firstLetter =
    username.charAt(0).toUpperCase();

  // ================= FETCH NEWS =================

  useEffect(() => {

    fetchNews();

  }, []);

  const fetchNews = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/get_news/"
      );

      setNews(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  // ================= SCROLL FORM =================

  const scrollToForm = () => {

    formRef.current?.scrollIntoView({

      behavior: "smooth",

      block: "start"
    });

    setSidebarOpen(false);
  };

  // ================= EDIT =================

  const editNews = async (id) => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/get_one_news/${id}/`
      );

      const item = response.data;

      setEditId(item.id);

      setTitle(item.title);

      setDescription(item.description);

      setImage(item.image);

      setNewsUrl(item.news_url);

      setCategory(item.category);

      scrollToForm();

    } catch (error) {

      console.log(error);
    }
  };

  // ================= CREATE =================

  const createNews = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.post(

        "http://127.0.0.1:8000/create_news/",

        {
          title,
          description,
          image,
          news_url: newsUrl,
          category
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "News Added Successfully"
      );

      fetchNews();

      clearForm();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to create news"
      );
    }
  };

  // ================= UPDATE =================

  const patchNews = async () => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.patch(

        `http://127.0.0.1:8000/patch_news/${editId}/`,

        {
          title,
          description,
          image,
          news_url: newsUrl,
          category
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success(
        "News Updated Successfully"
      );

      fetchNews();

      clearForm();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update news"
      );
    }
  };

  // ================= DELETE =================

  const deleteNews = async (id) => {

    try {

      const token =
        localStorage.getItem("token");

      await axios.delete(

        `http://127.0.0.1:8000/delete_news/${id}/`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      toast.success("News Deleted");

      fetchNews();

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to delete news"
      );
    }
  };

  // ================= LOGOUT =================

  const logout = () => {

    localStorage.clear();

    navigate("/login");
  };

  // ================= CLEAR FORM =================

  const clearForm = () => {

    setTitle("");

    setDescription("");

    setImage("");

    setNewsUrl("");

    setCategory("");

    setEditId(null);
  };

  return (

    <div className="admin-dashboard">

      {/* TOGGLE BUTTON */}

      <button
        className="menu-toggle"
        onClick={() =>
          setSidebarOpen(!sidebarOpen)
        }
      >

        {
          sidebarOpen
          ? <FaTimes />
          : <FaBars />
        }

      </button>

      {/* OVERLAY */}

      {
        sidebarOpen && (

          <div
            className="sidebar-overlay"
            onClick={() =>
              setSidebarOpen(false)
            }
          ></div>
        )
      }

      {/* SIDEBAR */}

      <div
        className={
          sidebarOpen
          ? "sidebar1 active"
          : "sidebar1"
        }
      >

        <h2 className="logo1">
          NewsHub Admin
        </h2>

        <ul>

          <li
            onClick={() => {

              navigate("/dashboard");

              setSidebarOpen(false);
            }}
          >
            Dashboard
          </li>

          <li
            onClick={() => {

              navigate("/analytics");

              setSidebarOpen(false);
            }}
          >
            Analytics
          </li>

          <li
            onClick={() => {

              navigate("/admin/users");

              setSidebarOpen(false);
            }}
          >
            Users
          </li>

          <li
            onClick={() => {


              setSidebarOpen(false);
            }}
          >
            Categories
          </li>

          <li
            onClick={() => {

              navigate("");

              setSidebarOpen(false);
            }}
          >
            Trending
          </li>

          <li
            onClick={() => {

              navigate("");

              setSidebarOpen(false);
            }}
          >
            Podcast 🎧
          </li>

          <li onClick={logout}>
            Logout
          </li>

        </ul>

      </div>

      {/* MAIN CONTENT */}

      <div className="main-content1">

        {/* TOPBAR */}

        <div className="topbar1">

          <div>

            <h1>
              Admin Dashboard
            </h1>

            <p>
              Manage latest news and analytics
            </p>

          </div>

          <div className="admin-profile">

            <div className="avatar1">
              {firstLetter}
            </div>

            <div>

              <span>
                Welcome Back
              </span>

              <h3>
                {username}
              </h3>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="quick-actions">

          {/* ADD NEWS */}

          <div
            className="action-card"
            onClick={scrollToForm}
          >

            <FaPlus className="action-icon" />

            <h3>Add News</h3>

            <p>
              Create latest news articles
            </p>

          </div>

          {/* ANALYTICS */}

          <div
            className="action-card1"
            onClick={() =>
              navigate("/analytics")
            }
          >

            <FaChartBar className="action-icon" />

            <h3>Analytics</h3>

            <p>
              View dashboard reports
            </p>

          </div>

          {/* USERS */}

          <div
            className="action-card1"
            onClick={() =>
              navigate("/admin/users")
            }
          >

            <FaUsers className="action-icon" />

            <h3>Users</h3>

            <p>
              Manage all users
            </p>

          </div>

          {/* CATEGORIES */}

          <div
            className="action-card1"
            onClick={() =>
              navigate("")
            }
          >

            <FaNewspaper className="action-icon" />

            <h3>Categories</h3>

            <p>
              Manage categories
            </p>

          </div>

          {/* TRENDING */}

          <div
            className="action-card1"
            onClick={() =>
              navigate("")
            }
          >

            <FaFire className="action-icon" />

            <h3>Trending</h3>

            <p>
              Top performing news
            </p>

          </div>

          {/* REPORTS */}

          <div
            className="action-card1"
            onClick={() =>
              navigate()
            }
          >

            <FaFileExport className="action-icon" />

            <h3>Reports</h3>

            <p>
              Export reports
            </p>

          </div>

        </div>

        {/* FORM */}

        <div
          className="admin-form"
          ref={formRef}
        >

          <h2>

            {
              editId
              ? "Update News"
              : "Create News"
            }

          </h2>

          <input
            type="text"
            placeholder="News Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="News URL"
            value={newsUrl}
            onChange={(e) =>
              setNewsUrl(e.target.value)
            }
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          />

          <button
            onClick={
              editId
              ? patchNews
              : createNews
            }
          >

            {
              editId
              ? "Update News"
              : "Add News"
            }

          </button>

        </div>

        {/* NEWS GRID */}

        <div className="news-grid">

          {
            news.map((item) => (

              <div
                className="news-card"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt="news"
                />

                <div className="news-content">

                  <span className="category-badge">
                    {item.category}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="button-group">

                    <button
                      className="edit-btn"
                      onClick={() =>
                        editNews(item.id)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteNews(item.id)
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))
          }

        </div>

      </div>

    </div>
  );
}

export default Admin;