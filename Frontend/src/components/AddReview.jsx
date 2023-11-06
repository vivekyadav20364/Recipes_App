import React, { useState } from "react";
import Axios from "axios";
import { BASE_URL } from "../helper/ref.js";
import "../styles/addReviews.css";

const AddReview = ({ recipeId, userName }) => {
  const [review, setReview] = useState("");
  const [recipeReviewed, setRecipeReviewd] = useState(false);
  function handleReviewSubmit(e) {
    e.preventDefault();
    if (review.length) {
      Axios.post(`${BASE_URL}/rating/saveReview`, {
        recipeId: recipeId,
        userName: userName,
        review: review,
      })
        .then((response) => {
          setRecipeReviewd(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setRecipeReviewd(true);
    }
  }
  return (
    <>
      {recipeReviewed ? (
        <div className="thankMessage">Thanks for Review 🤗</div>
      ) : (
        <form onSubmit={handleReviewSubmit} className="addReviewForm">
          <div>Add Review (Optional)</div>
          <textarea
            placeholder="Please add your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          ></textarea>
          <input type="submit" value="Save" />
        </form>
      )}
    </>
  );
};

export default AddReview;
