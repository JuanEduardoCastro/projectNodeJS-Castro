const path = require('path');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const usersControllers = {
    newUser: (req, res) => {
        res.render('newUser', {
            title: 'REGISTRO',
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
            validationsError: false
        })
    },

    sendNewUser: async (req, res) => {
        const {eMail, password, name, lastName, photo, job, country} = req.body
        let newUser
        //catchear  
        if (req.query.edit) {
            newUser = await User.findOne({ _id: req.session._id })
            newUser.name = name
            newUser.lastName = lastName
            newUser.photo = photo
            newUser.job = job
            newUser.country = country
        } else {
            let hashPassword = bcrypt.hashSync(password)
            //catchear
            newUser = new User({
                eMail, password: hashPassword, name, lastName, photo, job, country
            })
        }
        try {
            await newUser.save()
            if (req.query.edit) {
                res.redirect('/usuario')
            } else {
                res.redirect('/ingreso')
            }
        } catch (error) {
            console.log(error)
        }
    },
    //catchear
    getUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.session._id })
        res.render('user', {
            title: 'MI PERFIL',
            userProfile, 
            editUser: false,
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false        
        })
    },
    //catchear 
    editUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.session._id })
        res.render('user', {
            title: 'EDITAR PERFIL',
            userProfile, 
            editUser: true,
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false        
        })
    },

    deleteUser: async (req, res) => {
        const {eMail, password} = req.body
        if (eMail && password) {
            try {
                if (req.body.eMail && req.body.password) {
                    let userConfirm = await User.findOne({ eMail })
                    let hashPassword = bcrypt.compareSync(password, userConfirm.password)  
                    if (hashPassword) {
                        await User.findOneAndDelete({ _id: req.session._id, })
                        req.session.destroy(() => {
                            res.redirect('/')
                        })
                    } else {
                        throw new Error()
                    }
                } else {
                    throw new Error()
                }
            } catch (error) {
                res.render('deleteConfirm', {
                    title: 'ELIMINAR USUARIO',
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: 'Correo electrónico o conaseña invalida',
                })
            }
        } else {
            res.render('deleteConfirm', {
                title: 'ELIMINAR USUARIO',
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false            
            })
        }
    },

    logIn: (req, res) => {
        res.render('userLogin', {
            title: 'INGRESO',
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
            errorMessage: false,
        })
    },

    sendLogIn: async (req, res) => {
        const {eMail, password} = req.body
        try {
            let userLogIn = await User.findOne({ eMail })
            let hashPassword = bcrypt.compareSync(password, userLogIn.password)
            if (hashPassword) {
                req.session.userLogIn = true
                req.session.name = userLogIn.name
                req.session._id = userLogIn._id
                return res.redirect('/usuario')
            } else {
                throw new Error()
            }
        } catch (error) {
            res.render('userLogin', {
                title: 'INGRESO',
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                errorMessage: 'Correo electrónico o conaseña invalida',
            })
        }
    },

    logOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    },


}

module.exports = usersControllers;