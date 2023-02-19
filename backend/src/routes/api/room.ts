import express, { Request, Response } from "express";

const router = express.Router();

router.post("/join", (req: Request, res: Response) => {
  try {
    const response = {
      message: "join room",
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

export default router;
