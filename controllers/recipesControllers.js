const path = require('path');

const recipesControllers = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'));
    },

    newRecipe: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/newRecipe.html'));
    },

    // admin: (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'views/adminPersonal.html'));
    // },

    // newPersonal: (req, res) => {
    //     res.sendFile(path.join(__dirname, '..', 'views/newPersonal.html'));
    // }

}

module.exports = recipesControllers;