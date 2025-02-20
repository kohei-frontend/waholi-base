"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TextInput, Tabs, Button, Rating, Card, Avatar, Pill } from "@mantine/core";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faSearch,
	faTimes,
	faBookmark,
	faShareAlt,
	faMapMarkerAlt,
	faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { fetchFacilityById } from "@/app/lib/api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import FormattedDate from "@/app/_components/FormattedDate";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { Facility } from "@/app/types";

export default function Page() {
	const pathname = usePathname();
	const space_id = pathname.split("/").pop(); // URLからspace_idを取得
	const [facilityData, setFacilityData] = useState<Facility>();
	const [activeTab, setActiveTab] = useState("overview");

	useEffect(() => {
		if (!space_id) return;

		const fetchData = async () => {
			try {
				const data = await fetchFacilityById(space_id);
				setFacilityData(data);
			} catch (error) {
				console.error("Failed to fetch facility data", error);
			}
		};

		fetchData();
	}, [space_id]);

	if (!facilityData) {
		return <div>Loading...</div>;
	}

	const Post = ({
		post,
		facilityData,
	}: {
		post: Facility["posts"][number];
		facilityData: Facility;
	}) => {
		const { type } = facilityData;
		const avatar = "M";

		return (
			<Card className="max-w-xl mx-auto p-4 shadow-sm">
				<div className="flex items-start justify-between mb-4">
					<div className="flex items-center gap-3">
						<Avatar color="green" radius="xl" className="text-white">
							{avatar}
						</Avatar>
						<div>
							<h3 className="font-medium">{post.user_id}</h3>
						</div>
					</div>
				</div>

				{type === "WORKPLACE" && (
					<>
						<div className="mb-2 flex items-center gap-2">
							<Rating value={post.workplace?.rating} fractions={2} readOnly />
							<span className="text-sm text-gray-600 ml-2">
								<FormattedDate date={new Date(post.created_at)} />
							</span>
						</div>
						<p>雰囲気:</p>
						<div className="flex gap-2">
							{post.workplace?.atmosphere.map((word, index) => (
								<Pill key={index}>{word}</Pill>
							))}
						</div>
						<p>時給: {post.workplace?.wage}ドル</p>
						<p className="mb-4 text-gray-800">{post.workplace?.comment}</p>
					</>
				)}
				{type === "ACCOMMODATION" && (
					<>
						<div className="mb-2 flex items-center gap-2">
							<Rating value={post.accommodation?.rating} fractions={2} readOnly />
							<FormattedDate date={new Date(post.created_at)} />
						</div>
						<p>設備: {post.accommodation?.setup}</p>
						<p>レント: {post.accommodation?.rent}ドル/週</p>
						<p className="mb-4 text-gray-800">{post.accommodation?.comment}</p>
					</>
				)}

				<ImageSlider images={post.images} />
				<div className="grid grid-cols-5 gap-4 p-4">
					<Button
						variant="subtle"
						className="flex flex-col items-center"
						leftSection={
							<FontAwesomeIcon icon={faBookmark} className="text-indigo-600" />
						}
					>
						<span className="text-xs mt-1">イイね</span>
					</Button>
					<Button
						variant="subtle"
						className="flex flex-col items-center"
						leftSection={
							<FontAwesomeIcon icon={faShareAlt} className="text-indigo-600" />
						}
					>
						<span className="text-xs mt-1">共有</span>
					</Button>
				</div>
			</Card>
		);
	};

	// ImageSliderコンポーネントの作成
	const ImageSlider = ({ images }: { images: any[] }) => (
		<Swiper
			modules={[Navigation, Pagination, EffectFade]}
			slidesPerView={1}
			loop={true}
			effect="fade"
			navigation
			pagination
			style={{ width: "100%", height: "auto" }}
		>
			{images.map((image, index) => (
				<SwiperSlide key={index}>
					<div className="aspect-square">
						<Image
							src={image.url}
							alt={`Review image ${index + 1}`}
							className="w-full h-full object-cover rounded-lg"
							width={600}
							height={600}
							quality={50}
							priority={true}
						/>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);

	// PostsCardコンポーネントの更新
	const PostsCard = ({ facilityData }: { facilityData: Facility }) => {
		if (!facilityData) {
			return <div>投稿がありません。</div>;
		}

		return (
			<>
				{facilityData.posts.map((post, index) => (
					<Post key={index} post={post} facilityData={facilityData} />
				))}
			</>
		);
	};

	return (
		<div className="max-w-2xl mx-auto bg-white">
			{/* Search Bar */}
			<div className="relative p-4 border-b">
				<TextInput
					placeholder={facilityData.name || "Lune Croissanterie Armadale"}
					leftSection={<FontAwesomeIcon icon={faSearch} className="text-gray-400" />}
					rightSection={<FontAwesomeIcon icon={faTimes} className="text-gray-400" />}
					className="w-full"
				/>
			</div>

			{/* Main Image */}
			<div className="relative h-96">
				<Image
					src={facilityData.posts[0].images[0].url}
					alt="Store front"
					fill
					className="object-cover"
				/>
			</div>

			{/* Business Info */}
			<div className="p-4">
				<h1 className="text-2xl font-semibold">{facilityData.name}</h1>
				<div className="flex items-center gap-2 mt-2">
					<span className="text-lg">{facilityData.posts[0].workplace?.rating}</span>
					<Rating
						value={facilityData.posts[0].workplace?.rating}
						fractions={2}
						readOnly
					/>
					<span className="text-gray-600">({facilityData.posts.length})</span>
				</div>
			</div>

			{/* Tabs */}
			<Tabs value={activeTab} onChange={(value) => setActiveTab(value as string)}>
				<Tabs.List className="border-b">
					<Tabs.Tab value="overview">概要</Tabs.Tab>
					<Tabs.Tab value="reviews">クチコミ</Tabs.Tab>
					<Tabs.Tab value="info">募集情報</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="overview">
					<div className="grid grid-cols-5 gap-4 p-4 border-b">
						<Button
							variant="subtle"
							className="flex flex-col items-center"
							leftSection={
								<FontAwesomeIcon icon={faBookmark} className="text-indigo-600" />
							}
						>
							<span className="text-xs mt-1">イイね</span>
						</Button>
						<Button
							variant="subtle"
							className="flex flex-col items-center"
							leftSection={
								<FontAwesomeIcon icon={faShareAlt} className="text-indigo-600" />
							}
						>
							<span className="text-xs mt-1">共有</span>
						</Button>
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
				</Tabs.Panel>

				<Tabs.Panel value="reviews">
					<div className="p-4">
						<PostsCard facilityData={facilityData} />
					</div>
				</Tabs.Panel>

				<Tabs.Panel value="info">
					<div className="p-4">
						<p>{"募集情報がここに表示されます。"}</p>
						{/* <p>{facilityData.recruitmentInfo}</p> */}
					</div>
				</Tabs.Panel>
			</Tabs>
		</div>
	);
}
