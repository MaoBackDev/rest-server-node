const { Category, Product } = require('../models');
const Role = require('../models/role');
const User = require('../models/user');

const rolIsValid = async (rol = '') => {
  const isRole = await Role.findOne({rol});
  if(!isRole) 
    throw new Error(`El rol ${rol} no existe`);
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

const categoryExist = async(id) => {
  const isCategory = await Category.findById(id);
  if(!isCategory) 
    throw new Error('Categoría no encontrada');
}

const productExist = async(id) => {
  const isProduct = await Product.findById(id);
  if(!isProduct) 
    throw new Error('Producto no encontrado');
}

const allowCollections = (collection = '', collections = []) => {
  const isCollection = collections.includes(collection);

  if(!isCollection) throw new Error(`La colección ${collection} no es permitida ==> ${collections}`);
  return true
}

module.exports = {
  rolIsValid,
  isEmail,
  userByIdExist,
  categoryExist,
  productExist,
  allowCollections
}