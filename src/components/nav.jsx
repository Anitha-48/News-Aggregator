import { Link } from "react-router-dom";
import { useState } from "react";
import "../css/nav.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="logo">NewsHub</div>

      {/* MENU ICON */}
      <div className="menu-icon" onClick={() => setOpen(!open)}>
        ☰
      </div>

      <ul className={open ? "nav-links active" : "nav-links"}>

        <li><a href="#home">Home</a></li>
        <li>
            <a href="#trending">Trending</a>
         </li>

        <li><a href="#podcast">Podcast</a></li>
        <li><a href="#contact">Contact</a></li>

        {/* CATEGORY DROPDOWN */}
        <li className="dropdown-parent">

          <div className="dropdown-title" onClick={() => setCatOpen(!catOpen)}>
            Categories <span className="arrow">▾</span>
          </div>

          {catOpen && (
            <ul className="dropdown-menu">

              <li><a href="#sports">Sports</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#technology">Technology</a></li>
              <li><a href="#health">Health</a></li>
              <li><a href="#business">Business</a></li>
              <li><a href="#entertainment">Entertainment</a></li>

            </ul>
          )}

        </li>

        {/* LOGIN MOBILE */}
        <li className="mobile-login">
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        </li>

      </ul>

      {/* DESKTOP LOGIN */}
      <div className="desktop-login">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;