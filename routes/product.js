const { Router } = require("express");

const { 
  productValidator, 
  postProductValidator, 
  putProductValidator, 
  deleteProductValidator 
} = require("../middlewares");

const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = Router();

// Public
router.get("/", getProducts);
router.get("/:id", [productValidator], getProductById);

// Any user with have a valid token
router.post("/", [postProductValidator], createProduct);
router.patch("/:id", [putProductValidator], updateProduct);

// Only admin user with have a valid token
router.delete("/:id", [deleteProductValidator], deleteProduct);

module.exports = router;
