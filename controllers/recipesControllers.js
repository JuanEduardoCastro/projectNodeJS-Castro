const path = require('path');
const Recipe = require('../models/recipe')

const recipesControllers = {
    home: (req, res) => {
        res.render('index', {
            title: 'HOME',
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false
        })
    },

    getAllRecipes: async (req, res) => {
        let allRecipes = await Recipe.find()
        res.render('recipes', {
            title: 'RECETAS',
            recipesList: allRecipes,
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false
        })
    },

    newRecipe: (req, res) => {
        res.render('newRecipe', {
            title: 'NUEVA RECETA',
            editRecipe: false,
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false
        })
    },

    sendNewRecipe: async (req, res) => {
        console.log(req.body)
        const {recipePhoto, recipeTitle, description, duration, rations, ingredients, steps} = req.body

        let newRecipe
        
        if (req.query.edit === "true") {
            newRecipe = await Recipe.findOne({ _id: req.query.id })
            newRecipe.recipePhoto = recipePhoto
            newRecipe.recipeTitle = recipeTitle
            newRecipe.description = description
            newRecipe.duration = duration
            newRecipe.rations = rations
            newRecipe.ingredients = ingredients
            newRecipe.steps = steps
        } else {
            newRecipe = new Recipe({ recipePhoto, recipeTitle, description, duration, rations, ingredients, steps })
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
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false
        })
    },

    editRecipe: async (req, res) => {
        const recipeProfile = await Recipe.findOne({ _id: req.params.id })
        res.render('recipe', {
            title: 'EDITAR RECETA',
            recipeProfile, 
            editRecipe: true,
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false
        })  
    },

    deleteRecipe: async (req, res) => {
        console.log(req.body)
        console.log(req.params.id)
        // const {recipeTitle} = req.body
        if (req.body.recipeTitle) {
            try {
                if (req.body.recipeTitle) {
                    let recipeCheck = await Recipe.findOne({ recipeTitle: req.body.recipeTitle })
                    if (recipeCheck) {
                        await Recipe.findOneAndDelete({ _id: req.params.id })
                        res.render('deleteOk', {
                            title: 'RECETA ELIMINADA',
                            userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                            errorMessage: false
                        })
                    } else {
                        throw new Error()
                    }
                } else {
                    throw new Error()
                }
            } catch (error) {
                res.render('deleteRecipeConfirm', {
                    title: 'ELIMINAR RECETA',
                    recipeProfile: {_id: req.params.id},
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: 'El titulo no es correcto',
                })
            }
        } else {
            res.render('deleteRecipeConfirm', {
                title: 'ELIMINAR RECETA',
                recipeProfile: {_id: req.params.id},
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                errorMessage: false           
            })
        }
    }

}

module.exports = recipesControllers;