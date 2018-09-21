const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const masternodeSchema = new Schema({
  // ADD SCHEMA INFO HERE
  masternodeprivkey: {type: String, required: true}
  },{
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
    }
);

const Masternode = mongoose.model("Masternode", masternodeSchema);

module.exports = Masternode;