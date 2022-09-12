const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createExchange = async ({ id_producto_enviado, id_producto_recibido, estado }) => {
  try {
    const exchange = await prisma.intercambio.create({
      data: {
        id_producto_enviado,
        id_producto_recibido,
        estado,
      },
      include: {
        producto_enviado: true,
        producto_recibido: true,
      }
    })

    return exchange
  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const editState = async ({ estado, id }) => {
  try {
    id = parseInt(id, 10)

    const exchange = await prisma.intercambio.update({
      where: {
        id
      },
      data: {
        estado,
      },
    })

    return exchange

  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const getExchangeById = async ({ id }) => {
  try {
    id = parseInt(id)

    const exchange = await prisma.intercambio.findUnique({
      where: {
        id
      }, 
      include: {
        producto_enviado: {
          include: { 
            usuario: true
          }
        },
        producto_recibido: {
          include: { 
            usuario: true
          }
        },
      }
    });

    return exchange;
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  createExchange,
  editState,
  getExchangeById
}