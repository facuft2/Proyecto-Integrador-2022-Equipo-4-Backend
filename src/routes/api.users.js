const router = require("express").Router();
const passport = require('passport');

const inputValidator = require("../middlewares/inputValidator");
const validator = require('./validators/postUser');
const { RESULT_CODES } = require("../utils/index");

const { getUsers, createUser, editUser } = require("../business/user");
const { getUserByProps } = require("../dataaccess/user");

require('../config/loginCheck')

router.get(
  "/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
  try {
    const usuarios = await getUsers();
    res.status(200).send(usuarios);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ({params: { id }}, res) => {
    try {
      const usuarios = await getUserByProps({id: parseInt(id, 10)});

      console.log(usuarios)

      const userForToken = {
        email: usuarios.email,
        username: usuarios.nombre,
        id: usuarios.id,
      };

      console.log(userForToken)
  
      const token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY, {});
    
      res.status(200).header('Authorization', `Bearer ${token}`).send('User created')

    } catch (error) {
      res.status(500).send({error: error.message})
    }


  }
)

router.post(
  "/",
  inputValidator(validator),
  async ({ body }, res) => {
    try {
      const usuario = await createUser(body);
      

      switch (usuario.code) {
        case RESULT_CODES.EMAIL_ALREADY_REGISTERED:
          return res.status(401).send({ error: usuario.code });
        case RESULT_CODES.SUCCESS:
          return res.status(201).send(usuario);
        default:
          return res.status(500).send({ error: "Internal server error" });
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  });

router.put(
  "/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { body, user } = req;
      const usuario = await editUser({...body, id: user.id});
      res.status(200).send({ usuario });
    } catch (error) {
      res.json({ error: error.message });
    }
  });

module.exports = router;
