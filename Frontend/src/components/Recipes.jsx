import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";
import "../styles/recipes.css";
import { BASE_URL } from "../helper/ref.js";
import Axios from "axios";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    setLoading(true);
    Axios.get(`${BASE_URL}/recipe/allRecipe`)
      .then((response) => {
        setRecipes(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  function handleSearchSubmit(e) {
    setLoading(true);
    e.preventDefault();
    Axios.post(`${BASE_URL}/recipe/recipeFind`, {
      search: search,
    })
      .then((response) => {
        setRecipes(response.data);
        setSearchResult(response.data.length);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <div className="recipesMain">
      <div className="topSection">
        <div>Recipes 🥘</div>
        <form onSubmit={handleSearchSubmit}>
          <input
            type="search"
            placeholder="Search for a recipe"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Search" />
        </form>
        {searchResult !== null && (
          <div className="searchResult">{searchResult} Results Found</div>
        )}
      </div>
      <div className="recipesContainer">
        {loading ? (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        ) : (
          recipes &&
          recipes.map((recipe, index) => {
            return (
              <Recipe
                key={recipe._id}
                recipeName={recipe.recipeName}
                recipeIngradients={recipe.recipeIngradients}
                recipeDescription={recipe.recipeDescription}
                recipeNote={recipe.recipeNote}
                recipeImageUrl={recipe.recipeImageUrl}
                recipeImageUploadUrl={recipe.recipeImageUploadUrl}
                recipeId={recipe._id}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Recipes;
