const exchangeDA = require('../dataAccess/exchange');
const productDA = require('../dataAccess/product');

const { RESULT_CODES } = require("../utils/index");

const createExchange = async ({ id_prod1, id_prod2, estado }) => {
    try {
        const exchange = await exchangeDA.createExchange({ id_prod1, id_prod2, estado });

        return {
            exchange,
            code: RESULT_CODES.SUCCESS,
        }
    } catch (error) {
        throw new Error(error);
    }
    }

module.exports = {
    createExchange,
}