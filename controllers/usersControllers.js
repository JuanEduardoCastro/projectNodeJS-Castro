const path = require('path');

const usersControllers = {
    newUser: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/newUser.html'));
    },

    // personal: (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'views/personal.html'));
    // },

    // admin: (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'views/adminPersonal.html'));
    // },

    // newPersonal: (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'views/newPersonal.html'));
    // }


}

module.exports = usersControllers;