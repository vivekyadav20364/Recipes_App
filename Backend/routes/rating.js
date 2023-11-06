const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const RatingModel = require("../Db/rating");

router.post("/getRating", (req, res) => {
  let recipeId = req.body.recipeId;
  RatingModel.find({ recipeId: recipeId }, (err, result) => {
    res.send(result);
  });
});

router.post("/setRating", async (req, res) => {
  let recipeId = req.body.recipeId;
  let recipeRating = req.body.recipeRating;
  let userName = req.body.userName;

  RatingModel.find({ recipeId: recipeId }, async (err, result) => {
    if (result.length === 0) {
      let rating = new RatingModel({
        recipeId: recipeId,
        recipeRating: [
          {
            userName: userName,
            rating: recipeRating,
            review: "",
          },
        ],
      });

      try {
        await rating.save();
        res.send("OK");
      } catch (e) {
        console.log(e);
      }
    } else {
      let alreadyRatedUser = [];
      let alreadyRatedUserIndex = -1;
      for (let i = 0; i < result[0].recipeRating.length; i++) {
        if (result[0].recipeRating[i].userName === userName) {
          alreadyRatedUser = result[0].recipeRating[i];
          alreadyRatedUserIndex = i;
        }
      }
      if (alreadyRatedUserIndex !== -1) {
        result[0].recipeRating[alreadyRatedUserIndex] = {
          userName: alreadyRatedUser.userName,
          rating: recipeRating,
          review: "",
          reviewTimeStamp: new Date(),
        };
        result[0].save();
        res.send("updated already");
      } else {
        result[0].recipeRating.push({
          userName: userName,
          rating: recipeRating,
          review: "",
          reviewTimeStamp: new Date(),
        });
        result[0].save();
        res.send("updated new");
      }
    }
  });
});

router.post("/saveReview", (req, res) => {
  let recipeId = req.body.recipeId;
  let userName = req.body.userName;
  let review = req.body.review;

  RatingModel.find({ recipeId: recipeId }, (err, result) => {
    let indexOfReview = -1;
    let reviewObject = [];
    for (let i = 0; i < result[0].recipeRating.length; i++) {
      if (result[0].recipeRating[i].userName === userName) {
        reviewObject = result[0].recipeRating[i];
        indexOfReview = i;
        break;
      }
    }

    result[0].recipeRating[indexOfReview] = {
      userName: reviewObject.userName,
      rating: reviewObject.rating,
      review: review,
      reviewTimeStamp: new Date(),
    };
    result[0].save();
    res.send("OK");
  });
});

router.post("/fetchReviews", (req, res) => {
  let recipeId = req.body.recipeId;
  RatingModel.find({ recipeId: recipeId }, (err, result) => {
    res.send(result);
  });
});

module.exports = router;
