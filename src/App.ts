import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import Router from './routes';
import fs = require('fs');

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(express.static('public'));
    this.express.use(bodyParser.urlencoded({ extended: false }));
    this.express.use(function (err, req, res, next) {
      if (res.headersSent) {
        return next(err);
      }
      res.status(500);
      res.render('error', { error: err });
    });
  }

  // Configure API endpoints.
  private routes(): void {
    this.express.use('/api/', Router);
    // Create HTML5 routing pattern
    this.express.get(/^(?!(\/api)).*/g, (req, res) => {
      var fileStream = fs.createReadStream('public/index.html');
      fileStream.on('open', function () {
        fileStream.pipe(res);
      });
    });
  }
}

export default new App().express;