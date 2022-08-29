const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/usuarios", async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      contrasenia,
      ultimo_acceso,
      descripcion,
      foto_perfil,
      telefono,
    } = req.body;
    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        email,
        contrasenia,
        ultimo_acceso,
        descripcion,
        foto_perfil,
        telefono,
      },
    });
    res.json(usuario);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;
