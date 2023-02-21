import express from "express";
import WebSocket from "ws";
import url from "url";
import roomRouter from "./routes/api/room";
import http from "http";

const app: express.Express = express();
app.use(express.json());
const httpServer = http.createServer(app);
export const wss = new WebSocket.Server({ server: httpServer }); // {server:httpServer}によってexpressと同じポートを使用できる

type Users = {
  userName: string;
  ws?: WebSocket;
};
type Clients = {
  [roomId: string]: Users[];
};

export const CLIENTS: Clients = {};

wss.on("connection", (ws, req) => {
  const url_parse = url.parse(req.url!, true);

  console.log(CLIENTS);

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
  ws.send(JSON.stringify({ isConnect: true }));

  ws.on("close", () => {
    console.log("ブラウザを閉じました");
  });
});

app.get("/", (req: express.Request, res: express.Response) => {
  for (const client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send("get", { binary: false });
    }
  }
  res.send("Hello World!");
});

app.use("/api/room", roomRouter);

httpServer.listen(8000, () => {
  console.log("ポート8000番で起動しました。");
});
