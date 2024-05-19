// const mongoose = require("mongoose");

// const courseSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   instructor: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   instrument_type: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: String,
//     required: true,
//   },
//   lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }],
// });

// const lessonSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   course: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Course",
//     required: true,
//   },
// });

// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   instrument_type: {
//     type: String,
//     required: true,
//   },
//   level: {
//     type: String,
//     required: true,
//   },
//   is_instructor: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Course = mongoose.model("Course", courseSchema);
// const Lesson = mongoose.model("Lesson", lessonSchema);
// const User = mongoose.model("User", userSchema);

// module.exports = { Course, Lesson, User };
