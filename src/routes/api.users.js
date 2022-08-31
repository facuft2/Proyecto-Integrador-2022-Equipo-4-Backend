const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.User.findMany();
  res.json(usuarios);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/", async ({ body }, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      contrasenia,
    } = body;
    const usuario = await prisma.User.create({
      data: {
        nombre,
        apellido,
        email,
        contrasenia,
      },
    });
    res.json(usuario);
  } catch (error) {
    console.log(error)
    res.json({ error: error.message });
  }
});

module.exports = router;
