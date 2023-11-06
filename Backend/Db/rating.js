const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  recipeRating: {
    type: Array,
    required: true,
  },
  recipeId: {
    type: String,
    required: true,
  },
});

const Rating = mongoose.model("ratings", RecipeSchema);
module.exports = Rating;
