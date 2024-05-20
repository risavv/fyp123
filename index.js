const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const { name } = require("ejs");
const tcollection = require("./coufig");
const app = express();

const multer = require("multer");
const fileCollection = require("./FileModal");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// File filter to accept only specified file types
const fileFilter = function (req, file, callback) {
  let ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx" && ext !== ".txt") {
    return callback(
      new Error("Only PDF, Word, and TXT files are allowed"),
      false
    );
  }
  callback(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).single("userFile");

// for JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", "D:\\bothends-fyp\\backend-fyp\\views");

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

// SIGN UP (Student)!!!
app.post("/signauth", async (req, res) => {
  try {
    const { fullname, email, password, instrument, level } = req.body;
    // Check if all required fields are provided
    if (!fullname || !email || !password || !instrument || !level) {
      return res.status(400).send("All fields are required");
    }

    // check if user already exists
    const existingUser = await collection.findOne({ name: fullname });
    if (existingUser) {
      return res.send(
        "Username already exists. Please choose a different username."
      );
    } else {
      // password hashing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log(req.body);
      // Create a new document with the provided data
      const newUser = await collection.create({
        name: fullname,
        email: email,
        password: hashedPassword,
        instrument: instrument,
        level: level,
      });
      await newUser.save();

      console.log("User registered:", newUser);
      res.status(201).send("User registered successfully");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// SIGN UP (teacher)!!!
app.post("/teachsign", async (req, res) => {
  try {
    const { fullname, email, password, instrument, level } = req.body;
    // Check if all required fields are provided
    if (!fullname || !email || !password || !instrument || !level) {
      return res.status(400).send("All fields are required");
    }

    // check if user already exists
    const existingUser = await tcollection.findOne({ name: fullname });
    if (existingUser) {
      return res.send(
        "Username already exists. Please choose a different username."
      );
    } else {
      // password hashing
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      console.log(tcollection);
      // Create a new document with the provided data
      const newUser = await tcollection.create({
        name: fullname,
        email: email,
        password: hashedPassword,
        instrument: instrument,
        level: level,
      });
      await newUser.save();

      console.log("User registered:", newUser);
      res.status(201).send("User registered successfully");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("Internal Server Error");
  }
});

//LOGIN student!!!
app.post("/logauth", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.username });
    if (!check) {
      return res.send("Username cannot be found.");
    }

    const isPasswordMatch = await bcrypt.compare(
      req.body.password,
      check.password
    );

    if (isPasswordMatch) {
      // Passwords match, render studentlog page
      return res.render("studentdash");
    } else {
      // Passwords do not match
      return res.send("Wrong password.");
    }
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during login authentication:", error);
    // Send an appropriate error message to the client
    return res.status(500).send("An unexpected error occurred.");
  }
});

// FILE UPLOAD (TEACH)
app.post("/api/file", function (req, res) {
  console.log(req);
  upload(req, res, function (err) {
    if (err) {
      return res.status(400).send(err.message);
    }

    const newFile = new fileCollection({
      name: req.file.originalname,
      file: req.file.path,
    });

    newFile.save();
    res.status(201).send("FileUploaded successfully");
  });
});

app.get("/api/files", async (req, res) => {
  try {
    const files = await fileCollection.find({});
    res.json(files);
  } catch (err) {
    res.status(500).send("Error retrieving files");
  }
});

// Route to download a file
app.get("/api/file/:id", async (req, res) => {
  try {
    const file = await fileCollection.findById(req.params.id);
    if (!file) {
      return res.status(404).send("File not found");
    }
    res.download(file.file, file.name);
  } catch (err) {
    res.status(500).send("Error downloading file");
  }
});

// Serve files statically for viewing
app.use("/uploads", express.static("uploads"));

// // LOGIN teacher!!!
// app.post("/logins", async (req, res) => {
//   try {
//     const check = await collection.findOne({ name: req.body.username });
//     if (!check) {
//       return res.send("Username cannot be found.");
//     }

//     const isPasswordMatch = await bcrypt.compare(
//       req.body.password,
//       check.password
//     );

//     if (isPasswordMatch) {
//       // Passwords match, render dash
//       return res.render("teachdash");
//     } else {
//       // Passwords do not match
//       return res.send("Wrong password.");
//     }
//   } catch (error) {
//     // Log the error for debugging purposes
//     console.error("Error during login authentication:", error);
//     // Send an appropriate error message to the client
//     return res.status(500).send("An unexpected error occurred.");
//   }
// });

//404
// app.use(express.static(path.join(__dirname, "public")));

// // Middleware for handling 404 errors
// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, "404.html"));
// });

const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
