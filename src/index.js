require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { userModel } = require("./model");
const userRouter = require("../routes/user"); 
const app = express();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users',userRouter);

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
// app.post("/users/signup", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const newUser = await userModel.create({ email, password });
//     console.log(`New user created with email: ${email}`);
//     res.status(201).json({ message: "User registered successfully", user: newUser });
//   } catch (err) {
//     console.error("Error during sign-up:", err);
//     res.status(500).json({ message: "Error creating user" });
//   }
// });
// app.post("/users/signin", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await userModel.findOne({ email });

//     // If user is not found, return an error
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the password is correct
//     const isPasswordValid = password === user.password; // Replace with bcrypt if passwords are hashed

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     // On successful login, return a success message or a token (e.g., JWT)
//     res.status(200).json({ message: "Signin successful", user });
//   } catch (err) {
//     console.error("Error during signin:", err);
//     res.status(500).json({ message: "Error signing in" });
//   }
// });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
