require("dotenv").config();
const Validator = require("./controllers/classes/Validator");
const fastify = require("fastify")({ logger: false });
const path = require("path");
const PORT = process.env.PORT;

// IPC client

console.log("Starting client");

const { Socket } = require("net");
const socket = Socket({});

const HANDLE = "/tmp/some-file.sock";

socket.on("error", (err) => console.log(err));
socket.on("connect", () => {
  console.log("Connect");
});
socket.on("data", (data) => {
  console.log(data);
  socket.write(data);
  socket.end();
});

// Plugins

fastify.register(require("fastify-formbody"));

fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

// Declare a route
fastify.get("/", function (request, reply) {
  reply.sendFile("index.html");
});

fastify.post("/kata", function (request, reply) {
  const { key } = request.body;

  if (!Validator.validateKey(key)) {
    reply.sendFile("error.html");
    return;
  }

  socket.connect(HANDLE);
  reply.sendFile("kata.html");
});

fastify.post("/setStatus", function (request, reply) {
  const { status } = request.body;

  if (!status) {
    reply.sendFile("error.html");
    return;
  }

  socket.write(status);

  reply.sendFile("kata.html");
});

fastify.post("/newMessage", function (request, reply) {
  const { message, channel } = request.body;

  if (!message) {
    reply.sendFile("error.html");
    return;
  }

  const channelId = "741117636150034463";

  const data = { message: message, channel: channelId };

  socket.write(JSON.stringify(data));

  reply.sendFile("kata.html");
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