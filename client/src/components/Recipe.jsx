import React, { useState, useEffect } from "react";
import "../styles/recipe.css";
import "../styles/recipeUser.css";
import { NavLink } from "react-router-dom";

import RecipeImage from "../helper/recipe.jpg";

const Recipe = (props) => {
  const {
    recipeName,
    recipeDescription,
    recipeId,
    recipeImageUrl,
    recipeImageUploadUrl,
  } = props;

  console.log("😛: ", recipeImageUploadUrl);

  return (
    <div className="recipeContainer">
      <NavLink to={"/aboutrecipe/" + recipeId}>
        <div className="recipe">
          <div className="imgContainer">
            {recipeImageUploadUrl.length !== 0 ? (
              <img src={recipeImageUploadUrl} alt={recipeName} />
            ) : (
              <img
                src={recipeImageUrl ? recipeImageUrl : RecipeImage}
                alt={recipeName}
              />
            )}
          </div>
          <div className="contentContainer">
            <div className="recipeName">{recipeName}</div>
            <p>
              {recipeDescription.length >= 140
                ? recipeDescription.slice(0, 140) + "..."
                : recipeDescription.padEnd(140, "  ")}
            </p>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default Recipe;
