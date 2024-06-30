import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState();
  const [isLogged, setIsLogged] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const getusername = localStorage.getItem("username");
    const getIsLogged = localStorage.getItem("isLogged");
    setUsername(getusername);
    setIsLogged(getIsLogged);
    if (!getusername && !getIsLogged) {
      navigate("/login");
    }
  }, []);

  const handleLogOut = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLogged");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" onClick={() => navigate("/")}>
            Home
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to="/employees"
                  aria-current="page"
                >
                  Employees List
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {username && isLogged ? (
                <div className="d-flex justify-content-center align-items-center">
                  <h5>{username} | &nbsp; </h5>
                  <button
                    className="btn btn-outline-success"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button className="btn btn-outline-success">
                  <Link to="/login">Login</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
