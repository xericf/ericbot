var mongoose = require("mongoose");

var playerSchema = mongoose.Schema({
  userID: Number,
  username: String,
  balance: Number,
  rank: Number,
  created: {
    type: Date,
    default: Date().toString()
  },
  cooldown: [{
    command: String,
    date: {
      type: Date,
      default: Date().toString()
    }
  }],
});

module.exports = mongoose.model("Player", playerSchema);
