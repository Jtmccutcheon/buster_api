const fastify = require('fastify')({ logger: true });
const mercurius = require('mercurius');
const helmet = require('fastify-helmet');
const dbConnector = require('./dbConnector');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');
const dotenv = require('dotenv');

dotenv.config();

const whitelist = [
  'http://localhost:3000',
  'https://busterq.herokuapp.com',
  'https://busteranalytics-beta.netlify.app/',
];

fastify.register(dbConnector);
fastify.register(helmet);

fastify.register(require('fastify-cors'), {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (whitelist.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: 'same-origin',
  methods: ['POST'],
});

fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: process.env.NODE_ENV !== 'production',
});

const start = async () => {
  try {
    await fastify.listen(
      { port: process.env.PORT, hostname: process.env.HOSTNAME },
      err => {
        if (err) fastify.log.error(err);
      },
    );
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
