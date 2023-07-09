const { request, response } = require("express");

const isAdmin = (req = request, res = response, next) => {

  if(!req.userAuth) 
    return res.status(500).json({
      mgs: 'No se puede validar el rol sin generar un token válido'
    })
    
  const {rol, name} = req.userAuth;
  
  if(rol !== 'ADMIN_ROLE') 
    return res.status(401).json({
      msg: `El usuario ${name} no tiene permisos de administrador`
    })

  next();
}

const hasRole = (...roles) => {
  return (req, res = response, next) => {

    if(!req.userAuth) 
      return res.status(500).json({
        mgs: 'NO se puede validar el rol sin generar un token válido'
      })

    if(!roles.includes(req.userAuth.rol))
      return res.status(401).json({
        msg: `La acción requerida necesita uno de estos roles ${roles}`
      })

    next();
  }
}

module.exports = {
  isAdmin,
  hasRole
}