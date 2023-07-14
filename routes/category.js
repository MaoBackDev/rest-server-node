const { Router } = require("express");
const { check } = require("express-validator");

const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");

const { 
  categoryValidator, 
  postCategoryValidator, 
  putCategoryValidator, 
  deleteCategoryValidator 
} = require("../middlewares");

const router = Router();

// Public
router.get("/", getCategories);
router.get("/:id", [categoryValidator], getCategoryById);

// Any user with have a valid token
router.post("/", [postCategoryValidator], createCategory);
router.patch("/:id", [putCategoryValidator], updateCategory);

// Only admin user with have a valid token
router.delete("/:id", [deleteCategoryValidator], deleteCategory);

module.exports = router;
