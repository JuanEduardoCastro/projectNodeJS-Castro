const joi = require('joi');

const userValidator = (req, res, next) => {
    const schema = joi.object({
        eMail: joi.string().trim().min(6).max(80).email().empty('').messages({
            'string.email': 'El correo electrónico debe ser valido',
            'string.min': 'El correo electrónico debe contener mínimo 4 letras',
            'string.max': 'El correo electrónico es muy largo...',
            'any.required': 'El correo electrónico es obligatorio'
        }),
        password: joi.string().trim().min(6).max(255).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).empty('').messages({
            'string.min': 'La contraseña debe contener mínimo 6 caracteres',
            'string.max': 'La contraseña es muy largo...',
            'any.required': 'La contraseña es obligatoria'
        }),
        firstName: joi.string().trim().min(2).max(255).required().messages({
            'string.min': 'El nombre debe contener mínimo 2 letras',
            'string.max': 'El nombre es muy largo...',
            'any.required': 'El nombre es obligatorio'
        }),
        lastName: joi.string().trim().min(2).max(255).required().messages({
            'string.min': 'El apellido debe contener mínimo 2 letras',
            'string.max': 'El apellido es muy largo...',
            'any.required': 'El apellido es obligatorio'
        }),
        photo: joi.string().trim().min(10).max(2555).required().messages({
            'string.min': 'El URL del avatar debe contener mínimo 10 letras',
            'string.max': 'El URL del avatar es muy largo...',
            'any.required': 'El URL del avatar es obligatorio'
        }),
        job: joi.string().trim().required().messages({
            'string.empty': 'El trabajo es obligatorio',
            'any.required': 'El trabajo es obligatorio'
        }),
        country: joi.string().trim().required().messages({
            'string.empty': 'El país es obligatorio',
            'any.required': 'El país es obligatorio'
        }),
    })

    const validations = schema.validate(req.body)
    if (!validations.error) {
        next()
    } else {
        if (!req.query.edit) {
            res.render('newUser', {
                title: 'REGISTRO',
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                validationsError: validations.error ? validations.error.details[0] : false
            })
        } else {
            res.render('user', {
                title: 'REGISTRO',
                userProfile: {eMail: req.session.eMail, firstName: req.body.firstName, lastName: req.body.lastName, photo: req.body.photo, job: req.body.job, country: req.body.country},
                editUser: false,
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                validationsError: validations.error ? validations.error.details[0] : false
            })
        }
    }
}

module.exports = userValidator;