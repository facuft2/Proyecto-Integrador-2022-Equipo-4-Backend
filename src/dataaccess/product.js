const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProduct = async ({
  titulo,
  descripcion,
  tipo_trato,
  cantidad,
  foto,
  userId,
}) => {
  try {
    const product = await prisma.producto.create({
      data: {
        titulo,
        descripcion,
        tipo_trato,
        foto,
        cantidad,
        userId,
      }
    })

    return product

  } catch (error) {
    console.log(error)
    throw new Error(error)
  }
}

const getProductsByCategory = async () => {
  try {
    const products = await prisma.categoria.findMany({
      select: {
        nombre: true,
        producto: {
          select: {
            id_prod: false,
            id_cate: false,
            producto: true,
          },
        }
      }
    })

    return products
  } catch (error) {
    throw new Error(error)
  }
};


const getAllProducts = async () => {
  try {
    const product = await prisma.producto.findMany({
      include: {
        categoria: {
          select: {
            id_prod: false,
            id_cate: false,
            categoria: {
              select: {
                nombre: true,
                id: false
              }
            },
          },
        }
      }
    })

    return product
  } catch (error) {
    throw new Error(error)
  }
}

const getProductById = async ({ id }) => {
  try {
    id = parseInt(id, 10)
    console.log(id)

    const product = await prisma.producto.findUnique({
      where: { id },
      include: {
        usuario: true
      }
      // include: {
        // intercambioEnviado: true,
        // intercambioRecibido: true,
        // categoria: {
        //   include: {
        //     categoria: {
        //       nombre: true,
        //       id: false
        //     },
        //     id_prod: false,
        //     id_cate: false,
        //     producto: false
        //   }
        // }
      // }
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
  getProductsByCategory,
}