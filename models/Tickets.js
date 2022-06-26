const mongoose = require("mongoose");

const TicketsSchema = new mongoose.Schema(
  {
    Useraddress: {
      type: String,
      required: true,
    },
    lottaryId: {
      type: Number,
      required: true,
    },
    ticket: {
      type: String,
      required: true,
    },
    payStatus: {
      type: Boolean,
      required: true
    },
    winAmount: {
      type: Number,
      required: true
    },
    matchGroup : {
      type: Number,
      required: true
    }
  }
);

module.exports = mongoose.model("Tickets", TicketsSchema);