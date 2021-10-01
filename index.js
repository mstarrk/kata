const fastify = require("fastify")({ logger: true });
const PORT = process.env.PORT || 5000;

fastify.get("/", (req, reply) => {
  reply.sendFile("index.html");
});

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
