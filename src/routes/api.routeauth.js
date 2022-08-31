const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const passport = require("passport-jwt");

router.post("/login", async (req, res) => {
    try {
        const { email, contrasenia } = req.body;
        const usuario = await prisma.usuario.findOne({
        where: { email },
        });
        if (!usuario) {
        return res.status(401).json({ error: "Usuario no encontrado" });
        }
        const passwordCorrecto = await bcrypt.compare(contrasenia, usuario.contrasenia);
        if (!passwordCorrecto) {
        return res.status(401).json({ error: "Contraseña incorrecta" });
        }
        const token = jwt.sign({ id: usuario.id }, process.env.SECRET, {
        expiresIn: "1h",
        });
        res.json({ token });
    } catch (error) {
        res.json({ error: error.message });
    }
    }
);

router.post("/signup", async (req, res) => {
    try {
        res.json(await prisma.usuario.create({
        data: {
            ...req.body,
            contrasenia: await bcrypt.hash(req.body.contrasenia, 10),
        },
        }));
    } catch (error) {
        res.json({ error: error.message });
    }
});


module.exports = router;
