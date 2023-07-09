const express = require("express");
const cors = require("cors");
const { connectDB } = require("../database/config");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/users";

    // Connection database
    this.connectionDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectionDB() {
    await connectDB();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Welcome to Coffe Shopp');
      // res.sendFile(__dirname + 'index.html');
    })
    this.app.use(this.usersPath, require("../routes/user"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

module.exports = Server;
