const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if(!token) return res.status(401).json({
    msg: 'Token no existe'
  })

  try {
    const {uid} = jwt.verify(token, process.env.SECRET_OR_PRIVETE_KEY);
    const user = await User.findById(uid);

    if(!user) return res.status(401).json({
      msg: 'Token Inválido - El usuario no existe'
    })

    if(!user.status) return res.status(401).json({
      msg: 'Token Inválido - El usuario no está activo'
    })

    req.userAuth = user;
    next();
    
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      msg: 'Token Inválido'
    }) 
  }
}

module.exports = {
  validateJWT
}