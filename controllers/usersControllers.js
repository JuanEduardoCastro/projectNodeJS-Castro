const path = require('path');
const User = require('../models/user')

const usersControllers = {
    newUser: (req, res) => {
        res.render('newUser', {
            title: 'REGISTRO USUARIO'
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
        })
    },

    editUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.session._id })
        res.render('user', {
            title: 'EDITAR USUARIO',
            userProfile, 
            editUser: true,
        })
    },

    // sendEditUser: async (req, res) => {
    //     const userProfile = await User.findOneAndUpdate({ _id: req.session._id, ...req.body })
    //     res.render('user', {
    //         title: 'EDITAR USUARIO',
    //         userProfile, 
    //         editUser: false,
    //     })
    // },

    logIn: (req, res) => {
        res.render('userLogin', {
            title: 'INGRESO'
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


}

module.exports = usersControllers;