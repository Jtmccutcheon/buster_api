const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = fp(ConnectDB);
