const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
  groupid: {
    type: String,
    required: true,
    unique: true
  },
  members: {
    type: [String],
    unique: true
  }, 
  leader: {
    type: String,
    required: true,
    unique: true
  },
  supervisor: {
    type: String
  },
  title: {
    type: String,
    default: "Group"
  },
  domain: {
    type: [String]
  },
  description: {
    type: String,
    default: "-"
  },
  category: {
    type: String,
    default: "Capstone-I"
  },
  program: {
    type: String
  },
  commonFreeslots: {
    type: [[Number]]
  },
  complete: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Group', groupSchema);