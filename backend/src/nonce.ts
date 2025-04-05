import { RequestHandler } from "express";

export const nonceHandler: RequestHandler = async (req, res) => {
    const nonce = crypto.randomUUID().replace(/-/g, "");
    res.cookie("siwe", nonce, { httpOnly: true });
    res.status(200).json({ nonce });
};
  