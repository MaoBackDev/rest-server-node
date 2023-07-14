const { Router } = require("express");
const { login, googleSignIn } = require("../controllers/auth");
const { loginvalidator, googlevalidator } = require("../middlewares");

const router = Router();

router.post('/login', [loginvalidator], login);

// Inicio de sesión con google
router.post('/google', [googlevalidator], googleSignIn);


module.exports = router;