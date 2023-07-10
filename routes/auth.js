const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares/user-validate");

const router = Router();

router.post('/login', [
    check('email', 'El correo es obligatorio').trim().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validateFields
  ], 
  login
)

// Inicio de sesión con google
router.post('/google', [
    check('id_token', 'Debes proveer un token').not().isEmpty(),
    validateFields
  ], 
  googleSignIn
)


module.exports = router;