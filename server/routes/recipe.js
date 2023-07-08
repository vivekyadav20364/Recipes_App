const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const RecipeModel = require("../Db/newRecipe");

router.post("/addNewRecipe", async (req, res) => {
  let userId = req.body.userId;
  let recipeName = req.body.recipeName;
  let recipeIngradients = req.body.recipeIngradients;
  let recipeDescription = req.body.recipeDescription;
  let recipeNote = req.body.recipeNote;
  let recipeImageUrl = req.body.recipeImageUrl;
  let recipeImageUploadUrl = req.body.recipeImageUploadUrl;
  let recipeSaveTime = new Date().toJSON();

  const recipe = new RecipeModel({
    userId: userId,
    recipeName: recipeName,
    recipeIngradients: recipeIngradients,
    recipeDescription: recipeDescription,
    recipeNote: recipeNote,
    recipeImageUrl: recipeImageUrl,
    recipeSaveTime: recipeSaveTime,
    recipeImageUploadUrl: recipeImageUploadUrl,
  });

  try {
    let result = await recipe.save();
    res.send("Recipe Saved");
  } catch (e) {
    console.log(e);
  }
});

router.put("/updateRecipe", async (req, res) => {
  let userId = req.body.userId;
  let recipeName = req.body.recipeName;
  let recipeIngradients = req.body.recipeIngradients;
  let recipeDescription = req.body.recipeDescription;
  let recipeNote = req.body.recipeNote;
  let recipeId = req.body.recipeId;
  let recipeImageUrl = req.body.recipeImageUrl;
  let recipeImageUploadUrl = req.body.recipeImageUploadUrl;
  let recipeSaveTime = new Date().toJSON();

  RecipeModel.find({ _id: recipeId }, (err, result) => {
    if (err) res.send(err);
    result[0].recipeName = recipeName;
    result[0].recipeIngradients = recipeIngradients;
    result[0].recipeDescription = recipeDescription;
    result[0].recipeNote = recipeNote;
    result[0].recipeSaveTime = recipeSaveTime;
    result[0].recipeImageUrl = recipeImageUrl;
    result[0].recipeImageUploadUrl = recipeImageUploadUrl;
    result[0].save();
    res.send("OK");
  });
});

router.get("/allRecipe", (req, res) => {
  RecipeModel.find({}, (err, result) => {
    res.send(result);
  });
});

router.post("/recipeFind", (req, res) => {
  let recipeName = req.body.search;

  RecipeModel.find({}, (err, result) => {
    let newResult = result.filter((recipe) => {
      if (recipe.recipeName.toLowerCase().includes(recipeName.toLowerCase()))
        return recipe;
    });

    if (err) res.send(err);
    res.send(newResult);
  });
});

router.post("/recipeFindById", (req, res) => {
  let recipeId = req.body.recipeId;

  RecipeModel.find({ _id: recipeId }, (err, result) => {
    res.send(result);
  });
});

router.post("/recipeFindByUserId", (req, res) => {
  let userId = req.body.userId;

  RecipeModel.find({ userId: userId }, (err, result) => {
    res.send(result);
  });
});

router.delete("/delete/:id", (req, res) => {
  let recipeId = req.params.id;

  RecipeModel.findOneAndDelete({ _id: recipeId }, function (err, result) {
    if (err) console.log(err);
    res.send(result);
  });
});

module.exports = router;
