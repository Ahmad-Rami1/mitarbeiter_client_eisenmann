import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../apiCalls";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <nav className="navbar navbar-expand-xl navbar-light " id="navBrand">
      <a className="navbar-brand">
        <img src="./assets/nesaLogo.png" className="logo" />
      </a>
      <button
        className="navbar-toggler collapsed"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse max-height"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav ml-auto">
          <li
            className={props.page === "home" ? "nav-item active" : "nav-item"}
          >
            <Link className="nav-link" to="/">
              Schicht eintragen
            </Link>
          </li>

          <li
            className={
              props.page === "uebersicht" ? "nav-item active" : "nav-item"
            }
          >
            <Link className="nav-link" to="/uebersicht">
              Übersicht
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              style={{ cursor: "pointer" }}
              onClick={() => logout(dispatch)}
            >
              Ausloggen
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
