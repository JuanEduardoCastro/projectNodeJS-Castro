const path = require('path');
const User = require('../models/user')

const usersControllers = {
    newUser: (req, res) => {
        res.render('newUser', {
            title: 'REGISTRO USUARIO'
        })
        // res.sendFile(path.join(__dirname, '..', 'views/newUser.html'));
    },

    sendNewUser: async (req, res) => {
        const {eMail, password, name, lastName, photo, job, country} = req.body
        let newUser = new User({
            eMail, password, name, lastName, photo, job, country
        })
        try {
            await newUser.save()
            res.redirect(`/usuario/${newUser._id}`)
        } catch (error) {
            console.log(error)
        }
    },

    getUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.params.id })
        res.render('user', {
            title: 'MI PERFIL',
            userProfile, 
            editUser: false,
        })
    },

    editUser: async (req, res) => {
        const userProfile = await User.findOne({ _id: req.params.id })
        res.render('user', {
            title: 'EDITAR USUARIO',
            userProfile, 
            editUser: userProfile,
        })
    },

    sendEditUser: async (req, res) => {
        const userProfile = await User.findOneAndUpdate({ _id: req.params.id })
        res.render('user', {
            title: 'EDITAR USUARIO',
            userProfile, 
            editUser: false,
        })
    },

    // newPersonal: (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'views/newPersonal.html'));
    // }


}

module.exports = usersControllers;