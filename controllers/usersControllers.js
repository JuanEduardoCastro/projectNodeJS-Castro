const path = require('path');
const User = require('../models/user')

const usersControllers = {
    newUser: (req, res) => {
        res.render('newUser', {
            title: 'REGISTRO',
            userLogIn: req.session.userLogIn,
        })
    },

    sendNewUser: async (req, res) => {
        const {eMail, password, name, lastName, photo, job, country} = req.body
        
        let newUser

        if (req.query.edit) {
            newUser = await User.findOne({ _id: req.session._id })
            newUser.password = password
            newUser.name = name
            newUser.photo = photo
            newUser.job = job
            newUser.country = country
        } else {
            newUser = new User({
                eMail, password, name, lastName, photo, job, country
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

    getUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.session._id })
        res.render('user', {
            title: 'MI PERFIL',
            userProfile, 
            editUser: false,
            userLogIn: req.session.userLogIn,
        })
    },

    editUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.session._id })
        res.render('user', {
            title: 'EDITAR USUARIO',
            userProfile, 
            editUser: true,
            userLogIn: req.session.userLogIn,
        })
    },

    deleteUser: async (req, res) => {
        console.log(req.body)
        if (req.body) {
            await User.findOneAndDelete({ _id: req.session._id })
            res.redirect('/')
        } else {
            res.render('deleteConfirm', {
                title: 'ELIMINAR USUARIO',
                userLogIn: req.session.userLogIn,
            })
        }
    },

    logIn: (req, res) => {
        res.render('userLogin', {
            title: 'INGRESO',
            userLogIn: req.session.userLogIn,
        })
    },

    sendLogIn: async (req, res) => {
        const {eMail, password} = req.body
        let userLogIn = await User.findOne({ eMail })
        if (userLogIn.password === password) {
            req.session.userLogIn = true
            req.session.name = userLogIn.name
            req.session._id = userLogIn._id
            return res.redirect('/usuario')
        }
        res.render('/ingreso')
    },

    logOut: (req, res) => {
        req.session.destroy(() => {
            res.redirect('/')
        })
    },


}

module.exports = usersControllers;