import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../css/Auth.css";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",

    password: "",
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const response = await axios.post(
      "http://127.0.0.1:8000/login/",
      {
        username: formData.username,
        password: formData.password,
      }
    );

    console.log(response.data);

    // STORE TOKEN
    localStorage.setItem(
      "token",
      response.data.token
    );

    // STORE USERNAME
    localStorage.setItem(
      "username",
      response.data.username
    );
    localStorage.setItem(
  "user_id",
  response.data.user_id
);

    // STORE ROLE
    localStorage.setItem(
      "role",
      response.data.role
    );

    alert("Login Successful");

    // ROLE BASED NAVIGATION

    if (response.data.role === "admin") {

      navigate("/admin");

    } else {

      navigate("/dashboard");
    }

  } catch (error) {

    console.log(error);

    alert("Invalid Username or Password");

    // STAY IN LOGIN PAGE
    navigate("/login");
  }
};
  return (

    <div className="auth-container">

      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >

        <h2>

          Login

        </h2>

        {/* USERNAME */}

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        {/* PASSWORD */}

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        {/* LOGIN BUTTON */}

        <button type="submit">

          Login

        </button>

        {/* REGISTER LINK */}

        <p className="auth-text">

          Don't have an account?

          <Link to="/register">

            Register

          </Link>

        </p>

      </form>

    </div>
  );
}

export default Login;