const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { createExchange } = require("../business/exchange");

require('../config/loginCheck')

router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
    try {
        const { body} = req;
        const exchange = await createExchange({...body});

        res.status(200).send({ exchange });
    } catch (error) {
        res.json({ error: error.message });
    }
    }
);

module.exports = router;
