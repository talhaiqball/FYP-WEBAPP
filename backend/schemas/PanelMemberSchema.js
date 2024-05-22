const mongoose = require('mongoose');

const panelMemberSchema = new mongoose.Schema({
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
    resetPassword: {
        type: Boolean,
        default: false
    }
});

const PanelMember = mongoose.model('PanelMember', panelMemberSchema);

module.exports = PanelMember;