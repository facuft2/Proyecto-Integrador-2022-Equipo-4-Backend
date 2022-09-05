const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProduct = ({titulo, descripcion, tipo_trato, foto, usuario, userId,}) => {
  try {
    const product = prisma.producto.create({
      data: {
        titulo,
        descripcion,
        tipo_trato,
        foto,
        usuario,
        userId,
      }
    })

    return product

  } catch (error) {
    throw new Error(error)
  }
}

const getAllProducts = () => {
  try {
    const product = prisma.producto.findMany()

    return product
  } catch (error) {
    throw new Error(error)
  }
}

const getProductById = (id) => {
  try {
    const product = prisma.producto.findUnique({
      where: {
        id
      }
    })
    
    return product
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getProductById,
  createProduct,
  getAllProducts,
}