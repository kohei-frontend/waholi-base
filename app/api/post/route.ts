import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  console.log("req", req);
  try {
    // Prismaを使用してデータを取得
    const posts = await prisma.post.findMany();
    return Response.json(posts, { status: 200 });
  } catch (error) {
    console.error('Prisma error:', error);
    return Response.json({ error: 'データの取得に失敗しました。' }, { status: 500 });
  }
};