import express, { Request, Response } from "express";
import { wss, CLIENTS } from "../../index";
import WebSocket from "ws";
import crypto from "crypto";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {
  try {
    const roomId = crypto.randomUUID();
    const userName: string = req.body.userName;

    CLIENTS[roomId] = [
      {
        userName: userName,
      },
    ];

    const response = {
      roomId: roomId,
    };
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
});

router.post("/join", (req: Request, res: Response) => {
  try {
    const response = {
      message: "join room",
    };

    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send("post", { binary: false });
      }
    }

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
