import { RequestHandler, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { DecodedData } from "../models/user";
dotenv.config({ path: __dirname + "/../../.env" });

interface ExtendedRequest extends Request {
  info?: DecodedData;
}

export function VerifyToken(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    if (!token) {
      return res.status(401).json({ error: "Forbidden" });
    }
    const Payloadata = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as DecodedData;
    req.info = Payloadata;
  } catch (error: any) {
    res.status(403).json(error.message);
  }
  next();
}
