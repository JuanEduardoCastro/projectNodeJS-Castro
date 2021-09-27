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
        try {
            let allRecipes = await Recipe.findAll({ raw: true })
            let allIngredients = await Ingredient.findAll({ raw: true })
            let allSteps = await Step.findAll({ raw: true })
            res.render('recipes', {
                title: 'RECETARIO',
                recipesList: allRecipes,
                ingredientsList: allIngredients,
                stepsList: allSteps,
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                errorMessage: null
            })
        } catch (error) {
            res.render('recipes', {
                title: 'RECETARIO',
                recipesList: allRecipes,
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
            })
        }
    },

    getRecipesByUser: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                let userRecipes = await Recipe.findAll({ where: { UserId: req.session._id }, raw: true })
                let userRecipesIngredients = await Ingredient.findAll({ where: { UserId: req.session._id }, raw: true})
                let userRecipesSteps = await Step.findAll({ where: { UserId: req.session._id }, raw: true})
                res.render('userRecipes', {
                    title: 'MIS RECETAS',
                    recipesList: userRecipes,
                    ingredientsList: userRecipesIngredients,
                    stepsList: userRecipesSteps, 
                    userName: req.session.name,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: null
                })
            } catch (error) {
                res.render('userRecipes', {
                    title: 'MIS RECETAS',
                    recipesList: userRecipes,
                    userName: req.session.name,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
                })
            }
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
        if (req.query.edit) {
            let editRecipe = await Recipe.update({
                recipePhoto, recipeTitle, description, duration, rations
            }, { where: { id: req.query.id}}, { raw: true })
            await Ingredient.destroy({ where: { RecipeId: req.query.id}})
            if (Array.isArray(ingredients)) {
                ingredients.forEach(async (ingredient) => {
                    await Ingredient.create({ ingredient, RecipeId: req.query.id, UserId: req.session._id })
                })
            } else {
                await Ingredient.create({ ingredient: ingredients, RecipeId: req.query.id, UserId: req.session._id })
            }
            await Step.destroy({ where: { RecipeId: req.query.id}})
            if (Array.isArray(steps)) {
                steps.forEach(async (step) => {
                    await Step.create({ step, RecipeId: req.query.id, UserId: req.session._id })
                })
            } else {
                await Step.create({ step: steps, RecipeId: req.query.id, UserId: req.session._id })
            }
            res.redirect(`/receta/${req.query.id}`)
        } else {
            try {
                let newRecipe = await Recipe.create({
                    recipePhoto, recipeTitle, description, duration, rations, UserId: req.session._id
                }, { raw: true })
                if (Array.isArray(ingredients)) {
                    ingredients.forEach(async (ingredient) => {
                        await Ingredient.create({ ingredient, RecipeId: newRecipe.id, UserId: req.session._id })
                    })
                } else {
                    await Ingredient.create({ ingredient: ingredients, RecipeId: newRecipe.id, UserId: req.session._id })
                }
                if (Array.isArray(steps)) {
                    steps.forEach(async (step) => {
                        await Step.create({ step, RecipeId: newRecipe.id, UserId: req.session._id })
                    })
                } else {
                    await Step.create({ step: steps, RecipeId: newRecipe.id, UserId: req.session._id })
                }
                res.redirect(`/receta/${newRecipe.id}`)
            } catch (error) {
                res.render('newRecipe', {
                    title: 'NUEVA RECETA',
                    editRecipe: false,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: 'Hubo un problema con la base de datos. Intente mas tarde.'
                })
            }
        }
    },

    getRecipe: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                let recipeProfile = await Recipe.findOne({ where: { id: req.params.id }, raw: true })
                let ingredientsForRecipe = await Ingredient.findAll({ where: { RecipeId: recipeProfile.id }, raw: true })                
                let stepsForRecipe = await Step.findAll({ where: { RecipeId: recipeProfile.id }, raw: true })
                res.render('recipe', {
                    title: 'MI RECETA',
                    recipeProfile: recipeProfile,
                    ingredients: ingredientsForRecipe,
                    steps: stepsForRecipe, 
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
                let recipeProfile = await Recipe.findOne({ where: { id: req.params.id }, raw: true })
                let ingredientsForRecipe = await Ingredient.findAll({ where: { RecipeId: recipeProfile.id }, raw: true })                
                let stepsForRecipe = await Step.findAll({ where: { RecipeId: recipeProfile.id }, raw: true })
                res.render('recipe', {
                    title: 'MI RECETA',
                    recipeProfile: recipeProfile,
                    ingredients: ingredientsForRecipe,
                    steps: stepsForRecipe, 
                    editRecipe: true,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: null,
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
                    let recipeCheck = await Recipe.findByPk(req.params.id, { raw: true })
                    if (recipeCheck) {
                        if (recipeCheck.recipeTitle === req.body.recipeTitle) {
                            await Ingredient.destroy({ where: { RecipeId: recipeCheck.id}})
                            await Step.destroy({ where: { RecipeId: recipeCheck.id}})
                            await Recipe.destroy({ where: { id: req.params.id }})
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