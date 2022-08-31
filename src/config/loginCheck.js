
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const { prisma } = require('@prisma/client');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (username, password, done) => {
      try {
        User.prototype.verifyPassword = async function (pass) {
          try {
            return await bcrypt.compare(pass, this.password);
          } catch (error) {
            console.error(error);
            return done(null, false);
          }
        };

        const currentUser = await prisma.User.findUnique({ where: { email: username } });

        const validateUser = await currentUser.verifyPassword(password);

        if (validateUser) {
          return done(null, currentUser);
        } if (!validateUser && currentUser) {
          return done(null, false);
        }
        return done(null, false);
      } catch (error) {
        console.log(`[ERROR]: ${error}`);
        return done(null, false);
      }
    },
  ),
);