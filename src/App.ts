import * as bodyParser from "body-parser";
import * as express from "express";
import fs = require("fs");
import * as logger from "morgan";
import * as path from "path";
import Router from "./routes";

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  // Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger("dev"));
    this.express.use(bodyParser.json());
    this.express.use(express.static("public"));
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use("/api/", Router);
    // Create HTML5 routing pattern
    this.express.get("/*", (req, res, next) => {
      if (!/.*\.[a-zA-Z0-9]+$/g.test(req.url)) { // if not a file
        res.sendFile(path.resolve(__dirname, "../public/index.html"));
      } else {
        next();
      }
    });
  }
}

export default new App().express;
