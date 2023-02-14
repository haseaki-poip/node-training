import express from "express";
import WebSocket from "ws";

const app: express.Express = express();
const wss = new WebSocket.Server({ port: 8001 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ws.send("send message");
  });
  ws.send("connecting");
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("ポート8000番で起動しました。");
});
