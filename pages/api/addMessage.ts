// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serverPusher } from "../../pusher";
import redis from "../../redis";
import { Message } from "../../typings";

type Data = {
  message: Message;
};
type ErrorData = {
  body: String;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(504).json({ body: "Not Allowed" });
  }
  const { message } = req.body;
  const newMessage = {
    ...message,
    createdAt: Date.now(),
  };
  // push to db
  await redis.hset("messages", message.id, JSON.stringify(newMessage));
  serverPusher.trigger("messages", "new-message", newMessage);
  res.status(200).json({ message: newMessage });
}
