const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");
const { name } = require("ejs");
const tcollection = require("./coufig");
const app = express();

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
