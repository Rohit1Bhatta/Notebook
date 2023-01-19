import React from "react";
//  import styled from 'styled-components';
//  import PropTypes from 'prop-types';
import {  useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// #region constants

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const NavBar = () => {
  let location = useLocation();
 let navigate= useNavigate();
  const handleOnClick=()=>
  {
    localStorage.removeItem("token");
    navigate("/login") ;
  }

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#eec8a8" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="1.png"
            alt="Logo"
            width="30"
            height="25"
            className="d-inline-block align-text-top"
          />
          1NoTeBoOk
        </Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {localStorage.getItem("token") && (
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/ " ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/about"
                >
                  About Us
                </Link>
              </li>
            </ul>
          )}
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn btn mx-1"
                style={{ backgroundColor: "#ff8442", color: "#fff" }}
                to="/login"
                role="button"
              >
                Login
              </Link>
              <Link
                className="btn btn mx-1"
                style={{ backgroundColor: "#ff8442", color: "#fff" }}
                to="/signup"
                role="button"
              >
                SignUp
              </Link>
            </form>
          ) : (
            <button
              type="button"
              className="btn btn"
              style={{ backgroundColor: "#ff8442", color: "#fff" }}
              onClick={handleOnClick}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

NavBar.propTypes = propTypes;
NavBar.defaultProps = defaultProps;
// #endregion

export default NavBar;
