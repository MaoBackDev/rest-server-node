const {Category} = require("../models");

const getCategories = async (req, res) => {

  // Pagination: get query parameters 
  const {limit = 10, from = 0} =req.query;
  const query = {status: true}; 

  try {
     // Promise
    const [total, categories] = await Promise.all([
      Category.countDocuments(query),
      Category.find(query)
        .populate('user', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ])

    res.status(200).json({
      total,
      categories
    });

  } catch (error) {
    res.status(500).json({msg: 'Error del servidor'})
  }
};

const getCategoryById = async (req, res) => {
  try {
    const {id} = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.status(200).json({category});

  } catch (error) {
    res.status(500).json({msg: 'Error del servidor'})
  }
};

const createCategory = async (req, res) => {
  const name = req.body.name.toUpperCase();

  try {
    const categoryDB = await Category.findOne({name});

    if(categoryDB) 
      return res.status(400).json({
        msg: `La categoría ${categoryDB.name} ya existe!`
      })
 
    // Generate data to save
    const data = {
      name,
      user: req.userAuth._id
    }
    const category = new Category(data);
    await category.save();

    res.status(201).json({
      msg: "Category created",
      category
    });
    
  } catch (error) {
    res.status(500).json({msg: 'Error del servidor'})
  }
};

const updateCategory = async (req, res) => {
  const {id} = req.params;
  const {status, user, ...data} = req.body;

  data.name = data.name.toUpperCase();
  data.user = req.userAuth._id;
  
  try {
    const category = await Category.findByIdAndUpdate(id, data, {new: true})
    .populate('user', 'name');

    res.status(200).json({ category });

  } catch (error) {
    res.status(500).json({msg: 'Error del servidor'})
  }
};

const deleteCategory = async (req, res) => {
  const {id} = req.params;

  try {
    const category = await Category.findByIdAndUpdate(id, {status: false}); 
    res.status(200).json(category );

  } catch (error) {
    res.status(500).json({msg: 'Error del servidor'})
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
