import express from "express";
import WebSocket from "ws";
import url from "url";
import roomRouter from "./routes/api/room";
import http from "http";

const app: express.Express = express();
app.use(express.json());
const httpServer = http.createServer(app);
const wss = new WebSocket.Server({ server: httpServer }); // {server:httpServer}によってexpressと同じポートを使用できる

wss.on("connection", (ws, req) => {
  const url_parse = url.parse(req.url!, true);
  // console.log(ws);

  ws.on("message", (message) => {
    console.log("received: %s", message);

    // wssが接続中のすべてのwsを参照
    for (const client of wss.clients) {
      console.log(client);

      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: false });
      }
    }
  });
  ws.send("connecting");

  ws.on("close", () => {
    console.log("ブラウザを閉じました");
  });
});

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.use("/api/room", roomRouter);

// app.listen(8000, () => {
//   console.log("ポート8000番で起動しました。");
// });
httpServer.listen(8000, () => {
  console.log("ポート8000番で起動しました。");
});
