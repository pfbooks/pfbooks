const { Router } = require("express");
const User = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

router.post("/", async (req, res) => {
  const { name, last_name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      last_name,
      email,
      password,
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
});

module.exports = router;
