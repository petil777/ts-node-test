import "./LoadEnv"; // Must be the first import
import { Server } from "@server";
import logger from "@shared/Logger";

// Start the server
const port = Number(process.env.PORT || 3000);
new Server().start().then(server => {
  server.listen(port, () => {
    logger.info("Express server started on port : " + port);
  });
  server.on("error", (error: any) => {
    if (error.syscall !== "listen") {
      throw error;
    }
    switch (error.code) {
      case "EACCES":
        console.error("Port requires elevated privileges");
        process.exit(1);
        break;
      case "EADDRINUSE":
        console.error("port is already in use");
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
  server.on("listening", () => {
    console.log(
      "server is running in process " +
        process.pid +
        " listening on port " +
        port +
        " \n"
    );
  });
});
// app.listen(port, () => {
//     logger.info('Express server started on port: ' + port);
// });
