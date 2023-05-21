const { Router } = require("express");
const { User } = require('../db')
const {validateJWT} = require("../tokenvalidation/tokenValidation");
const sendEmail = require("../emailNotifications/emailNotification");
const USERNAME_PLACEHOLDER = "${userName}";
const REGISTRATION_MESSAGE = "Hola " + USERNAME_PLACEHOLDER + ".\n\n" +
    "Te informamos que tu registro en nuestro sitio web fue exitoso.\n" +
    "A partir de ahora, podrás acceder a nuestros servicios y funcionalidades.\n" +
    "Gracias por unirte a SERENDIPIA, esperamos disfrutes de la experiencia.\n\n" +
    "Saludos cordiales.\n" +
    "SERENDIPIA"
const getUserById = require('../controllers/getUserById');



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
      sendEmail(cleanUser.email,
            `Registro exitoso del usuario : ${cleanUser.email}`,
            REGISTRATION_MESSAGE.replace(USERNAME_PLACEHOLDER, user.name + " " + cleanUser.lastName));
      res.status(201).json(cleanUser);
    } catch (error) {
      res.status(400).json({error: error.message});
    }
  });
// GET from a specific user
// router.get('/:id', async(req, res) =>{
//     try {
//         validateJWT(req)
//         const userId = req.params.id;
//         const user = await User.findByPk(userId)
//         if(!user){
//             return res.status(404).json({error: 'User not found'})
//         }
//         res.status(200).json(user)
//     } catch (error) {
//         console.log('Error retrieving user', error);
//         res.status(500).json({error:'Server error'})
//     }
// })
router.get('/:id', async (req, res) => {
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