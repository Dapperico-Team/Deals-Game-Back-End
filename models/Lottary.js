const mongoose = require("mongoose");

const LottarySchema = new mongoose.Schema(
  {
    lottaryId: {
      type: Number,
      required: true,
      min: 0,
      unique: true
    },
    isCalced: {
      type: Boolean,
      required: true,
    },
    allTickets: {
      type: [String],
    },
    totalCollectedValue: {
      type: Number,
      min: 0,
      default: 0,
    },
    winCode: {
      type: String,
    },
    paymentMethod: {
      type: Number
    }
  }
);

module.exports = mongoose.model("Lottary", LottarySchema);