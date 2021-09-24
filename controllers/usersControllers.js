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
        console.log(req.body)
        const {eMail, password, firstName, lastName, photo, job, country} = req.body
        let newUser 
        let hashPassword = bcrypt.hashSync(password)
        try {
            let userCheck = await User.findAll({ where: { eMail: eMail}, raw: true })
            if (userCheck.length == 0) {
                newUser = await User.create({
                eMail, password: hashPassword, firstName, lastName, photo, job, country
                })
            } else {
                throw new Error()
            }
            res.render('newUser', {
                title: 'REGISTRO',
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                validationsError: null,
            })
        } catch (err) {
            res.render('newUser', {
                title: 'REGISTRO',
                userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
                validationsError: {message: 'El correo electrónico ya está registrado.'},
            })
        }
        // if (req.query.edit) {
        //     newUser = await User.findOne({ _id: req.session._id })
        //     newUser.name = name
        //     newUser.lastName = lastName
        //     newUser.photo = photo
        //     newUser.job = job
        //     newUser.country = country
        // } else {
        //     let hashPassword = bcrypt.hashSync(password)
        //     newUser = new User({
        //         eMail, password: hashPassword, name, lastName, photo, job, country
        //     })
        //     try {
        //         let userCheck = await User.findOne({ eMail: eMail })
        //         if (userCheck) {
        //             throw new Error()
        //         }
        //     } catch (error) {
        //         res.render('newUser', {
        //             title: 'REGISTRO',
        //             userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
        //             validationsError: {message: 'El correo electrónico ya está registrado.'},
        //         })
        //         return error
        //     }
        // }
        // try {
        //     await newUser.save()
        //     if (req.query.edit) {
        //         res.redirect('/usuario')
        //     } else {
        //         res.redirect('/ingreso')
        //     }
        // } catch (error) {
        //     res.render('newUser', {
        //         title: 'REGISTRO',
        //         userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
        //         validationsError: {message: 'Hubo un problema con la base de datos. Intentetelo mas tarde.'},
        //     })
        // }
    },

    getUser: async (req, res) => {
        // try {
        //     const userProfile = await User.findByPk(req.)
        // }
        // if (req.session.userLogIn) {
        //     try {
        //         const userProfile = await User.findOne({ _id: req.session._id })
        //         if (userProfile) {
        //             res.render('user', {
        //                 title: 'MI PERFIL',
        //                 userProfile, 
        //                 editUser: false,
        //                 userLogIn: req.session.userLogIn ? req.session.userLogIn : false,
        //                 validationsError: false        
        //             })
        //         } else {
        //             throw new Error()
        //         }
        //     } catch (error) {
        //         req.session.destroy(() => {
        //             res.redirect('/')
        //         })
        //     }
        // } else {
        //     res.redirect('/')
        // } 
    },

    editUser: async (req, res) => {
        if (req.session.userLogIn) {
            try {
                const userProfile = await User.findOne({ _id: req.session._id })
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
                try {
                    if (req.body.eMail && req.body.password) {
                        let userConfirm = await User.findOne({ eMail })
                        let hashPassword = bcrypt.compareSync(password, userConfirm.password)  
                        if (hashPassword) {
                            await User.findOneAndDelete({ _id: req.session._id, })
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
            let userLogIn = await User.findOne({ eMail })
            let hashPassword = bcrypt.compareSync(password, userLogIn.password)
            if (hashPassword) {
                req.session.userLogIn = true
                req.session.name = userLogIn.name
                req.session.eMail = userLogIn.eMail
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