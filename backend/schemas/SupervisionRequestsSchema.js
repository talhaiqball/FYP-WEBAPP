const mongoose = require('mongoose');

const supervisionRequestSchema = new mongoose.Schema({
    groupid: {
        type: String,
        required: true,
    },

    supervisorid: {
        type: String,
        required: true
    },

    idea: {
        type: String,
    },

    comment: {
        type: String
    },

    status: {
        type: String,
        default: "pending"
    },
    title: {
        type: String,
        required: true
    }
});

const SupervisionRequest = mongoose.model('SupervisionRequest', supervisionRequestSchema);

module.exports = SupervisionRequest;
