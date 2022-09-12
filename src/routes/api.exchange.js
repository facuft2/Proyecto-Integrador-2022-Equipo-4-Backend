const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { createExchange, editExchangeState, getExchangeById } = require("../business/exchange");

require('../config/loginCheck')

router.post(
    '/:id_producto_recibido',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
    try {
        const { params: {id_producto_recibido}, body} = req;
        const exchange = await createExchange({...body, id_producto_recibido});

        res.status(200).send(exchange);
    } catch (error) {
        res.json({ error: error.message });
    }
    }
);

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
    try {
        const { params: {id}, body } = req;
        const exchange = await editExchangeState({...body, id});
        res.status(200).send(exchange);
    } catch (error) {
        res.json({ error: error.message });
    }
    }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ({params: {id}}, res) => {
    try {
      const exchange = await getExchangeById({id})

      res.status(200).send(exchange);
    } catch (error) {
      throw new Error(error)
    }
  }
)


module.exports = router;
