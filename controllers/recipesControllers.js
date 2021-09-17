const path = require('path');
const Recipe = require('../models/recipe')

const recipesControllers = {
    home: (req, res) => {
        res.render('index', {
            title: 'HOME'
        })
    },

    getAllRecipes: async (req, res) => {
        let allRecipes = await Recipe.find()
        res.render('recipes', {
            title: 'RECETAS',
            recipesList: allRecipes,
        })
    },

    newRecipe: (req, res) => {
        res.render('newRecipe', {
            title: 'NUEVA RECETA',
            editRecipe: false,
        })
    },

    sendNewRecipe: async (req, res) => {
        const {recipePhoto, recipeTitle, description, duration, rations, ingredientsNumber, ingredientsUnit, ingredientsName, steps, comments, likes} = req.body

        let newRecipe
        
        if (req.query.edit === "true") {
            newRecipe = await Recipe.findOne({ _id: req.query.id })
            newRecipe.recipePhoto = recipePhoto
            newRecipe.recipeTitle = recipeTitle
            newRecipe.description = description
            newRecipe.duration = duration
            newRecipe.rations = rations
            newRecipe.ingredientsNumber = ingredientsNumber
            newRecipe.ingredientsUnit = ingredientsUnit
            newRecipe.ingredientsName = ingredientsName
            newRecipe.steps = steps
            newRecipe.comments = comments
            newRecipe.likes = likes
            newRecipe.date = Date()
        } else {
            newRecipe = new Recipe({
                recipePhoto, recipeTitle, description, duration, rations, ingredients: {ingredientsNumber, ingredientsUnit, ingredientsName}, steps, comments, likes, date: Date(),
            })
        }
        try {
            await newRecipe.save()
            res.redirect(`/receta/${newRecipe._id}`)
        } catch (error) {
            console.log(error)
        }
    },

    getRecipe: async (req, res) => {
        const recipeProfile = await Recipe.findOne({ _id: req.params.id })
        res.render('recipe', {
            title: 'MI RECETA',
            recipeProfile, 
            editRecipe: false,
        })
    },

    editRecipe: async (req, res) => {
        const recipeProfile = await Recipe.findOne({ _id: req.params.id })
        res.render('recipe', {
            title: 'EDITAR RECETA',
            recipeProfile, 
            editRecipe: true,
        })
        
    },

    // sendEditRecipe: async (req, res) => {
    //     const recipeProfile = await Recipe.findOneAndUpdate({ _id: req.params.id, ...req.body })
    //     res.render('recipe', {
    //         title: 'EDITAR RECETA',
    //         recipeProfile, 
    //         editRecipe: false,
    //     })
    // },

}

module.exports = recipesControllers;