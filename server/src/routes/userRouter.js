const { Router } = require("express");
const { User } = require('../db')
const {validateJWT} = require("../tokenvalidation/tokenValidation");
const sendEmail = require("../emailNotifications/emailNotification");
const path = require("path");
const fs = require("fs");
const USERNAME_PLACEHOLDER = "${userName}";
const getUserById = require('../controllers/getUserById');

const router = Router();

// GET ALL USER
router.get('/', async (req, res) => {
    try {
        validateJWT(req)
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(401).send("invalid JWT credentials")
    }
});

// POST NEW USER
router.post('/', async (req, res) => {
    try {
        const {name, lastName, email, password} = req.body;
        const user = await User.create({name, lastName, email, password});
        const cleanUser = user.dataValues
        delete cleanUser.password

        const emailTemplatePath = path.resolve('src/emailTemplate/register-template.html')
        fs.readFile(emailTemplatePath, 'utf-8', (err, data) => {
            sendEmail(cleanUser.email,
                `Registro exitoso del usuario : ${cleanUser.email}`,
                data.replace(USERNAME_PLACEHOLDER, user.name + " " + cleanUser.lastName));
        })

        res.status(201).json(cleanUser);

    } catch (error) {
        res.status(400).json({error: error.message});
    }
  });

router.get('/:id', async(req, res) =>{
    try {
        validateJWT(req)
        const { id } = req.params;
        const userById = await getUserById(id);

        res.status(200).json(userById);
    }
    catch (error) {
        console.log('')
        res.status(400).json({ err : error.message });
    }
});

//PUT
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, lastName, email, password, adminRole, image } = req.body;
    const user = await User.findOne({ where: { id } });
    if (user) {
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.password = password;
        user.adminRole = adminRole;
        user.image = image;
        await user.save();
        res.json(user);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});
// put of a profileImage
router.put('/image/:id', async (req, res) => {
  const { id } = req.params;
  const { imageUrl } = req.body; // Extrae imageUrl del cuerpo de la solicitud

  try {
    const user = await User.findOne({ where: { id } });
    if (user) {
      user.image = imageUrl;
      await user.save();
      const cleanUser = user.dataValues
      delete cleanUser.password
      res.json(cleanUser);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al guardar la imagen del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



module.exports = router;