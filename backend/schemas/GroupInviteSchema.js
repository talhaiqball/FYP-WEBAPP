const mongoose = require('mongoose');

const groupInviteSchema = new mongoose.Schema({
    leaderid: {
        type: String,
        required: true,
    },

    groupid: {
        type: String,
        required: true
    },

    groupTitle: {
        type: String
    },

    memberid: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
});

const GroupInvite = mongoose.model('GroupInvite', groupInviteSchema);

module.exports = GroupInvite;
