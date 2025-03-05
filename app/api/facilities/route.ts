import { IncludeOptions, MinMax, PostIncludeType, whereCondition } from "@/app/types";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

// 条件設定のヘルパー関数
function setRangeCondition(
	type: string,
	minParam: string | null,
	maxParam: string | null,
	field: string,
	includeOptions: IncludeOptions,
	whereOptions: whereCondition
) {
	if (minParam || maxParam) {
		const conditions: MinMax = {};
		if (minParam) {
			conditions.gte = parseFloat(minParam);
		}
		if (maxParam) {
			conditions.lte = parseFloat(maxParam);
		}
		includeOptions.posts.where[type][field] = conditions;
		whereOptions.posts?.some?.AND?.push({ [type]: { [field]: conditions } });
	}
}

// 新しい条件設定のヘルパー関数
function setCondition(
	type: string,
	param: string | null,
	field: string,
	includeOptions: IncludeOptions,
	whereOptions: whereCondition
) {
	if (param) {
		const value = parseFloat(param);
		includeOptions.posts.where[type][field] = { gte: value };
		whereOptions.posts?.some?.AND?.push({ [type]: { [field]: { gte: value } } });
	}
}

export const GET = async (request: Request) => {
	try {
		const url = new URL(request.url);

		const facilityId = url.searchParams.get("facility_id");
		const countryId = url.searchParams.get("countryId");

		if (facilityId) {
			// 特定のfacility_idに基づいてデータを取得
			const facility = await prisma.facilities.findUnique({
				where: { id: facilityId },
				select: {
					country: true,
					state: true,
					lga: true,
					suburb: true,
					type: true,
					posts: {
						include: {
							images: true,
							workplace: true,
							accommodation: true,
						},
					},
				},
			});
			if (!facility) {
				return NextResponse.json({ error: "Facility not found" }, { status: 404 });
			}

			return NextResponse.json(facility, { status: 200 });
		}

		// countryIdのみが存在する場合、早期リターン
		if (
			countryId &&
			!url.searchParams.get("type") &&
			!url.searchParams.get("wageMin") &&
			!url.searchParams.get("wageMax") &&
			!url.searchParams.get("rentMin") &&
			!url.searchParams.get("rentMax") &&
			!url.searchParams.get("rating")
		) {
			const facilities = await prisma.facilities.findMany({
				where: { country: { id: countryId } },
				select: {
					id: true,
					name: true,
					_count: {
						select: { posts: true },
					},
					country: {
						select: {
							name: true,
						},
					},
					state: true,
					lga: true,
					suburb: true,
					image: true,
				},
			});
			return NextResponse.json(facilities || [], { status: 200 });
		}

		// 既存の条件に基づくデータ取得ロジック
		const type = url.searchParams.get("type");
		const wageMin = url.searchParams.get("wageMin");
		const wageMax = url.searchParams.get("wageMax");
		const rentMin = url.searchParams.get("rentMin");
		const rentMax = url.searchParams.get("rentMax");
		const rating = url.searchParams.get("rating");

		const includeOptions: IncludeOptions = {
			country: true,
			posts: {
				include: {
					images: true,
				},
				where: {},
			},
		};

		const selectOptions = {
			country: true,
			state: true,
			lga: true,
			suburb: true,
			posts: {
				include: {
					images: true,
				},
			},
		};

		const whereOptions: whereCondition = {};

		if (countryId) {
			whereOptions.country = { id: countryId }; // countryIdを条件に追加
		}

		if (type === "WORKPLACE" || type === "ACCOMMODATION") {
			const postType = type.toLowerCase() as PostIncludeType;
			includeOptions.posts.include[postType] = true;
			includeOptions.posts.where[type.toLowerCase()] = {};
			whereOptions.posts = {
				some: {
					AND: [],
				},
			};
			if (type === "WORKPLACE") {
				setRangeCondition(
					type.toLowerCase(),
					wageMin,
					wageMax,
					"wage",
					includeOptions,
					whereOptions
				);
			} else if (type === "ACCOMMODATION") {
				setRangeCondition(
					type.toLowerCase(),
					rentMin,
					rentMax,
					"rent",
					includeOptions,
					whereOptions
				);
			}
			setCondition(type.toLowerCase(), rating, "rating", includeOptions, whereOptions);
		}

		const facilities = await prisma.facilities.findMany({
			where: whereOptions,
			select: selectOptions,
		});

		return NextResponse.json(facilities || [], { status: 200 });
	} catch (error) {
		console.error("Error fetching facilities:", error);
		return NextResponse.json(
			{ error: "Failed to fetch facilities", details: error },
			{ status: 500 }
		);
	}
};
