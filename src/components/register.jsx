import { useState } from "react";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

import "../css/Auth.css";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    username: "",
    email: "",
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

        "http://127.0.0.1:8000/register/",

        formData
      );

      alert("Registration Successful");

      console.log(response.data);

      // Redirect to Login Page
      navigate("/login");

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="auth-container">

      <form className="auth-form" onSubmit={handleSubmit}>

        <h2>Register</h2>

        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />

        <button type="submit">
          Register
        </button>

        <p className="auth-text">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </form>

    </div>
  );
}

export default Register;