const bcrypt = require('bcrypt');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

require('dotenv').config();

const loginMiddleware = async (req, res, next) => {
    try {
        const {body: {email, contrasenia}} = req
        const currentUser = await prisma.usuario.findUnique({ where: { email } });
        if (!currentUser) { return res.status(401).send({error: 'El usuario no es correcto'}); }
        const valid = await bcrypt.compare(contrasenia, currentUser.contrasenia);
        if (!valid) { return res.status(401).send({error: 'La contraseña es incorrecta'}) }
        req.user = currentUser
        next()
        return currentUser;
    } catch (err) {
        throw new Error(err);
    }
}

module.exports = loginMiddleware;