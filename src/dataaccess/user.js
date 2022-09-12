const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const getUsers = async () => {
  try {
    return await prisma.Usuario.findMany({
      include: {
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
      include: {
        producto: true,
      }
    });
  } catch (error) {
    throw new Error(error);
  }
}

const createUser = async ({ nombre, apellido, email, contrasenia }) => {
  try {
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    return await prisma.Usuario.create({
      data: {
        nombre,
        apellido,
        email,
        contrasenia: hashedPassword,
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
  contrasenia,
  ultimo_acceso,
  nro_puerta,
  localidad,
  calle,
  descripcion,
  foto_perfil,
  cant_intercambio,
  tipo,
  telefono,
}) => {
  try {
    const hashedPassword = await bcrypt.hash(contrasenia, 10);

    const isPasswordChanged = contrasenia ? hashedPassword : null;

    const user = await prisma.Usuario.update({
      where: {
        id,
      },
      data: {
        nombre,
        apellido,
        email,
        contrasenia: isPasswordChanged,
        ultimo_acceso,
        nro_puerta,
        localidad,
        calle,
        descripcion,
        foto_perfil,
        cant_intercambio,
        tipo,
        telefono,
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
}
