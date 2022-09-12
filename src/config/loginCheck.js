const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JWTstrategy, ExtractJwt: ExtractJWT } = require('passport-jwt');
const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

passport.use(
  new JWTstrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromHeader('token'),
  }, async (token, done) => {
    try {
      const currentUser = await prisma.Usuario.findUnique({ where: { id: token.user.id } });

      return done(null, currentUser);
    } catch (error) {
      return done(error);
    }
  }),
);
