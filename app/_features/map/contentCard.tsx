"use client";

import { Card, Text, Badge, Button, Divider } from "@mantine/core";
import Image from "next/image";
import { Facilities } from "@/app/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface ContentsCardProps {
	facilities: Facilities;
}

// SVGアイコンをコンポーネント化
const FavoriteIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		strokeWidth={1.5}
		stroke="currentColor"
		className="w-5 h-5 text-gray-600"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
		/>
	</svg>
);

export default function ContentsCard({
	facilities,
	onFacilityClick,
}: ContentsCardProps & { onFacilityClick: (id: string) => void }) {
	return (
		<div className="flex flex-wrap justify-center gap-4 mt-1">
			{facilities.length ? (
				facilities.map((facility) => (
					<Card
						key={facility.id}
						shadow="sm"
						padding="md"
						radius="lg"
						className="w-64 cursor-pointer transform transition-transform duration-300 hover:scale-105"
						onClick={() => onFacilityClick(facility.id)}
					>
						<Card.Section className="relative">
							<div className="relative">
								<Image
									src={facility.image}
									alt="Modern apartment in Melbourne"
									width={256}
									height={192}
									className="w-64 h-48 object-cover"
								/>
								<Button
									variant="subtle"
									className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 rounded-full p-2"
									aria-label="Add to favorites"
								>
									<FavoriteIcon />
								</Button>
								<Badge
									color={facility.type === "WORKPLACE" ? "blue" : "green"}
									variant="light"
									className="absolute bottom-2 right-2"
								>
									{facility.type}
								</Badge>
							</div>
						</Card.Section>

						<div className="mt-2">
							<Text className="font-bold text-lg text-gray-900">
								{facility.name} ({facility._count?.posts ?? facility.posts.length}{" "}
								posts)
							</Text>
							<Divider my="sm" />
							<div className="flex items-center mt-1">
								<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
								<Text className="text-sm text-gray-500 ml-2">
									{facility.suburb}, {facility.lga} in {facility.state}
								</Text>
							</div>
						</div>
					</Card>
				))
			) : (
				<p>データがありません。</p>
			)}
		</div>
	);
}
