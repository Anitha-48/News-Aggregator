import { useEffect, useState } from "react";
import axios from "axios";
import "../css/settings.css";

function Settings() {

  const userId = localStorage.getItem("user_id");

  const [theme, setTheme] = useState("light");

  const [language, setLanguage] = useState("English");

  const [notifications, setNotifications] =
    useState(true);




    
// THEME USED
useEffect(() => {

  document.body.className = theme;

  localStorage.setItem("theme", theme);

}, [theme]);

  // GET SETTINGS
  useEffect(() => {

    fetchSettings();

  }, []);

  const fetchSettings = async () => {

    try {

      const response = await axios.get(
        `http://127.0.0.1:8000/get_settings/${userId}/`
      );

      setTheme(response.data.theme);

      setLanguage(response.data.language);

      setNotifications(
        response.data.notifications
      );

    } catch (error) {

      console.log(error);

    }
  };

  // UPDATE SETTINGS
  const updateSettings = async () => {

    try {

      await axios.patch(
        `http://127.0.0.1:8000/update_settings/${userId}/`,
        {
          theme,
          language,
          notifications
        }
      );

      alert("Settings Updated Successfully");

    } catch (error) {

      console.log(error);

    }
  };

  return (

    <div className="settings-page">

      <div className="settings-card">

        <div className="settings-header">

          <h1>
            ⚙️ Settings
          </h1>

          <p>
            Customize your NewsHub experience
          </p>

        </div>

        {/* THEME */}
        <div className="setting-box">

          <label>
            Theme
          </label>

          <select
            value={theme}
            onChange={(e) =>
              setTheme(e.target.value)
            }
          >

            <option value="light">
              Light
            </option>

            <option value="dark">
              Dark
            </option>

          </select>

        </div>

        {/* LANGUAGE */}
        <div className="setting-box">

          <label>
            Language
          </label>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(e.target.value)
            }
          >

            <option value="English">
              English
            </option>

            <option value="Tamil">
              Tamil
            </option>

            <option value="Hindi">
              Hindi
            </option>

          </select>

        </div>

        {/* NOTIFICATION */}
        <div className="setting-box toggle-box">

          <div>

            <h3>
              Notifications
            </h3>

            <p>
              Get latest breaking news alerts
            </p>

          </div>

          <label className="switch">

            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(
                  !notifications
                )
              }
            />

            <span className="slider"></span>

          </label>

        </div>

        {/* PROFILE */}
        <div className="profile-preview">

          <div className="avatar">

            {
              localStorage
                .getItem("username")
                ?.charAt(0)
                .toUpperCase()
            }

          </div>

          <div>

            <h3>
              {
                localStorage.getItem(
                  "username"
                )
              }
            </h3>

            <p>
              NewsHub User
            </p>

          </div>

        </div>

        {/* BUTTON */}
        <button
          className="save-btn"
          onClick={updateSettings}
        >

          Save Settings

        </button>

      </div>

    </div>
  );
}

export default Settings;