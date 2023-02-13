import express from "express";
const app: express.Express = express();

app.get("/", (req: express.Request, res: express.Response) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("ポート8000番で起動しました。");
});
