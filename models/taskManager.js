const mongoose = require('mongoose');

const taskManagerSchema = new mongoose.Schema({
    
    adminId: {type: mongoose.Types.ObjectId, ref: "personal"},
    personalId: {type: mongoose.Types.ObjectId, ref: "personal"},
    task: {type: String, required: true},
    taskCompleted: {type: Boolean, default: false},
    

})

const TaskManager = mongoose.model('TaskManager', taskManagerSchema);
module.exports = TaskManager;