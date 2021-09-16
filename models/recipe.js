const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeTitle: {type: String, require: true},
    description: {type: String, require: true},
    duration: {type: String, require: true},
    rations: {type: String, require: true},
    ingredients: {type: Array},
    steps: {type: Array},
    cooments: {type: Array},
    date: {type: Number},
    likes: {type: Boolean}
})

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;