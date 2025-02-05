import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async () => {
  try {
    const locations = await prisma.location.findMany({
      include: {
        posts: {
          include: {
            workplace: true,
            accommodation: true,
            image: true,
          },
        },
      },
    });

    return NextResponse.json(locations, { status: 200 });
  } catch (error) {
    console.error('Error fetching locations:', error);
    return NextResponse.json({ error: 'Failed to fetch locations', details: error }, { status: 500 });
  }
};