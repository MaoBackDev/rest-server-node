const { check } = require("express-validator");
const {
  productExist,
  categoryExist,
  isEmail,
  rolIsValid,
  userByIdExist,
} = require("../helpers/db-validators");
const { validatExpress } = require("./validate-express");
const { validateJWT } = require("./validateJWT");
const { isAdmin, hasRole } = require("./validate-roles");

// PRODUCT VALIDATOR
const productValidator = [
  check("id", "El id no es permitido").isMongoId(),
  check("id").custom(productExist),
  validatExpress,
];

const postProductValidator = [
  validateJWT,
  check("name", "El nombre de la categoría es obligatorio")
    .trim()
    .not()
    .isEmpty(),
  check("category", "Debe ser un id mongo válido").isMongoId(),
  check("category").custom(categoryExist),
  validatExpress,
];

const putProductValidator = [
  validateJWT,
  check("id").custom(productExist),
  validatExpress,
];

const deleteProductValidator = [
  validateJWT,
  isAdmin,
  check("id", "El id no es permitido").isMongoId(),
  check("id").custom(productExist),
  validatExpress,
];

// AUTH VALIDATOR
const loginvalidator = [
  check("email", "El correo es obligatorio").trim().isEmail().normalizeEmail(),
  check("password", "La contraseña es obligatoria").not().isEmpty(),
  validatExpress,
];

const googlevalidator = [
  check("id_token", "Debes proveer un token").not().isEmpty(),
  validatExpress,
];

// CATEGORY VALIDATOR
const categoryValidator = [
  check("id", "El id no es permitido").isMongoId(),
  check("id").custom(categoryExist),
  validatExpress,
];

const postCategoryValidator = [
  validateJWT,
  check("name", "El nombre de la categoría es obligatorio")
    .trim()
    .not()
    .isEmpty(),
  validatExpress,
];

const putCategoryValidator = [
  validateJWT,
  check("name", "El nombre de la categoría es obligatorio")
    .trim()
    .not()
    .isEmpty(),
  check("id", "El id no es permitido").isMongoId(),
  check("id").custom(categoryExist),
  validatExpress,
];

const deleteCategoryValidator = [
  validateJWT,
  isAdmin,
  check("id", "El id no es permitido").isMongoId(),
  check("id").custom(categoryExist),
  validatExpress,
];

// USER VALIDATOR
const postUserValidator = [
  check("name", "El nombre es obligatorio").not().isEmpty(),
  check("email", "El correo no es válido!").trim().isEmail().normalizeEmail(),
  check("password", "El password debe contener al menos 6 caracteres").isLength({ min: 6 }),
  check("email").custom(isEmail),
  check("rol").custom(rolIsValid),
  validatExpress,
];

const putUserValidator = [
  check("id", "No es un id válido").isMongoId(),
  check("rol").custom(rolIsValid),
  check("id").custom(userByIdExist),
  validatExpress,
];

const deleteUserValidator = [
  validateJWT,
  hasRole("USER_ROLE", "SELLER_ROLE"),
  check("id", "No es un id válido").isMongoId(),
  check("id").custom(userByIdExist),
  validatExpress,
];

module.exports = {
  productValidator,
  postProductValidator,
  putProductValidator,
  deleteProductValidator,
  loginvalidator,
  googlevalidator,
  categoryValidator,
  postCategoryValidator,
  putCategoryValidator,
  deleteCategoryValidator,
  postUserValidator,
  putUserValidator,
  deleteUserValidator,
};
