const path = require('path');

const entryControllers = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'));
    },

    otra: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/otra.html'));
    }
}

module.exports = entryControllers