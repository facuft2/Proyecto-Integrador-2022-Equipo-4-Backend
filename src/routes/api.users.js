const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

const inputValidator = require("../middlewares/inputValidator");
const validator = require('./validators/postUser');
const { RESULT_CODES } = require("../utils/index");

const { getUsers, createUser, editUser } = require("../controllers/user");
const { getUserByProps } = require("../dataaccess/user");

require('../middlewares/userAuth')

// router.get(
//   "/",
//   passport.authenticate('jwt', { session: false }),
//   async (req, res) => {
//   try {
//     const usuarios = await getUsers();
//     res.status(200).send(usuarios);
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// });

router.get(
  "/myProfile",
  passport.authenticate('jwt', { session: false }),
  async ({ user }, res) => {
    try {
      const usuario = await getUserByProps({ id: user.id });
      res.status(200).send(usuario);
    } catch (error) {
      res.json({ error: error.message });
    }
  });

router.post(
  "/",
  inputValidator(validator),
  async ({ body }, res) => {
    try {
      const { user, code } = await createUser(body);

      switch (code) {
        case RESULT_CODES.EMAIL_ALREADY_REGISTERED:
          return res.status(401).send({ error: code });
        case RESULT_CODES.SUCCESS:
          const token = jwt.sign({ user }, process.env.SECRET_KEY, {});
          return res.status(201).header('Authorization', `Bearer ${token}`).send({ user })
        default:
          return res.status(500).send({ error: "Internal server error" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/",
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { body, user } = req;
      const usuario = await editUser({ ...body, id: user.id });
      res.status(200).send({ usuario });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ({ params: { id } }, res) => {
    try {
      const usuarios = await getUserByProps({ id: parseInt(id, 10) });

      res.status(200).send(usuarios);
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
);

module.exports = router;
