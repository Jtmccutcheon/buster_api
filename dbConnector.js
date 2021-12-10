const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnector = async (fastify, options, done) => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    done();
  } catch (error) {
    console.error(error);
  }
};

module.exports = fp(dbConnector);
