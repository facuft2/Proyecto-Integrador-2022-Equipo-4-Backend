const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { createProduct, getProductById, getAllProducts, getProductsByCategory} = require("../business/product");

require('../config/loginCheck')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { body, user } = req;
      const product = await createProduct({ ...body, userId: parseInt(user.id, 10) });

      res.status(200).send({ product });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
);

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const product = await getAllProducts();

      res.status(200).send({ product });
    } catch (error) {
      res.json({ error: error.message });
    }
  },
);

router.get(
  '/categories',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const products = await getProductsByCategory()

      res.status(200).send(products)
    } catch (error) {
      res.json({error: error.message})
    }
  }
)

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id)
      const products = await getProductById({ id });

      res.status(200).send(products);
    } catch (error) {
      res.json({ error: error.message });
    }
  });

module.exports = router;