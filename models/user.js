const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  create_at_google: {
    type: Boolean,
    default: false,
  }
});

// Elmétodo toJson(), permite excluir propiedades de un objeto para que estos no se visualicen
// al momento de realizar una petición web. en este caso específico se excluyen el campo __v y el password
// Se renombra la propiedad _id por uid que es un estandar
userSchema.methods.toJSON = function() {
  const {__v, password, _id, ...user} = this.toObject();
  user.uid = _id;
  return user;
}

module.exports = model("User", userSchema);
