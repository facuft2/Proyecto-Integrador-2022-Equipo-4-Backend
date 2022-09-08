const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const loginMiddleware = require("../middlewares/logincheck") 

router.post(
  '/login',
  loginMiddleware,
  async ({ user }, res) => {
    const currentUser = user;
    const userForToken = {
      username: currentUser.nombre,
      id: currentUser.id,
    };
    const token = jwt.sign({ user: userForToken }, process.env.SECRET_KEY, { });
    res.setHeader('token', token);
    res.status(200).send({
      user: userForToken,
    });
  }
);




module.exports = router;
