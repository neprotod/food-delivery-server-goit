const Register = require("./src/handler/register");

const server = require("./src/server");
const config = require("./config");

server.start(config.port);