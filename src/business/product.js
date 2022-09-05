const ProductDA = require('../dataaccess/product');
const { RESULT_CODES } = require('../utils/index')

const createProduct = async ({
  titulo,
  descripcion,
  tipo_trato,
  foto,
  usuario,
  userId
}) => {
  try {
    const product = await ProductDA.createProduct({
      titulo,
      descripcion,
      tipo_trato,
      foto,
      usuario,
      userId,
    })

    return product
  } catch (error) {
    throw new Error(error);
  }
}

const getAllProducts = async () => {
  try {
    const products = await ProductDA.getAllProducts()

    return products
  } catch (error) {
    throw new Error(error);
  }
}

const getProductById = async (id) => {
  try {
    const product = await ProductDA.getProductById(id);

    if (!product) {
      return {
        code: RESULT_CODES.PRODUCT_NOT_FOUND,
      }
    }

    return {
      product,
      code: RESULT_CODES.SUCCESS
    }
  } catch (error) {
    throw new Error(error);
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
}