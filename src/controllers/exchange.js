const exchangeDA = require('../dataAccess/exchange');
const productDA = require('../dataAccess/product');

const { RESULT_CODES } = require("../utils/index");

const createExchange = async ({ id_producto_enviado, id_producto_recibido, estado }) => {
  try {

    const productSended = await productDA.getProductById({id: id_producto_enviado});
    const productRecieved = await productDA.getProductById({id: id_producto_recibido});

    id_producto_recibido = parseInt(id_producto_recibido, 10)

    if (!productSended || !productRecieved) {
      return {
        code: RESULT_CODES.PRODUCT_NOT_FOUND
      }
    }

    const exchange = await exchangeDA.createExchange({
      id_producto_enviado,
      id_producto_recibido,
      estado  
    });

    return {
      exchange,
      code: RESULT_CODES.SUCCESS,
    }
  } catch (error) {
    throw new Error(error);
  }
}

const editExchangeState = async ({ estado, id, userId }) => {
  try {
    const {producto_enviado} = await exchangeDA.getExchangeById({id})

    if (!producto_enviado.userId === userId ) {
      return {
        code: RESULT_CODES.YOU_CANNOT_MAKE_THIS_ACTION
      }
    }

    const exchange = await exchangeDA.editState({estado, id})

    return {
      exchange,
      code: RESULT_CODES.SUCCESS,
    }
  } catch (error) {
    throw new Error(error)
  }
};

const getExchangeById = async ({ id }) => {
  try {
    const exchange = await exchangeDA.getExchangeById({id})

    return exchange;
  } catch (error) {
    throw new Error(error)
  }
};

module.exports = {
  createExchange,
  editExchangeState,
  getExchangeById,
}