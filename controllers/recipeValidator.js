const joi = require('joi');

const RecipeValidator = (req, res, next) => {

    const schema = joi.object({
        recipePhoto: joi.string().trim().min(10).max(2555).required().messages({
            'string.min': 'El URL de la foto debe contener mínimo 10 letras',
            'string.max': 'El URL de la foto es muy largo...',
            'any.required': 'El URL de la foto es obligatorio',
        }),
        recipeTitle: joi.string().trim().min(2).max(255).required().messages({
            'string.min': 'El nombre de la receta debe contener mínimo 2 letras',
            'string.max': 'El nombre de la receta es muy largo...',
            'any.required': 'El nombre de la receta es obligatorio',
        }),
        description: joi.string().trim().min(2).max(255).required().messages({
            'string.min': 'La descripción debe contener mínimo 2 letras',
            'string.max': 'La descripción es muy larga...',
            'any.required': 'La descripción es obligatoria',
        }),
        duration: joi.string().trim().min(2).max(255).required().messages({
            'string.min': 'La duración debe contener mínimo 2 letras',
            'string.max': 'La duración es muy larga...',
            'any.required': 'La duración es obligatoria',
        }),
        rations: joi.string().trim().min(2).max(255).required().messages({
            'string.min': 'La ración debe contener mínimo 2 letras',
            'string.max': 'La ración es muy larga...',
            'any.required': 'La ración es obligatoria',
        }),
        ingredients: joi.string().trim().min(2).max(255).messages({
            'string.min': 'El ingrediente debe contener mínimo 2 letras',
            'string.max': 'El ingrediente es muy larga...',
        }),
        steps: joi.string().trim().min(2).max(255).messages({
            'string.min': 'El procedimiento debe contener mínimo 2 letras',
            'string.max': 'El procedimiento es muy largo...',
        }),
    })

    const validations = schema.validate(req.body)
    if (!validations.error) {
        next()
    } else {
        if (!req.query.edit) {
            res.render('newRecipe', {
                title: 'NUEVA RECETA',
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                validationsError: validations.error ? validations.error.details[0] : false,
                errorMessage: null
            })
        } else {
            res.render('recipe', {
                title: 'MI RECETA',
                recipeProfile: {recipePhoto: req.body.recipePhoto, recipeTitle: req.body.recipeTitle, description: req.body.description, duration: req.body.duration, rations: req.body.rations, ingredients: req.body.ingredients, steps: req.body.steps},
                editRecipe: false,
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                validationsError: validations.error ? validations.error.details[0] : false,
                errorMessage: null
            })
        }
    }
}

module.exports = RecipeValidator;