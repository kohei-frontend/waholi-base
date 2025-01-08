import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    console.log("req", req);
  if (req.method === 'GET') {
    try {
      // Prismaを使用してデータを取得
      const posts = await prisma.post.findMany();
      return res.status(200).json(posts);
    } catch (error) {
      console.error('Prisma error:', error);
      return res.status(500).json({ error: 'データの取得に失敗しました。' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}