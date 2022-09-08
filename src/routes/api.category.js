const router = require("express").Router();
const passport = require('passport');

const { RESULT_CODES } = require("../utils/index");
const { getCategory } = require("../dataaccess/category")
const { createCategory, createCatProduct,  } = require("../business/category");

require('../config/loginCheck')

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async ({body: {nombre}}, res) => {
    try {
      const category = await createCategory({nombre})

      res.status(200).send(category)
    } catch (error) {
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