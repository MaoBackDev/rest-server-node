const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generateJWT");


const login = async (req, res=response) => {
  const {email, password} = req.body;

  try {
    // Verificar si el email existe
    const user = await User.findOne({email});
    
    if(!user) return res.status(400).json({
      msg: 'Usuario y/o contraseña inválida'
    })

    // Verificar que el usuario esté activo
    if(!user.status) return res.status(400).json({
      msg: 'Usuario y/o contraseña inválida'
    })

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if(!validPassword) return res.status(400).json({
      msg: 'Usuario y/o contraseña inválida'
    })

    // Generar token
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    })
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error_message: 'Ocurrio un error. Por favor contacte al administrador'
    })
  }
}

module.exports = {
  login
}