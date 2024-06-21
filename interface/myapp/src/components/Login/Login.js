import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./form.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const getusername = localStorage.getItem("username");
    const getIsLogged = localStorage.getItem("isLogged");
    if (getusername && getIsLogged) {
      navigate("/");
    }
  }, []);

  const collectloginData = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch("http://localhost:3001/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
      result = await result.json();
      if (result.status === "success") {
        const username = result.user.f_userName;
        const password = result.user.f_Pwd;
        console.log(username, password);
        if (username && password) {
          localStorage.setItem("username", username);
          localStorage.setItem("isLogged", 1);
          Swal.fire({
            title: "Success!!",
            text: "success",
            icon: "success",
          });
          navigate("/");
        } else {
          localStorage.removeItem("username");
          localStorage.removeItem("isLogged");
        }
      } else {
        Swal.fire({
          title: "Oopss!!!",
          text: result.message,
          icon: "error",
          confirmButtonText: "Retry",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Oopss!!!",
        text: error,
        icon: "error",
        confirmButtonText: "Go Back",
      });
    }
  };
  return (
    <div className="container">
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div
          className="col-6"
          style={{
            border: "1px solid black",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div className="child-flex form-group">
            <h1>Login to Your Account</h1>
            <hr />
            <label htmlFor="username">
              <b>Username</b>
            </label>
            <input
              className="form-control"
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              name="username"
              placeholder="Enter username"
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              className="form-control"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
              placeholder="Enter your password"
              required
            />
            <button
              type="submit"
              onClick={collectloginData}
              className="signupbtn"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
