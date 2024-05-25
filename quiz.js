const { default: mongoose } = require("mongoose");

//schema
const Quiz = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
});

const quizCollection = new mongoose.model("Quiz", Quiz);
module.exports = quizCollection;
