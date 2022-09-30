import { connectToDatabase } from '../../../util/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const { db, client } = await connectToDatabase();

  if (method === 'GET') {
    console.log('GET request from post index api');

    try {
      const posts = await db.find({}).sort({ timestamp: -1 }).toArray();
      res.status(200).json(posts);
    } catch (error) {
      console.log('error in GET request from post index api');

      console.log(error);

      res.status(500).json([]);
    } finally {
      client.close();
    }
  }

  if (method === 'POST') {
    try {
      const post = await db.insertOne({ ...body, timestamp: new Date() });
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    } finally {
      client.close();
    }
  }
}
