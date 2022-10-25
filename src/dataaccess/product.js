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
        AND: [{
          producto: {
            some: {
              producto: {
                isNot: {
                  userId,
                }
              },
            }
          }
        }]
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
    console.log(error)
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
        AND: [{
          userId: {
            not: userId
          },
        }, {
          cantidad: {
            gt: 0
          }
        }
        ]
      },
    })

    return product
  } catch (error) {
    throw new Error(error)
  }
}

const getProductByFilter = async ({ searchText }) => {
  try {
    const product = await prisma.producto.findMany({
      where: {
        OR: [
          {
            titulo: {
              startsWith: searchText,
            }
          }
        ]
      }
    });

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
        usuario: {
          select: {
            nombre: true,
            apellido: true,
            email: true,
            descripcion: true,
            foto_perfil: true,
            telefono: true,
          }
        }
      }
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
        AND: [{
          userId
        }, {
          cantidad: {
            gt: 0
          }
        }]
      }
    })

    return products
  } catch (error) {
    throw new Error(error)
  }
}

const decrementCountProduct = async ({ id }) => {
  try {
    const product = await prisma.producto.update({
      where: {
        id
      },
      data: {
        cantidad: {
          decrement: 1
        }
      }
    })

    return product;
  }
  catch (error) {
    console.log(error)
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
  getProductByFilter,
  updateProduct,
  decrementCountProduct
}