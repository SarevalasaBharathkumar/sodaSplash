const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrpt=require('bcryptjs');

router.post("/creatuser", [
    body('email', 'Please enter a valid email').isEmail(),
    body('name', 'Name must be at least 5 characters long').isLength({ min: 5 }),
    body('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body('password', 'Password must contain atleast 1 uppercase').matches(/(?=.*[A-Z])/),
    body('password', 'Password must contain atleast 1 digit').matches(/(?=.*[0-9])/),
    body('password', 'Password must contain atleast 1 special character').matches(/(?=.*[@,!,#,$,*,^,&,%,~])/),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const salt= await bcrpt.genSalt();
    let secPassword = await bcrpt.hash(req.body.password,salt);
    try {
        const { name, email, location } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        user = new User({ name, email, password: secPassword, location });
        await user.save();
        res.json({ success: true, message: "User created successfully" });
    } catch (err) {
        console.error("Error:", err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
});

module.exports = router;
