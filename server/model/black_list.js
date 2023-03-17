const mongoose = require("mongoose");

const Black_listSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.Black_list = mongoose.model("Black_list", Black_listSchema);
