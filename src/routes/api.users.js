const router = require("express").Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require('multer');

const inputValidator = require("../middlewares/inputValidator");
const validator = require('./validators/postUser');
const { RESULT_CODES } = require("../utils/index");
const { getUsers, createUser, editUser } = require("../controllers/user");
const { getUserByProps } = require("../dataaccess/user");
const { s3Uploadv3 } = require("../services/clientS3");
const { sendNumberVerification, verifyNumber } = require("../services/verificationTelephone");
const userDA = require("../dataaccess/user");

require('../middlewares/userAuth')

router.get(
  "/myProfile",
  passport.authenticate('jwt', { session: false }),
  async ({ user }, res) => {
    try {
      const usuario = await getUserByProps({ id: user.id });
      
      const formattedUsuario = { ...usuario, producto: usuario.producto.filter(producto => producto.cantidad !== 0 && producto)};

      res.status(200).send(formattedUsuario);
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
        case RESULT_CODES.PHONE_ALREADY_REGISTERED: 
          return res.status(401).send({ error: code })
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

router.post(
  "/verifynumber",
  async ({ body }, res) => {
    try {
      if (await userDA.getUserByProps({ telefono: body.numero })) {
        return res.status(401).send({ code: "El numero ya esta registrado" });
      }
      const number = await sendNumberVerification(body.numero)

      res.status(200).send({ message: "Verification code sent" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/verifycode",
  async ({ body }, res) => {
    try {
      const verify = await verifyNumber(body.numero, body.code)

      console.log('wtfff', verify)

      res.status(200).send({ verify });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.post(
  "/imagen",
  // passport.authenticate("jwt", { session: false }),
  multer({}).single("File"),
  async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).send({ error: "No se ha seleccionado ningun archivo" });
      } else {
        const results = await s3Uploadv3(req.file, 'UserProfile')
        res.status(200).send(results);
      }
    } catch (error) {
      res.json({ error: error.message });
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
      const usuario = await getUserByProps({ id: parseInt(id, 10) });
      
      const formattedUsuario = { ...usuario, producto: usuario.producto.filter(producto => producto.cantidad !== 0 && producto)};

      res.status(200).send(formattedUsuario);
    } catch (error) {
      res.status(500).send({ error: error.message })
    }
  },
);

module.exports = router;
