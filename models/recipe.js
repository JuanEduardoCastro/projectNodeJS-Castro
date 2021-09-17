const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipePhoto: {type: String, require: true},
    recipeTitle: {type: String, require: true},
    description: {type: String, require: true},
    duration: {type: String, require: true},
    rations: {type: String, require: true},
    ingredients: {type: Array, require: true},
    steps: {type: Array},
    comments: {type: Array},
    date: {type: String},
    likes: {type: Boolean}
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;