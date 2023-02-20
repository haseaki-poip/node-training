import express, { Request, Response } from "express";
import { wss } from "../../index";
import WebSocket from "ws";

const router = express.Router();

router.post("/join", (req: Request, res: Response) => {
  try {
    const response = {
      message: "join room",
    };

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        console.log("a");
        client.send("post", { binary: false });
      }
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
