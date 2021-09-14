const path = require('path');

const Controllers = {
    home: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/index.html'));
    },

    otra: (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'views/otra.html'));
    }
}

module.exports = Controllers