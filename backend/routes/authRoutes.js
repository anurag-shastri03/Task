const express = require("express");
const User = require("../models/users");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    const newUser = new User({ name, email, password, role });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered" });
    } catch (error) {
        res.status(400).json({ message: "Error registering user" });
    }
});

// Login 
router.post("/login", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000"); // Ensure this matches frontend
    res.setHeader("Access-Control-Allow-Credentials", "true");

    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        res.json({ message: "Login successful", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});


// Get Users
router.get("/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});



router.post("/logout", (req, res) => {
    try {
        res.clearCookie("connect.sid"); // Clear session cookie if using express-session
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        res.status(500).json({ error: "Logout failed" });
    }
});

module.exports = router;


