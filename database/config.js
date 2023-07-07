const mongoose = require("mongoose");

// Connecction MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI_MONGO);
    console.log("Connect database was Succesfull");
    
  } catch (error) {
    console.log(error)
    throw new Error('Error al momento de conectar con la base de datos');
  }
};

const closeDB = () => {
  mongoose.connection.on('disconnected', () => {
    console.log('Database is disconneccted!!')
  })
}


module.exports = {
  connectDB,
  closeDB
}

