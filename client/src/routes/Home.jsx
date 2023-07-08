import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Recipes from "../components/Recipes";

const Home = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          <Navbar active={"home"} />
          <Recipes />
        </>
      )}
    </div>
  );
};

export default Home;
