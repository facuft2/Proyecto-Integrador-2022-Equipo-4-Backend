const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { createProduct, getProductById } = require("../business/product");

require('../config/loginCheck')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
  try {
    const { body, user} = req;
    const product = await createProduct({...body, userId: user.id});

    res.status(200).send({ product });
  } catch (error) {
    res.json({ error: error.message });
  }
  });

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
  try {
    const { id } = req.params;
    const products = await getProductById(id);

    res.status(200).send({ products });
  } catch (error) {
    res.json({ error: error.message });
  }
  });

module.exports = router;