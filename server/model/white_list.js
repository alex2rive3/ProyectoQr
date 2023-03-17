const mongoose = require("mongoose");

const White_listSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports.White_list = mongoose.model("White_list", White_listSchema);
