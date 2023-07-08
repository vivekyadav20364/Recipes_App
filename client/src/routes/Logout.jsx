import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function Logout() {
  const navigate = useNavigate();
  // const location = useLocation();
  // console.log(location);
  useEffect(() => {
    // if (window.confirm("Are you sure want to logout?") === true) {
    //   navigate("/login");
    // } else {
    localStorage.setItem("userInfoRecipe", null);
    navigate("/");
    // }
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
}

export default Logout;
