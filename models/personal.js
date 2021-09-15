const mongoose = require('mongoose');

const personalSchema = new mongoose.Schema({

    name: {type: String, required: true},
    lastName: {type: String, required: true},
    idNumber: {type: String, required: true},
    eMail: {type: String, required: true},
    area: {type: String, required: true},
    job: {type: String, required: true},
    shift: {type: String, required: true},
    admin: {type: Boolean, default: false},
    securityLevel: {type: Number, required: true},
    personalLog: {type: Array, required: true},
    personalTasks: {type: Array, required: true} 

})

const Personal = mongoose.model('Personal', personalSchema);
module.exports = Personal;