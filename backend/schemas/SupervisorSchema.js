const mongoose = require('mongoose');

const supervisorSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    domain: {
        type: [String],
        required: false
    },
    freeslots: {
        type: [[Number]],
        required: false
    },
    ideas: {
        type: [String],
        required: false
    },
    recentProjects: {
        type: [String]
    },
    resetPassword: {
        type: Boolean,
        default: false
    },
    totalSupervisionSlots: {
        type: Number,
        default: 0
    },
    availableSlots: {
        type: Number, 
        default: 0
    },
    groups: {
        type: [String],
        validate: {
            validator: function(v) {
                return Array.isArray(v) && new Set(v).size === v.length;
            },
            message: 'Groups array contains duplicate values'
        }
    }
});

const Supervisor = mongoose.model('Supervisor', supervisorSchema);

module.exports = Supervisor;
