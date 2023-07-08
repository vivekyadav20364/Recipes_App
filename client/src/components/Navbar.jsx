import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import User from "../components/User";
import "../styles/navbar.css";
import useWindowDimensions from "./useWindowDimensions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faX } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ active }) => {
  const [navOpen, setNavOpen] = useState(false);
  const { height, width } = useWindowDimensions();

  // getting the userinfo from the localstorage
  let localData = JSON.parse(localStorage.getItem("userInfoRecipe"));

  useEffect(() => {
    if (width >= 641) {
      setNavOpen(true);
    }
  }, [width]);

  return (
    <div
      className={navOpen ? "navbar openNav" : "navbar closeNav"}
      style={
        width <= 641
          ? { transition: "all 150ms linear" }
          : { transition: "none" }
      }
    >
      <User />
      <Link
        className={active === "home" ? "navPageRoutes active" : "navPageRoutes"}
        to="/"
      >
        Home
      </Link>
      <Link
        className={
          active === "addnew" ? "navPageRoutes active" : "navPageRoutes"
        }
        to={localData ? "/addnew" : "/login"}
      >
        Add Recipes
      </Link>
      <Link
        className={
          active === "contact" ? "navPageRoutes active" : "navPageRoutes"
        }
        to="/contact"
      >
        Contact
      </Link>

      <Link
        className={
          active === "aboutme" ? "navPageRoutes active" : "navPageRoutes"
        }
        to="/aboutme"
      >
        About Me
      </Link>

      {localData ? (
        <>
          <Link className="navPageRoutes" to="/logout">
            Logout
          </Link>
        </>
      ) : (
        <>
          <Link className="navPageRoutes" to="/login">
            Login
          </Link>
          <Link className="navPageRoutes" to="/register">
            Register
          </Link>
        </>
      )}

      {width <= 641 && (
        <button
          onClick={() => setNavOpen(!navOpen)}
          className={localData ? "downToUser" : "downToGuest"}
        >
          {navOpen ? (
            <FontAwesomeIcon icon={faX} className="fa-2x icon-hover" />
          ) : (
            <FontAwesomeIcon icon={faArrowRight} className="fa-2x icon-hover" />
          )}
        </button>
      )}
    </div>
  );
};

export default Navbar;
