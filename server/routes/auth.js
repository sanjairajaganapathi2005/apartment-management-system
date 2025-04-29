const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 

router.post('/auth', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).send('username and password are required');

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send("User not found");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(404).send("Invalid credentials");

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '12hr' });

    res.status(200).send({ message: "Login successful", token });
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;