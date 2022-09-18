const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { createCategory, createCatProduct, getCategory } = require("../business/category");

require('../config/loginCheck')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async ({body: {nombre}}, res) => {
    try {
      const category = await createCategory({nombre})

      switch (category.code) {
        case RESULT_CODES.CATEGORY_ALREADY_REGISTERED:
          return res.status(401).send({ error: category.code });
        case RESULT_CODES.SUCCESS:
          return res.status(201).send({category})
        default:
          return res.status(500).send({ error: "Internal server error" });
      }
    } catch (error) {
      throw new Error(error)
    }
  }
)

router.get(
  '/', 
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const category = await getCategory()

      switch (category.code) {
        case RESULT_CODES.SUCCESS:
          return res.status(200).send(category)
        default:
          return res.status(500).send({ error: "Internal server error" });
      }
    }
    catch (error) {
      throw new Error(error)
    }
  }
)

router.post(
  '/asign',
  passport.authenticate('jwt', { session: false }),
  async ({body: {id_prod, id_cate}}, res) => {
    try {
      const category = await createCatProduct({id_prod, id_cate})

      res.status(200).send(category)
    } catch (error) {
      throw new Error(error)
    }
  }
)

module.exports = router