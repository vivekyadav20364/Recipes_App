import React, { useEffect, useState } from "react";
import Axios, { all } from "axios";
import "../styles/recipeReviews.css";
import { BASE_URL } from "../helper/ref.js";
import moment from "moment";

const RecipeReviews = ({ recipeId }) => {
  const [showReview, setShowReview] = useState(false);
  const [allReviews, setAllReviews] = useState([]);

  async function fetchReviewsFromDB() {
    setShowReview(!showReview);
    Axios.post(`${BASE_URL}/rating/fetchReviews`, {
      recipeId: recipeId,
    })
      .then((response) => {
        if (response.data.length) {
          // array of all reviews
          setAllReviews(response.data[0].recipeRating);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchReviewsFromDB();
  }, []);

  return (
    <>
      <div className="reviewCount">
        <button onClick={fetchReviewsFromDB}>
          {showReview ? "Show" : "Hide"} Reviews
        </button>
      </div>
      {!showReview &&
        allReviews.map((reviewObj, index) => {
          return reviewObj.review.length ? (
            <div key={index} className="singleReviewContainer">
              <div className="reviewUserName">
                <div className="userName">{reviewObj.userName}</div>
                <div className="reviewTime">
                  • {moment(reviewObj.reviewTimeStamp).fromNow()}
                </div>
              </div>
              <div className="reviewDescription">{reviewObj.review}</div>
            </div>
          ) : (
            ""
          );
        })}
    </>
  );
};

export default RecipeReviews;
