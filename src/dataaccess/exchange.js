const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createExchange = async ({ id_producto_enviado, id_producto_recibido, mensaje }) => {
  try {
    const exchange = await prisma.intercambio.create({
      data: {
        id_producto_enviado,
        id_producto_recibido,
        mensaje
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

const editState = async ({ id, estado }) => {
  try {
    const exchange = await prisma.intercambio.update({
      where: {
        id: id
      },
      data: {
        estado
      },
      include: {
        producto_enviado: true,
        producto_recibido: true,
      }
    })

    return exchange
  } catch (error) {
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

const getMyExchangesByParams = async ({ userId, exchangeType }) => {
  try {
    const exchange = await prisma.intercambio.findMany({
      where: {
        ...(exchangeType === 'enviado' ? {
          producto_enviado: {
            is: {
              userId: {
                equals: userId
              }
            }
          }
        } : {
          producto_recibido: {
            is: {
              userId: {
                equals: userId
              }
            }
          }
        })
      },
      include: {
        producto_enviado: true,
        producto_recibido: true
      },
      orderBy: {
        estado: 'asc'
      }
    })

    return exchange
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  getMyExchangesByParams,
  createExchange,
  editState,
  getExchangeById
}