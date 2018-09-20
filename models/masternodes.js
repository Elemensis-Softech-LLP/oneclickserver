const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const masternodeSchema = new Schema({
// ADD SCHEMA INFO HERE
});

const Masternode = mongoose.model("User", masternodeSchema);

module.exports = Masternode;