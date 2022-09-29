const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const createProduct = async ({
  titulo,
  descripcion,
  tipo_trato,
  cantidad,
  foto,
  userId,
  categorias
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
        categoria: {
          create: categorias
        }
      }
    })

    return product
  } catch (error) {
    throw new Error(error)
  }
}

const getProductsByCategory = async ({ userId }) => {
  try {
    const products = await prisma.categoria.findMany({
      where: {
        producto: {
          some: {
            producto: {
              isNot: {
                userId
              }
            }
          }
        }
      },
      select: {
        nombre: true,
        producto: {
          select: {
            id_prod: false,
            id_cate: false,
            producto: true
          },
        }
      }
    })

    return products
  } catch (error) {
    throw new Error(error)
  }
};


const getAllProducts = async ({ userId }) => {
  try {
    const product = await prisma.producto.findMany({
      include: {
        categoria: {
          select: {
            categoria: true
          },
        }
      },
      where: {
        userId: {
          not: userId
        }
      },
    })

    return product
  } catch (error) {
    throw new Error(error)
  }
}

const getProductById = async ({ id }) => {
  try {
    id = parseInt(id, 10)

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

const getMyProducts = async ({ userId }) => {
  try {
    const products = prisma.producto.findMany({
      where: {
        userId
      }
    })

    return products
  } catch (error) {
    throw new Error(error)
  }
}

const updateProduct = async ({ id, titulo, descripcion, tipo_trato, cantidad, foto, userId }) => {
  try {
    const product = await prisma.producto.update({
      where: {
        id,
      },
      data: {
        titulo,
        descripcion,
        tipo_trato,
        cantidad,
        foto
      }
    })
    return product
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  getMyProducts,
  getProductById,
  createProduct,
  getAllProducts,
  getProductsByCategory,
  updateProduct
}