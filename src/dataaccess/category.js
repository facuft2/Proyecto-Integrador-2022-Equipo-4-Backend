const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async ({nombre}) => {
  try {
    const product = await prisma.categoria.create({
      data: {
        nombre
      }
    })

    return product
  } catch (error) {
    throw new Error(error)
  }
};

const getCategoryByName = async ({nombre}) => {
  try {
    const product = await prisma.categoria.findUnique({
      where: {
        nombre
      }
    })

    return product
  } catch (error) {
    throw new Error(error)
  }
};

const getCategory = async () => {
  try {
    const product = await prisma.categoria.findMany()
    
    return product
  } catch (error) {
    throw new Error(error)
  }
}

const createCatProducto = async ({id_cate, id_prod}) => {
  try {
    const catProducto = await prisma.catProducto.create({
      data: {
        id_prod,
        id_cate
      }
    });

    return catProducto
  } catch (error) {
    throw new Error(error)
  }
}


module.exports = {
  createCategory,
  getCategory,
  createCatProducto,
  getCategoryByName,
}
