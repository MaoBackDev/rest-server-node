const {response} = require('express');
const {ObjectId} = require('mongoose').Types;

const { User, Category, Product } = require('../models')


const allowCollections = [
  'categories',
  'products',
  'products-by-category',
  'roles',
  'users'
]

// function eliminarDiacriticos(texto) {
//   return texto.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
// }


// Función que permite la búsqueda de un usario por su id o por nombre
const searchUser = async(item = '', res = response) => {

  const isValidId = ObjectId.isValid(item) // validar que el id sea un mongo id

  if(isValidId) {
    const user = await User.findById(item);
    return res.status(200).json({
      results: (user) ? [user] : []
    });
  }

  const regex = new RegExp(item, 'i');

  const users = await User.find({
    $or: [{name: regex}, {email: regex}], 
    $and: [{status: true}]
  });

  res.status(200).json({
    results: {
      total: users.length,
      users
    }
  });
}


// Función que permite la búsqueda de un usario por su id o por nombre
const searchCategory = async(item = '', res = response) => {

  const isValidId = ObjectId.isValid(item) // validar que el id sea un mongo id

  if(isValidId) {
    const category = await Category.findById(item).populate('user', 'name');

    return res.status(200).json({
      results: (category) ? [category] : []
    });
  }

  const regex = new RegExp(item, 'i');

  const categories = await Category.find({name: regex, status: true}).populate('user', 'name');

  res.status(200).json({
    results: {
      total: categories.length,
      categories
    }
  });
}


// Función que permite la búsqueda de un usario por su id o por nombre
const searchProduct = async(item = '', res = response) => {

  const isValidId = ObjectId.isValid(item) // validar que el id sea un mongo id

  if(isValidId) {
    const product = await Product.findById(item)
                    .populate('user', 'name')
                    .populate('category', 'name')

    return res.status(200).json({
      results: (product) ? [product] : []
    });
  }

  const regex = new RegExp(item, 'i');

  const products = await Product.find({name: regex, status: true})
    .populate('user', 'name')
    .populate('category', 'name');

  res.status(200).json({
    results: {
      total: products.length,
      products
    }
  });
}

const searchProductByCategory = async (item = '', res = response) => {

  const isValidId = ObjectId.isValid(item) // validar que el id sea un mongo id

  if(isValidId) {

    try {
      const category = await Category.findById(item);
      if(!category) return res.status(404).json({msg: 'Category not found!'})

      const products = await Product.find({
        category: item, status: true
      })
      .populate('user', 'name')
      .populate('category', 'name')

      return res.status(200).json({
        results: {
          total: products.length,
          products: (products) ? products : []
        }
      });

    } catch (error) {
      res.status(500).json({msg: 'Error del servidor'})
    }   
  }
  return res.status(400).json({msg: 'No es un id válido!'})
}


const search = (req, res = response) => {

  const {collection, item} = req.params;

  if(!allowCollections.includes(collection)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${allowCollections}`
    })
  }

  switch (collection) {
    case 'users':
      searchUser(item, res);
      break;
    
    case 'products':
      searchProduct(item, res);
      break;

    case 'products-by-category':
      searchProductByCategory(item, res);
      break;

    case 'categories':
      searchCategory(item, res);
      break;

    default:
      res.status(500).json({msg: 'Error del servidor'})
      break;
  }
}

module.exports = {
  search,
  searchProductByCategory
}