const { Schema, model } = require("mongoose");

const roleSchema = new Schema({
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio']
  }
})

module.exports = model('Role', roleSchema);