import express from "express";
import WebSocket from "ws";
import roomRouter from "./routes/api/room";

const app: express.Express = express();
app.use(express.json());
const wss = new WebSocket.Server({ port: 8001 });

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);
    ws.send("send message");
  });
  ws.send("connecting");

  ws.on("close", function () {
    console.log("ブラウザを閉じました");
  });
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.use("/api/room", roomRouter);

app.listen(8000, () => {
  console.log("ポート8000番で起動しました。");
});
