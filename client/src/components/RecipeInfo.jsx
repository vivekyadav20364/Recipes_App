import React, { useState, useEffect } from "react";
import "../styles/recipeInfo.css";
import Axios from "axios";
import RecipeUser from "./RecipeUser";
import RecipeRating from "./RecipeRating";
import RecipeReviews from "./RecipeReviews";
import { BASE_URL } from "../helper/ref.js";
import RecipeRateResponse from "./RecipeRateResponse";
import { NavLink } from "react-router-dom";
import RecipeImage from "../helper/recipe.jpg";

const RecipeInfo = (props) => {
  const {
    userId,
    recipeName,
    recipeIngradients,
    recipeDescription,
    recipeNote,
    recipeSaveTime,
    recipeId,
    recipeImageUrl,
    recipeImageUploadUrl,
  } = props;

  const [openRating, setOpenRating] = useState(false);

  // getting userId from the localStorage
  const localData = JSON.parse(localStorage.getItem("userInfoRecipe"));

  return (
    <>
      <div className="RecipeInfo">
        <div className="left">
          <div className="recipeImageContainer">
            {recipeImageUploadUrl.length !== 0 ? (
              <img src={recipeImageUploadUrl} alt={recipeName} />
            ) : (
              <img
                src={recipeImageUrl ? recipeImageUrl : RecipeImage}
                alt={recipeName}
              />
            )}
          </div>
          <RecipeUser userId={userId} recipeSaveTime={recipeSaveTime} />
          {localData && localData.userId === userId ? (
            <div className="editRecipe">
              <NavLink to={"/edit/" + recipeId} className="editButton">
                Edit
              </NavLink>
              <NavLink to={"/delete/" + recipeId} className="deleteButton">
                Delete
              </NavLink>
            </div>
          ) : (
            ""
          )}
          <RecipeRating recipeId={recipeId} />
        </div>
        <div className="right">
          <h1 style={{ color: "#5f9ea0" }}>{recipeName}</h1>
          <div className="infoWrapper">
            <div className="wrapperHeading">Ingradients</div>
            <pre className="wrapperText">{recipeIngradients}</pre>
          </div>
          <div className="infoWrapper">
            <div className="wrapperHeading">Description</div>
            <pre className="wrapperText">{recipeDescription}</pre>
          </div>
          <div className="infoWrapper">
            <div className="wrapperHeading">Note</div>
            <div className="wrapperText">{recipeNote}</div>
          </div>
          <div className="userResponseWrapper">
            {openRating ? (
              <RecipeRateResponse recipeId={recipeId} />
            ) : (
              <button
                className="openRatingButton"
                onClick={() => setOpenRating(true)}
              >
                Rate It
              </button>
            )}
          </div>
          <RecipeReviews recipeId={recipeId} />
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
