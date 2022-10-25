const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const getUsers = async () => {
  try {
    return await prisma.Usuario.findMany({
      select: {
        nombre: true,
        apellido: true,
        email: true,
        descripcion: true,
        foto_perfil: true,
        telefono: true,
        producto: true,
      }
    });

  } catch (error) {
    throw new Error(error);
  }
}

const getUserByProps = async (props) => {
  try {
    return await prisma.Usuario.findUnique({
      where: props,
      select: {
        nombre: true,
        apellido: true,
        email: true,
        descripcion: true,
        foto_perfil: true,
        telefono: true,
        producto: true,
        cant_intercambio: true,
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

const createUser = async ({ nombre, apellido, email, contrasenia, foto_perfil, numero, descripcion }) => {
  try {
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    return await prisma.Usuario.create({
      data: {
        nombre,
        apellido,
        email,
        contrasenia: hashedPassword,
        foto_perfil,
        telefono: numero,
        descripcion
      },
    });
  } catch (error) {
    throw new Error(error);
  }
}

const editUser = async ({
  id,
  nombre,
  apellido,
  email,
  descripcion,
  foto_perfil,
  telefono,
}) => {
  try {
    const user = await prisma.Usuario.update({
      where: {
        id,
      },
      data: {
        nombre,
        apellido,
        email,
        descripcion,
        foto_perfil,
        telefono,
      },
      select: {
        nombre: true,
        apellido: true,
        email: true,
        descripcion: true,
        foto_perfil: true,
        telefono: true,
      }
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}

const incrementExchangeCount = async ({ id }) => {
  try {
    const user = await prisma.Usuario.update({
      where: {
        id,
      },
      data: {
        cant_intercambio: {
          increment: 1,
        },
      },
    });

    return user;
  } catch (error) {
    throw new Error(error);
  }
}


module.exports = {
  getUsers,
  createUser,
  getUserByProps,
  editUser,
  incrementExchangeCount,
}
