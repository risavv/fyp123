const { default: mongoose } = require("mongoose");

//schema
const Class = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const classCollection = new mongoose.model("Class", Class);
module.exports = classCollection;
