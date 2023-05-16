const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/', async (req, res) => {
  const { email, password } = req.body; 

  try {
    if (email && password) { 
      const user = await authController(email, password);
      if (user && !user.error) {
        res.status(200).json({ user });
      } else {
        res.status(user.errorCode).json({ message: user.error });
      }
    } else {
      res.status(400).json({ message: 'Debe suministrar email y contraseña' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});

module.exports = router;
