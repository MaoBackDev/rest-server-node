const { response } = require("express");
const bcrypt = require('bcryptjs');
const User  = require('../models/user');

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

  try {
    const user = await User.findByIdAndUpdate(id, {new: rest});
    res.status(200).res.json(user);

  } catch (error) {
    res.status(500).json(error)
  }
  
};

const deleteUser =  async (req, res = response) => {
  const { id } = req.params;

  try {
    const userDeleted = await User.findByIdAndUpdate(id, {status: false}); 
    res.status(200).json(userDeleted );

  } catch (error) {
    res.status(500).json(error)
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
