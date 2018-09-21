const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const coinSchema = new Schema({
  name:  { type: String, required: true, unique: true },
  ticker: { type: String, required: true, unique: true },
  supported: {type: Boolean, default: false}
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Coin = mongoose.model("Coin", coinSchema);

module.exports = Coin;