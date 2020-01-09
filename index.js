const SERVER_IP = "";

// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true
});
fastify.register(require("fastify-cors"), {
  origin: SERVER_IP
});

fastify.get("/cuit/:id", async (request, reply) => {
  try {
    if (isNaN(request.params.id)) {
      return { message: "CUIT/CUIL deben ser numeros" };
    }
    const result = await getCuitInfo(request.params.id);
    return reply.send(result.personaReturn);
  } catch (error) {
    console.log(error);
    if (error.extra.fault.faultstring === "No existe persona con ese Id") {
      return { message: "CUIT/CUIL inexistente" };
    }
    return error;
  }
});

// Run the server!
fastify.listen(LISTENING_PORT, (err, address) => {
  if (err) throw err;
  fastify.log.info(`server listening on ${address}`);
});
