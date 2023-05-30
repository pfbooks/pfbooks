const { Router } = require("express");
const { User } = require('../db')
const {validateJWT} = require("../tokenvalidation/tokenValidation");
const sendEmail = require("../emailNotifications/emailNotification");
const path = require("path");
const fs = require("fs");
const USERNAME_PLACEHOLDER = "${userName}";
const getUserById = require('../controllers/getUserById');
const updateUserById = require("../controllers/updateUserById");

const router = Router();

// GET ALL USER
router.get('/', async (req, res) => {
    try {
        validateJWT(req, true)
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

// GET USER BY ID
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

//PUT - UPDATE USER BY ID
router.put('/:id', async (req, res) => {
    try {
        validateJWT(req);
        const { id, name, lastName, email, password, adminRole, image, isActive } = req.body;
        const updatedUser = await updateUserById( id, name, lastName, email, password, adminRole, image, isActive)
        res.status(200).json( updatedUser );
    }
    catch (error){
        if(error.message === "invalid JWT credentials"){
            res.status(401).json({err: error.message});
        }
       else{
            res.status(500).json({err: error.message});
        }
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