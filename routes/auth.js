const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validateFields } = require("../middlewares/user-validate");

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').trim().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ], 
  login
)


module.exports = router;