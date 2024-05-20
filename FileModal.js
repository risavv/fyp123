const mongoose = require("mongoose");

//schema
const File = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
});

const fileCollection = new mongoose.model("Files", File);
module.exports = fileCollection;
