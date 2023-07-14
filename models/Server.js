const express = require("express");
const cors = require("cors");
const { connectDB } = require("../database/config");

class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth : "/api/auth",
      categories : "/api/categories",
      users : "/api/users",
      products : "/api/products",
    }
   

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
    this.app.get('/', (req, res) => res.send('Welcome to Coffe Shopp'));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categories, require("../routes/category"));
    this.app.use(this.paths.users, require("../routes/user"));
    this.app.use(this.paths.products, require("../routes/product"));
  }

  listen() {
    this.app.listen(this.port, () =>
      console.log(`Server running on port ${this.port}`)
    );
  }
}

module.exports = Server;
