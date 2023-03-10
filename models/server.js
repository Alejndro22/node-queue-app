import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { socketController } from '../sockets/controller.js';

class ServerApp {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer);

    this.paths = {};

    // Middlewares
    this.middlewares();

    // Rutas de mi app
    this.routes();

    // Sockets
    this.sockets();
  }

  middlewares() {
    // CORS
    this.app.use(cors());

    // Directorio público
    this.app.use(express.static('public'));
  }

  routes() {
    // this.app.use(this.paths.auth, authRouter);
  }

  sockets() {
    this.io.on('connection', socketController);
  }

  listen() {
    this.httpServer.listen(this.port, () => {
      console.log('Server running on port', this.port);
    });
  }
}

export default ServerApp;
