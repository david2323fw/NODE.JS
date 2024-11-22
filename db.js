// config/db.js
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Base de datos conectada');
  } catch (err) {
    console.log('Error en la conexión: ', err);
  }
};

module.exports = dbConnect;
