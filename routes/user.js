const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();

// Controllers
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

//Helpers
const { 
  rolIsValid, 
  isEmail, 
  userByIdExist 
} = require("../helpers/db-validators");

// Middlewares
const {
  validateFields,
  validateJWT,
  isAdmin,
  hasRole
} = require('../middlewares')

// Routers
router.get("/", getUsers);

router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido!').trim().isEmail().normalizeEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    check('email').custom(isEmail),
    check('rol').custom(rolIsValid),
    validateFields
  ], 
  createUser
);

router.put("/:id", [
    check('id', 'No es un id válido').isMongoId(),
    check('rol').custom(rolIsValid),
    check('id').custom(userByIdExist),
    validateFields
  ], 
  updateUser
);

router.delete("/:id",[
  validateJWT,
  // isAdmin,
  hasRole('USER_ROLE', 'SELLER_ROLE'),
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(userByIdExist),
  validateFields
  ],
  deleteUser
);

module.exports = router;
