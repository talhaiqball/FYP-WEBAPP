const mongoose = require('mongoose');

const coordinatorSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    
    password: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    resetPassword: {
        type: Boolean,
        default: false
    }
});

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);

module.exports = Coordinator;
