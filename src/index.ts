import * as http from "http";

import App from "./App";

const port = normalizePort(process.env.PORT || 3000);
App.set("port", port);

const server = http.createServer(App);
server.listen(port);
server.on("error", onError);

function normalizePort(val: number | string): number | string | boolean {
  const portNormalized: number = (typeof val === "string") ? parseInt(val, 10) : val;
  if (isNaN(portNormalized)) {
    return val;
  } else if (portNormalized >= 0) {
    return portNormalized;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = (typeof port === "string") ? "Pipe " + port : "Port " + port;
  switch (error.code) {
    case "EACCES":
      process.exit(1);
      break;
    case "EADDRINUSE":
      process.exit(1);
      break;
    default:
      throw error;
  }
}
