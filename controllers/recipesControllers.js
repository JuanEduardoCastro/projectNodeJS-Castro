const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');
const Step = require('../models/Step');

const recipesControllers = {
    home: (req, res) => {
        res.render('index', {
            title: 'HOME',
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false
        })
    },

    getAllRecipes: async (req, res) => {
        // try {
        //     let allRecipes = await Recipe.find()
        //     res.render('recipes', {
        //         title: 'RECETARIO',
        //         recipesList: allRecipes,
        //         userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
        //         errorMessage: null
        //     })
        // } catch (error) {
        //     res.render('recipes', {
        //         title: 'RECETARIO',
        //         recipesList: allRecipes,
        //         userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
        //         errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
                
        //     })
        // }
    },

    getRecipesByUser: async (req, res) => {
        if (req.session.userLogIn) {
            // try {
            //     let userRecipes = await Recipe.find({ userId: req.session._id })
            //     res.render('userRecipes', {
            //         title: 'MIS RECETAS',
            //         recipesList: userRecipes,
            //         userName: req.session.name,
            //         userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
            //         errorMessage: null
            //     })
            // } catch (error) {
            //     res.render('userRecipes', {
            //         title: 'MIS RECETAS',
            //         recipesList: userRecipes,
            //         userName: req.session.name,
            //         userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
            //         errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
            //     })
            // }
        } else {
            res.redirect('/')
        }
    },

    newRecipe: (req, res) => {
        if (req.session.userLogIn) {
            res.render('newRecipe', {
                title: 'NUEVA RECETA',
                editRecipe: false,
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                errorMessage: null
            })
        } else (
            res.redirect('/')
        )
    },

    sendNewRecipe: async (req, res) => {
        const {recipePhoto, recipeTitle, description, duration, rations, ingredients, steps} = req.body
        // let newRecipe
        if (req.query.edit) {
        //     newRecipe = await Recipe.findOne({ _id: req.query.id })
        //     newRecipe.recipePhoto = recipePhoto
        //     newRecipe.recipeTitle = recipeTitle
        //     newRecipe.description = description
        //     newRecipe.duration = duration
        //     newRecipe.rations = rations
        //     newRecipe.ingredients = ingredients
        //     newRecipe.steps = steps
        } else {
            try {
                let newRecipe = await Recipe.create({
                    recipePhoto, recipeTitle, description, duration, rations, UserId: req.session._id
                })
                if (Array.isArray(ingredients)) {
                    ingredients.forEach(async (ingredient) => {
                        await Ingredient.create({ ingredient, RecipeId: newRecipe.dataValues.id })
                    })
                } else {
                    await Ingredient.create({ ingredient: ingredients, RecipeId: newRecipe.dataValues.id })
                }
                if (Array.isArray(steps)) {
                    steps.forEach(async (step) => {
                        await Step.create({ step, RecipeId: newRecipe.dataValues.id })
                    })
                } else {
                    await Step.create({ step: steps, RecipeId: newRecipe.dataValues.id })
                }
                
            } catch (error) {
                console.log(error)
            }
        //     newRecipe = new Recipe({ recipePhoto, recipeTitle, description, duration, rations, ingredients, steps, userId: req.session._id })
        }
        // try {
        //     await newRecipe.save()
        //     res.redirect(`/receta/${newRecipe._id}`)
        // } catch (error) {
        //     res.render('newRecipe', {
        //         title: 'NUEVA RECETA',
        //         editRecipe: false,
        //         userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
        //         errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
        //     })
        // }
    },

    getRecipe: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                 recipeProfile = await Recipe.findOne({ _id: req.params.id })
                res.render('recipe', {
                    title: 'MI RECETA',
                    recipeProfile: recipeProfile, 
                    editRecipe: false,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: null,
                    errorMessage: null
                })
            } catch (error) {
                res.render('recipe', {
                    title: 'MI RECETA',
                    editRecipe: false,
                    recipeProfile,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: null,
                    errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
                })
            }
        } else {
            res.redirect('/')
        }
    },

    editRecipe: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                const recipeProfile = await Recipe.findOne({ _id: req.params.id })
                res.render('recipe', {
                    title: 'EDITAR RECETA',
                    recipeProfile,
                    editRecipe: true,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: null
                })  
            } catch (error) {
                res.render('recipe', {
                    title: 'EDITAR RECETA',
                    recipeProfile, 
                    editRecipe: false,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
                })
            }
        } else {
            res.redirect('/')
        }
    },

    deleteRecipe: async (req, res) => {
        if (req.session.userLogIn) {
            if (req.body.recipeTitle) {
                try {
                    if (req.body.recipeTitle) {
                        let recipeCheck = await Recipe.findOne({ recipeTitle: req.body.recipeTitle })
                        if (recipeCheck) {
                            await Recipe.findOneAndDelete({ _id: req.params.id })
                            res.render('deleteOk', {
                                title: 'RECETA ELIMINADA',
                                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                                errorMessage: null
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
                    errorMessage: null           
                })
            }
        } else {
            res.redirect('/')
        }
    }

}

module.exports = recipesControllers;