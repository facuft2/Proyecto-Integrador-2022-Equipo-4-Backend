const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createExchange = ({ id_prod1, id_prod2, estado }) => {
  try {
    const exchange = prisma.intercambio.create({
      data: {
        id_prod1,
        id_prod2,
        estado,
      }
    })

    return exchange

  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createExchange,
}