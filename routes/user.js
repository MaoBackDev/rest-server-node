const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const { check } = require("express-validator");
const { userValidation } = require("../middlewares/user-validate");
const Role = require("../models/role");
const { rolIsValid, isEmail, userByIdExist } = require("../helpers/db-validators");
const router = Router();

router.get("/", getUsers);

router.post("/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo no es válido!').trim().isEmail().normalizeEmail(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    check('email').custom(isEmail),
    check('rol').custom(rolIsValid),
    userValidation
  ], 
  createUser
);

router.put("/:id", [
    check('id', 'No es un id válido').isMongoId(),
    check('rol').custom(rolIsValid),
    check('id').custom(userByIdExist),
    userValidation
  ], 
  updateUser
);

router.delete("/:id",[
  check('id', 'No es un id válido').isMongoId(),
  check('id').custom(userByIdExist),
  userValidation
],
 deleteUser);

module.exports = router;
