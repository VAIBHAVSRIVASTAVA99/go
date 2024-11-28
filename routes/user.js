const express = require('express')
const { Router } = require("express");
const userRouter = Router();
const { UserModel } = require('../src/model')
const bcrypt = require('bcrypt')
const { userModel } = require("../src/model");
const { jwt, userAuth, JWT_USER_SECRET } = require('../src/auth')
const { z } = require('zod')

userRouter.post("/signup", async function (req, res) {
        const { email, password } = req.body;
    try {
        const newUser = await userModel.create({ email, password });
        console.log(`New user created with email: ${email}`);
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (err) {
        console.error("Error during sign-up:", err);
        res.status(500).json({ message: "Error creating user" });
    }
});
//     const requiredBody = z.object({
//         email: z.string().min(3).max(100).email(),
//     password: z.string().min(3).max(100)
//   })
//   const parsedCorrectly = requiredBody.safeParse(req.body)

//   if (!parsedCorrectly.success) {
//     res.status(400).json({
//       message: "wrong format of input"
//     })
//     return;
//   }
// //   const {email, password } = req.body

//   const hashedPassword = await bcrypt.hash(password, 5)

//   try {
//     await UserModel.create({
//       email: email,
//       password: hashedPassword
//     })
//   } catch (e) {
//     console.error("error in user Signup", e)
//     return;
//   }
//   res.json({
//     message: "you are signed up"
//   })
// })

userRouter.post("/signin", async function (req, res) {

    const { email, password } = req.body;

  try {
    
    const user = await userModel.findOne({ email });

    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    
    const isPasswordValid = password === user.password;

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Signin successful", user });
  } catch (err) {
    console.error("Error during signin:", err);
    res.status(500).json({ message: "Error signing in" });
  }
//   const { email, password } = req.body
//   const user = await UserModel.findOne({
//     email: email,
//   })

//   if (!user) {
//     res.status(403).json({
//       message: "user does not exist"
//     })
//     return
//   }

//   const passwordMatched = await bcrypt.compare(password, user.password)

//   if (passwordMatched) {
//     const token = jwt.sign({
//       id: user._id.toString()
//     }, JWT_USER_SECRET)
//     res.json({
//       token: token
//     })
//   } else {
//     res.status(403).json({
//       message: "incorrect creds"
//     })
//   }

})
module.exports =userRouter
