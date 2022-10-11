const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { createExchange, editExchangeState, getExchangeById, getMyExchangesByParams } = require("../controllers/exchange");

require('../middlewares/userAuth')

router.post('/:idR/:idO', passport.authenticate('jwt', { session: false }), async ({ params, user, body }, res) => {
    try {
        const exchange = await createExchange({
            ...body,
            idR: parseInt(params.idR, 10),
            idO: parseInt(params.idO, 10),
            mensaje: body.mensaje,
            userId: user.id
        });
        switch (exchange.code) {
            case RESULT_CODES.PRODUCT_NOT_FOUND:
                res.status(404).send({ error: RESULT_CODES.PRODUCT_NOT_FOUND });
                break;
            case RESULT_CODES.NOT_PRODUCT_OWNER:
                res.status(400).send({ error: RESULT_CODES.NOT_PRODUCT_OWNER });
                break;
            case RESULT_CODES.SAME_USER:
                res.status(400).send({ error: RESULT_CODES.SAME_USER });
                break;
            case RESULT_CODES.MISSING_MESSAGE:
                res.status(400).send({ error: RESULT_CODES.MISSING_MESSAGE });
                break;
            default:
                res.status(200).send({ exchange });
                break;
        }
    } catch (error) {
        res.json({ error: error.message });
    }
});



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
    '/',
    passport.authenticate('jwt', { session: false }),
    async ({user: {id}, query: {exchangeType}}, res) => {
      try {
        const exchange = await getMyExchangesByParams({userId: id, exchangeType})

        if (exchange.code === RESULT_CODES.INVALID_EXCHANGE_TYPE) {
          return res.status(400).send({ error: RESULT_CODES.INVALID_EXCHANGE_TYPE });
        }
  
        res.status(200).send(exchange);
      } catch (error) {
        throw new Error(error)
      }
    }
  )

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async ({params: {id}, user}, res) => {
    try {
      const exchange = await getExchangeById({id, userId: user.id});

      if (exchange.code === RESULT_CODES.EXCHANGE_NOT_FOUND) {
        return res.status(404).send({ error: RESULT_CODES.EXCHANGE_NOT_FOUND });
      }

      if (exchange.code === RESULT_CODES.NOT_EXCHANGE_OWNER) {
        return res.status(400).send({ error: RESULT_CODES.NOT_EXCHANGE_OWNER });
      }

      res.status(200).send(exchange);
    } catch (error) {
      throw new Error(error)
    }
  }
)


module.exports = router;
