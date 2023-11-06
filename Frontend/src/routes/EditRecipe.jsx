import React, { useEffect, useState } from "react";
import NewRecipe from "../components/NewRecipe";
import Navbar from "../components/Navbar";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../helper/ref";
import Axios from "axios";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Axios.post(`${BASE_URL}/recipe/recipeFindById`, {
      recipeId: recipeId,
    })
      .then((response) => {
        setRecipeData(response.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      {loading ? (
        <div className="loader-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <NewRecipe data={recipeData} />
      )}
    </>
  );
};

export default EditRecipe;
