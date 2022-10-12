const exchangeDA = require('../dataAccess/exchange');
const productDA = require('../dataAccess/product');

const { RESULT_CODES } = require("../utils/index");

const createExchange = async ({ idO, idR, mensaje, userId }) => {
  try {
    const productSended = await productDA.getProductById({ id: idO });
    const productRecieved = await productDA.getProductById({ id: idR });

    if (!productSended || !productRecieved) {
      return {
        code: RESULT_CODES.PRODUCT_NOT_FOUND
      }
    }

    if (productSended.userId === productRecieved.userId) {
      return {
        code: RESULT_CODES.SAME_USER
      }
    }

    if (productSended.userId !== userId) {
      return {
        code: RESULT_CODES.NOT_PRODUCT_OWNER
      }
    }

    if (!mensaje) {
      return {
        code: RESULT_CODES.MISSING_MESSAGE
      }
    }

    const exchange = await exchangeDA.createExchange({
      id_producto_enviado: idO,
      id_producto_recibido: idR,
      mensaje,
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
    const { producto_enviado } = await exchangeDA.getExchangeById({ id })

    if (!producto_enviado.userId === userId) {
      return {
        code: RESULT_CODES.YOU_CANNOT_MAKE_THIS_ACTION
      }
    }

    const exchange = await exchangeDA.editState({ estado, id })

    return {
      exchange,
      code: RESULT_CODES.SUCCESS,
    }
  } catch (error) {
    throw new Error(error)
  }
};

const getExchangeById = async ({ id, userId }) => {
  try {
    const exchange = await exchangeDA.getExchangeById({ id })

    if (!exchange) {
      return {
        code: RESULT_CODES.EXCHANGE_NOT_FOUND
      }
    }

    if (exchange.producto_enviado.userId !== userId && exchange.producto_recibido.userId !== userId) {
      console.log(exchange.producto_enviado.userId, userId)
      return {
        code: RESULT_CODES.NOT_EXCHANGE_OWNER
      }
    }

    return exchange;
  } catch (error) {
    throw new Error(error)
  }
};

const getMyExchangesByParams = async ({ userId, exchangeType }) => {
  try {
    if (exchangeType === 'enviado' || exchangeType === 'recibido') {
      const exchanges = await exchangeDA.getMyExchangesByParams({ userId, exchangeType })
      return exchanges;
    }
    
    return {
      code: RESULT_CODES.INVALID_EXCHANGE_TYPE
    }
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = {
  createExchange,
  editExchangeState,
  getExchangeById,
  getMyExchangesByParams,
}