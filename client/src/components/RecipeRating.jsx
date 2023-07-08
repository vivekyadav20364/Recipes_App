import React, { useState, useEffect } from "react";
import StarRatings from "react-star-ratings";
import { BASE_URL } from "../helper/ref.js";
import Axios from "axios";

import "../styles/recipeRating.css";

const RecipeRating = ({ recipeId }) => {
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    Axios.post(`${BASE_URL}/rating/getRating`, {
      recipeId: recipeId,
    })
      .then((response) => {
        let allRatings = 0;
        let numberOfRatings = 0;
        if (response.data.length) {
          numberOfRatings = response.data[0].recipeRating.length;
          setRatingCount(numberOfRatings);
        }
        if (numberOfRatings) {
          response.data[0].recipeRating.map((x) => (allRatings += x.rating));
        }

        setRating(
          Number(
            (allRatings / (numberOfRatings ? numberOfRatings : 1)).toFixed(2)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [recipeId]);

  return (
    <div className="RecipeRating">
      <StarRatings
        rating={rating}
        starRatedColor="yellow"
        numberOfStars={5}
        starDimension="25px"
        starSpacing="5px"
        name="rating"
      />
      <div className="ratingCount">
        ({ratingCount} • {rating}/5)
      </div>
    </div>
  );
};

export default RecipeRating;
