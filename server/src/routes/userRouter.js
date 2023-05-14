const { Router } = require("express");
const {User} = require('../db')


const router = Router();

// GET 
router.get('/', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// POST 
router.post('/', async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;
      const user = await User.create({ name, lastName, email, password });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });
//PUT
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, password, role } = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.role = role;
        await user.save();
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
module.exports = router;