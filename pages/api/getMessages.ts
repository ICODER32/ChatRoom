// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from '../../redis';
import {Message} from '../../typings'

type Data = {
  message: Message[],
}
type ErrorData={
  body:String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if(req.method !=='GET'){
     res.status(504).json({body:"Not Allowed"})
     return
  }

const messagesRes=await redis.hvals('messages')
const messages:Message[]=messagesRes.map((message)=>JSON.parse(message)).sort((a,b)=>b.createdAt-a.createdAt)
res.status(200).json({messages})
}
