import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const GET = async (request: Request) => {
    try {
        const url = new URL(request.url);
        const type = url.searchParams.get('type');
        const wage = url.searchParams.get('wage');
        const rent = url.searchParams.get('rent');
        const rating = url.searchParams.get('rating');

        const facilities = await prisma.facilities.findMany({
            include: {
                state: true,
                lga: true,
                suburb: true,
                posts: {
                    include: {
                        workplace: type === 'WORKPLACE',
                        accommodation: type === 'ACCOMMODATION',
                        images: true,
                    },
                },
            },
        });

        // 動的条件でフィルタリング
        const filteredFacilities = facilities.map(facility => {
            const filteredPosts = facility.posts.filter(post => {
                let matches = true;

                if (type === 'WORKPLACE' && post.workplace) {
                    if (wage) matches = matches && post.workplace.wage === parseFloat(wage);
                    if (rating) matches = matches && post.workplace.rating === parseFloat(rating);
                } else if (type === 'ACCOMMODATION' && post.accommodation) {
                    if (rent) matches = matches && post.accommodation.rent === parseFloat(rent);
                    if (rating) matches = matches && post.accommodation.rating === parseFloat(rating);
                }

                return matches;
            });

            return { ...facility, posts: filteredPosts };
        }).filter(facility => facility.posts.length > 0);

        return NextResponse.json(filteredFacilities || [], { status: 200 });
    } catch (error) {
        console.error('Error fetching facilities:', error);
        return NextResponse.json({ error: 'Failed to fetch facilities', details: error }, { status: 500 });
    }
};
