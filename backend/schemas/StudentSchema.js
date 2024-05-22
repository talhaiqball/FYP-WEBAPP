const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
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
    CGPA: {
        type: Number
    },
    program: {
        type: String,
        required: true
    },
    skills: {
        type: [String]
    },
    interests: {
        type: [String]
    },
    freeslots: {
        type: [[Number]]
    },
    capstone: {
        type: Number,
        default: 0
    },
    isLeader: {
        type: Boolean,
        default: false
    },
    inGroup: {
        type: Boolean,
        default: false
    },
    resetPassword: {
        type: Boolean,
        default: false
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;