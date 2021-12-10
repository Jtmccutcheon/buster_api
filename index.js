const fastify = require('fastify')({ logger: true });
const mercurius = require('mercurius');
const dbConnector = require('./dbConnector');
const schema = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

fastify.register(dbConnector);
fastify.register(mercurius, {
  schema,
  resolvers,
  graphiql: true,
});

const start = async () => {
  try {
    await fastify.listen(process.env.PORT);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
