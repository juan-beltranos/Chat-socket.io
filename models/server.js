//Servidor express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.server = http.createServer(this.app);

    //configuracion del socket server
    this.io = socketio(this.server, {});
  }

  middleware() {
    //Desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
  }

  configurarSockets() {
    new Sockets (this.io);
  }

  execute() {
    this.middleware();

    this.configurarSockets();

    this.server.listen(this.port, () => {
      console.log("server puerto", this.port);
    });
  }
}

module.exports = Server;
