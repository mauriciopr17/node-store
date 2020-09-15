"use strict";

//importar o pacote app da outra pasta (export)
const app = require("../src/app");

//const debug = require("debug")("nodestore:server");
const debug = require("debug")("nodestore:server");

// require -> importar pacotes
const http = require("http");

const port = normalizePort(process.env.PORT || "3000"); //verificar porta livre para rodar minha aplicação
app.set("port", port);

//criando o servidor
const server = http.createServer(app);

//fazendo o servidor ficar "ouvindo a porta do projeto"
server.listen(port);
server.on("error", onError);
server.on("listening", onLinstening);

console.log("API rodando na porta " + port);

//normalizando a porta
function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACESS":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

//adicionando o debug
function onLinstening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
