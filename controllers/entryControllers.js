const path = require('path');

const entryControllers = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'));
    },

    personal: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/personal.html'));
    },

    admin: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/adminPersonal.html'));
    },

    newPersonal: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/newPersonal.html'));
    }

}

module.exports = entryControllers