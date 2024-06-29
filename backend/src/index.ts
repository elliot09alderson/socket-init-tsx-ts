import WebSocket, { WebSocketServer } from "ws";
import http from "http";

/* -------------------------- create a http server -------------------------- */
const server = http.createServer((req: any, res: any) => {
  console.log(new Date() + "Recieved request for " + req.url);
  res.end("hiii");
});
/* ------------------------ create a websocket server ----------------------- */
const wss = new WebSocketServer({ server });

let userCount = 0;
wss.on("connection", (socket) => { 
  socket.on("error", console.error);
  // socket instance
  socket.on("message", (data, isBinary) => {
    //on message event
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
  console.log("no of connected users ", ++userCount);
  socket.send("Hleoo message from sever");
});

/* -------------------------- listen to the server -------------------------- */
server.listen(8080, function () {
  console.log(new Date(), "Server is listening on port 8080");
});
