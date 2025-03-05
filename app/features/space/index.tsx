"use client";

import { Tabs, Rating } from "@mantine/core";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faShareFromSquare } from "@fortawesome/free-regular-svg-icons";
import { Facility } from "@/app/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { useState } from "react";
import ReviewCard from "./reviewCard";
import RecruitmentCard from "./recruitmentCard";

const SpaceFeature = ({ facilityData }: { facilityData: Facility }) => {
	const [activeTab, setActiveTab] = useState("reviews");

	// REVIEWとRECRUITMENTに分ける
	const reviewPosts = facilityData.posts
		.filter((post) => post.type === "REVIEW")
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

	const recruitmentPosts = facilityData.posts
		.filter((post) => post.type === "RECRUITMENT")
		.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
	return (
		<>
			{/* Main Image */}
			<div className="relative h-96">
				<Image src={facilityData.image} alt="Store front" fill className="object-cover" />
				<div className="absolute top-0 right-0 flex space-x-4 p-4">
					<button>
						<FontAwesomeIcon icon={faShareFromSquare} size="lg" />
					</button>
					<button>
						<FontAwesomeIcon icon={faHeart} size="lg" />
					</button>
				</div>
			</div>

			{/* Business Info */}
			<div className="flex justify-between p-4">
				<h1 className="text-2xl font-semibold">{facilityData.name}</h1>
				<div className="flex items-center gap-2 mt-2">
					<span className="text-lg">{facilityData?.posts[0]?.workplace?.rating}</span>
					<Rating
						value={facilityData?.posts[0]?.workplace?.rating}
						fractions={2}
						readOnly
					/>
					<span className="text-gray-600">({facilityData.posts.length})</span>
				</div>
			</div>

			{/* Business Details */}
			<div className="p-4 space-y-4">
				<div className="flex items-center gap-2">
					<FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-600" />
					<span>{"835 High St, Armadale VIC 3143"}</span>
					{/* <span>{facilityData.address}</span> */}
				</div>
				<div className="flex items-center gap-2">
					<FontAwesomeIcon icon={faGlobe} className="text-gray-600" />
					<span className="text-blue-600">{"lunecroissanterie.com"}</span>
					{/* <span className="text-blue-600">{facilityData.website}</span> */}
				</div>
			</div>

			{/* Tabs */}
			<Tabs value={activeTab} onChange={(value) => setActiveTab(value as string)}>
				<Tabs.List grow justify="center" className="border-b">
					<Tabs.Tab value="reviews">クチコミ({reviewPosts.length})</Tabs.Tab>
					<Tabs.Tab value="info">募集情報({recruitmentPosts.length})</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="reviews">
					<div className="p-4">
						<ReviewCard posts={reviewPosts} facilityType={facilityData.type} />
					</div>
				</Tabs.Panel>

				<Tabs.Panel value="info">
					<div className="p-4">
						<RecruitmentCard posts={recruitmentPosts} />
					</div>
				</Tabs.Panel>
			</Tabs>
		</>
	);
};

export default SpaceFeature;
