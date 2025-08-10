const mongoose = require('mongoose');
const colors = require('colors');

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.log('DB Error', error.message.bgRed);
  }
};

module.exports = connectDb;
