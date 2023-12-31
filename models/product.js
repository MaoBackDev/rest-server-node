const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
  name: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    unique: true
  },
  status: {
    type: Boolean,
    default: true,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  price: {
    type:Number,
    default: 0
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  desc: {
    type: String
  },
  img: {
    type: String
  },
  available: {
    type: Boolean,
    default: true
  }
})

ProductSchema.methods.toJSON = function() {
  const {__v, status, ...data} = this.toObject();
  return data;
}

module.exports = model('Product', ProductSchema)