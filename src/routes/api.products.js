const router = require("express").Router();
const passport = require("passport");
const aws = require('aws-sdk')
const multer = require('multer');

const { RESULT_CODES } = require("../utils/index");
const {
  createProduct,
  getProductById,
  getAllProducts,
  getProductsByCategory,
  getMyProducts,
  getProductByFilter,
  updateProduct,
} = require("../controllers/product");
const { s3Uploadv3 } = require("../middlewares/clientS3");

require("../middlewares/userAuth");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async ({ body, user }, res) => {
    try {
      const product = await createProduct({
        ...body,
        userId: parseInt(user.id, 10),
      });

      res.status(200).send({ product });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.post(
  "/imagen",
  passport.authenticate("jwt", { session: false }),
  multer({}).single("File"),
  async (req, res) => {
    try {
      if (!req.file) {
        res.status(400).send({ error: "No se ha seleccionado ningun archivo" });
      } else {
        const results = await s3Uploadv3(req.file)
        res.status(200).send(results);
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async ({ user, query: { searchText, id } }, res) => {
    try {
      if (!searchText && !id) {
        const products = await getAllProducts({ userId: user.id });
        res.status(200).send(products);
      } else if (searchText) {
        const products = await getProductByFilter({ searchText });
        res.status(200).send(products);
      } else if (id) {
        const product = await getProductById({ id });
        res.status(200).send(product);
      }
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.get(
  "/categories",
  passport.authenticate("jwt", { session: false }),
  async ({ user }, res) => {
    try {
      const products = await getProductsByCategory({
        userId: parseInt(user.id, 10),
      });

      res.status(200).send(products);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.get(
  "/my_products",
  passport.authenticate("jwt", { session: false }),
  async ({ user }, res) => {
    try {
      const products = await getMyProducts({ userId: user.id });

      if (products.code === RESULT_CODES.USER_NOT_FOUND) {
        return res.status(404).send(products);
      }

      res.status(200).send(products);
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.get(
  "/filter/:param",
  passport.authenticate("jwt", { session: false }),
  async (_, res) => {
    try {
      const product = await getProductByFilter();

      res.status(200).send({ product });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async ({ body, params, user }, res) => {
    try {
      const product = await updateProduct({
        ...body,
        id: parseInt(params.id, 10),
        userId: parseInt(user.id, 10),
      });

      if (product.code[RESULT_CODES.PRODUCT_NOT_FOUND]) {
        res.status(404).send({ product })
      }

      res.status(200).send({ product });
    } catch (error) {
      res.json({ error: error.message });
    }
  }
);

module.exports = router;
