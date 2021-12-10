const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const dbConnector = () =>
  mongoose
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(i => i)
    .catch(err => console.log(err));

module.exports = fp(dbConnector);
