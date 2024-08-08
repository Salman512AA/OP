import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    const { email, password } = credentials; // Extract email and password from state
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token in local storage and redirect using useNavigate hook
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Loggedin successfuly ", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  return (
    <div>
      <h2 className="mt-3">Login to continue iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={credentials.email}
            name="email"
            onChange={onChange}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            id="password"
            name="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
