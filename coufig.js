const mongoose = require("mongoose");
const connect = mongoose.connect(
  "mongodb+srv://Rishav:katipasswordchangegarnu112@fyp-123.aafxogf.mongodb.net/"
);

connect
  .then(() => {
    console.log("Database connected!");
  })

  .catch(() => {
    console.log("Database cannot be connected!");
  });

//schema
const Teacher = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  instrument: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
});

const tcollection = new mongoose.model("Instructors", Teacher);
module.exports = tcollection;
