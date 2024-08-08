import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Navbar = () => {
  const context = useContext(noteContext);
  //destructuring ,instead we can also write context.notes
  const navigate = useNavigate();
  const handlelogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            iNoteBook
          </NavLink>
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
                <NavLink className="nav-link " aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">
                  About
                </NavLink>
              </li>
              <NavLink
                className="nav-link "
                aria-current="page"
                to="/aboutuser"
              >
                About User
              </NavLink>
            </ul>
            {!localStorage.getItem("token") ? (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/login"
                  role="button"
                >
                  Login
                </Link>
                <Link
                  className="btn btn-primary mx-1"
                  to="/signup"
                  role="button"
                >
                  Signup
                </Link>
              </form>
            ) : (
              <form className="d-flex">
                <Link
                  className="btn btn-primary mx-1"
                  to="/aboutuser"
                  role="button"
                  onClick={context.getUserdata}
                >
                  About User
                </Link>
                <button className="btn btn-primary mx-1" onClick={handlelogout}>
                  Logout
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
