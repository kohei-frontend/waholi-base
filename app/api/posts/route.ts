import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// GET: 全ての投稿を取得、または特定条件で取得
export const GET = async (req: Request) => {
  const { searchParams } = new URL(req.url);

  const postType = searchParams.get('postType'); // 投稿タイプ（Workplace, Accommodation）
  const state = searchParams.get('state');
  const lga = searchParams.get('lga');
  const suburb = searchParams.get('suburb');
  const userId = searchParams.get('userId');
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortOrder = searchParams.get('sortOrder') === 'asc' ? 'asc' : 'desc';

  try {
    const baseQuery = {
      where: {
        postType: postType || undefined,
        state: state || undefined,
        lga: lga || undefined,
        suburb: suburb || undefined,
        userId: userId || undefined,
        deletedAt: null,
      },
      orderBy: {
        [sortBy]: sortOrder,
      },
      include: {
        user: { select: { nickname: true, profile_image: true } },
        workplace: postType === 'Workplace' ? true : false,
        accommodation: postType === 'Accommodation' ? true : false,
      },
    };

    // Workplaceを含む投稿を取得
    if (postType === 'Workplace') {
      baseQuery['include'] = { ...baseQuery['include'], workplace: true };
    }

    const posts = await prisma.post.findMany(baseQuery);
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts', details: error }, { status: 500 });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { userId, postType, state, lga, suburb, workplace, accommodation } = body;

    if (!userId || !postType || !state || !lga || !suburb) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        userId,
        postType,
        state,
        lga,
        suburb,
        workplace: workplace
          ? {
              create: {
                wage: workplace.wage,
                atmosphere: workplace.atmosphere,
                recommendationLevel: workplace.recommendationLevel,
                comment: workplace.comment,
                urls: workplace.urls,
              },
            }
          : undefined,
        accommodation: accommodation
          ? {
              create: {
                rent: accommodation.rent,
                setup: accommodation.setup,
                recommendationLevel: accommodation.recommendationLevel,
                comment: accommodation.comment,
                urls: accommodation.urls,
              },
            }
          : undefined,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
};