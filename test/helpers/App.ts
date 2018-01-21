import App from '../../src/App';
import * as http from "http";
import * as debug from "debug";
import { ContainerRepository, TruckRepository } from '../../src/data';
import { BeerRepository } from '../../src/data/BeerRepository';

function normalizePort(val: number | string): number | string | boolean {
  let port: number = (typeof val === "string") ? parseInt(val, 10) : val;
  if (isNaN(port)) return val;
  else if (port >= 0) return port;
  else return false;
}

const port = normalizePort(9999);
App.set("port", port);

let server = null;
let serverError = null;
export default {
  url: 'http://localhost:9999',
  clearDatabase: async () => {
    await new TruckRepository().clear();
    await new ContainerRepository().clear();
    await new BeerRepository().clear();
  },
  start: async () => {
    if (server == null) {
      return new Promise((resolve, reject) => {
        server = http.createServer(App);
        server.listen(port);
        server.on("error", (error: NodeJS.ErrnoException) => {
          serverError = error;
          reject(error);
        });
        server.on("listening", () => {
          resolve();
        });
      });
    } else {
      return new Promise((resolve, reject) => {
        if (serverError) {
          reject(serverError);
        } else {
          resolve();
        }
      });
    }
  }
}