import express from "express";
import WebSocket from "ws";
import url from "url";
import roomRouter from "./routes/api/room";

const app: express.Express = express();
app.use(express.json());
const wss = new WebSocket.Server({ port: 8001 });

wss.on("connection", (ws, req) => {
  // const {
  //   query: { uid },
  // } = url.parse(req.url, true);
  // wss.uid = uid;

  ws.on("message", (message) => {
    console.log("received: %s", message);
    for (const client of wss.clients) {
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

app.listen(8000, () => {
  console.log("ポート8000番で起動しました。");
});
