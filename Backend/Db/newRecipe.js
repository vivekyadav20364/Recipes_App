const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  recipeName: {
    type: String,
    required: true,
  },
  recipeIngradients: {
    type: String,
    required: true,
  },
  recipeDescription: {
    type: String,
    required: false,
  },
  recipeNote: {
    type: String,
    required: false,
  },
  recipeSaveTime: {
    type: String,
    required: true,
  },
  recipeImageUrl: {
    type: String,
    required: false,
  },
  recipeImageUploadUrl: {
    type: String,
    required: false,
  },
});

const Recipe = mongoose.model("recipes", RecipeSchema);
module.exports = Recipe;
