const { Router } = require("express");
const { User } = require('../db')
const {validateJWT} = require("../tokenvalidation/tokenValidation");


const router = Router();

// GET 
router.get('/', async (req, res) => {
    try {
        validateJWT(req)
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(401).send("invalid JWT credentials")
    }
});

// POST 
router.post('/', async (req, res) => {
    try {
      const { name, lastName, email, password } = req.body;
      const user = await User.create({ name, lastName, email, password });
      const cleanUser = user.dataValues
      delete cleanUser.password
      res.status(201).json(cleanUser);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });

//PUT
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, password, adminRole } = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.adminRole = adminRole;
        await user.save();
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
module.exports = router;