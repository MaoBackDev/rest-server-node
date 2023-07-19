const { response } = require("express");
const User = require("../models/user");
const bcryptjs = require('bcryptjs');
const { generateJWT, googleVerify } = require("../helpers");


/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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


const googleSignIn = async (req, res = response) => {

  const { id_token } = req.body;

  try {
    const { name, email, img } = await googleVerify(id_token);

    // Verificar si el email existe
    let user = await User.findOne({ email });
    
    if(!user) {
      const data = {
        name, 
        email,
        password: ':p',
        img,
        rol: 'USER_ROLE',
        create_at_google: true
      }
      user = new User(data);
      await user.save();
    }

    // Verificar que el usuario esté activo
    if(!user.status) return res.status(401).json({
      msg: 'Su cuenta no tiene permiso de ingreso. Por favor hable con el administrador del sistema.'
    })

    // Generar token
    // const token = await generateJWT(user.id);

    res.status(201).json({
      user,
      token
    })

  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'El token no se pudo verificar'
    })
  }
}

module.exports = {
  login,
  googleSignIn
}