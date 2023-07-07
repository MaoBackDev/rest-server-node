const Role = require('../models/role');
const User = require('../models/user');

const rolIsValid = async (rol = '') => {
  const isRole = await Role.findOne({rol});
  if(!isRole) throw new Error(`El rol ${rol} no existe`);
}

const isEmail = async (email = '') => {
  const emailExist = await User.findOne({email});
  if(emailExist) 
    throw new Error('El correo ya está vinculado a otra cuenta');
}

const userByIdExist = async(id) => {
  const isUser = await User.findById(id);
  if(!isUser) 
    throw new Error('No existe un usuario asociado a el id');
}

module.exports = {
  rolIsValid,
  isEmail,
  userByIdExist
}