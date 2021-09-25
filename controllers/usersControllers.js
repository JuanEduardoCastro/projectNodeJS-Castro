const User = require('../models/User');
const bcrypt = require('bcryptjs');

const usersControllers = {
    newUser: (req, res) => {
        res.render('newUser', {
            title: 'REGISTRO',
            userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
            validationsError: false
        })
    },

    sendNewUser: async (req, res) => {
        const {eMail, password, firstName, lastName, photo, job, country} = req.body
        if (req.query.edit) {
            try {
                await User.update({
                    firstName, lastName, photo, job, country, 
                }, { where: { eMail: req.session.eMail }})
                res.redirect('/usuario')
            } catch (err) {
                res.render('newUser', {
                    title: 'REGISTRO',
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: {message: 'Hubo un problema con la base de datos. Intentetelo mas tarde.'},
                })
            }
        } else {
            let hashPassword = bcrypt.hashSync(password)
            try {
                let userCheck = await User.findOne({ where: { eMail: eMail}, raw: true })
                if (!userCheck) {
                    newUser = await User.create({
                        eMail, password: hashPassword, firstName, lastName, photo, job, country
                    })
                    res.redirect('/ingreso') // ver la forma de redigir a login
                } else {
                    throw new Error()
                }
                res.render('newUser', {
                    title: 'REGISTRO',
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: false,
                })
            } catch (err) {
                res.render('newUser', {
                    title: 'REGISTRO',
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: {message: 'El correo electrónico ya está registrado.'},
                })
            }
        }
    },

    getUser: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                const userProfile = await User.findOne({ where: { id: req.session._id}, raw: true }) 
                if (userProfile) {
                    res.render('user', {
                        title: 'MI PERFIL',
                        userProfile, 
                        editUser: false,
                        userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                        validationsError: false   
                    })
                } else {
                    throw new Error()
                }
            } catch (error) {
                req.session.destroy(() => {
                    res.redirect('/')
                })
            }
        } else {
            res.redirect('/')
        } 
    },

    editUser: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                const userProfile = await User.findOne({ where: { id: req.session._id}, raw: true })
                console.log("usuario que viene de db", userProfile)
                if (userProfile) {
                    res.render('user', {
                        title: 'EDITAR PERFIL',
                        userProfile, 
                        editUser: true,
                        userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                        validationsError: false     
                    })
                } else {
                    throw new Error()
                }
            } catch (error) {
                res.render('user', {
                    title: 'EDITAR PERFIL',
                    userProfile, 
                    editUser: true,
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    validationsError: {message: 'Hubo un problema con la base de datos. Intentetelo mas tarde.'}
                })
            }
        } else {
            res.redirect('/')
        }
    },

    deleteUser: async (req, res) => {
        if (req.session.userLogIn) {
            const {eMail, password} = req.body
            if (eMail && password) {
                console.log("entro delete con email password")
                try {
                    if (req.body.eMail && req.body.password) {
                        let userConfirm = await User.findOne({ where: { eMail: eMail }, raw: true })
                        let hashPassword = bcrypt.compareSync(password, userConfirm.password)  
                        if (hashPassword) {
                            await User.destroy({ where: { eMail: eMail }, raw: true })
                            req.session.destroy(() => {
                                res.redirect('/')
                                //mandar a deleteOk
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
                console.log("entro delete sin mail")
                res.render('deleteConfirm', {
                    title: 'ELIMINAR USUARIO',
                    userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                    errorMessage: false           
                })
            }
        } else {
            res.redirect('/')
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
            let userLogIn = await User.findOne({ where: { eMail: eMail}, raw: true })
            let hashPassword = bcrypt.compareSync(password, userLogIn.password)           
            if (hashPassword) {
                req.session.userLogIn = true
                req.session.firstName = userLogIn.firstName
                req.session.eMail = userLogIn.eMail
                req.session._id = userLogIn.id
                req.session.photo = userLogIn.photo
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