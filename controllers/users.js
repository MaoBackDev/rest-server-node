const { response } = require("express");
const User  = require('../models/user');
const bcrypt = require('bcryptjs');

const getUsers = async (req, res = response) => {
  const { limit = 10, from = 0 } = req.query;
  const query = {status: true};

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query)
      .skip(Number(from))
      .limit(Number(limit))
  ])

  res.json({ total, users });
};

const createUser = async (req, res = response) => {

  const {name, password, email, rol} = req.body;
  const user = new User({name, password, email, rol});

  // Encriptar password
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  try {
    const newUser = await user.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const updateUser = async(req, res = response) => {
  const { id } = req.params; 
  const {_id, password, create_at_google, email, ...rest} = req.body;
  
  if(password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, rest);
  res.send({
    user
  });
};

const deleteUser =  async (req, res = response) => {
  const { id } = req.params;

  // Eliminar registro fisicamente de la base de datos
  // const deleted = await User.findByIdAndDelete(id); 

  // Eliminar registro anulando el estado del usuario -> RECOMENDADO
  const deleted = await User.findByIdAndUpdate(id, {status: false}); 
  
  res.json({
    deleted
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
