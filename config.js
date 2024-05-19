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
const Student = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const collection = new mongoose.model("Students", Student);
module.exports = collection;
