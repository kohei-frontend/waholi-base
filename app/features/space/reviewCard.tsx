import { Card, Rating, Avatar, Button, Pill } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import FormattedDate from "@/app/_components/FormattedDate";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import { ImageData, Facility, FacilityType } from "@/app/types";

// ImageSliderコンポーネントの作成
const ImageSlider = ({ images }: { images: ImageData[] }) => (
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

const Review = ({
	post,
	facilityType,
}: {
	post: Facility["posts"][number];
	facilityType: FacilityType;
}) => {
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

			{facilityType === "WORKPLACE" && (
				<>
					<div className="mb-2 flex items-center gap-2">
						<Rating value={post.workplace?.rating} fractions={2} readOnly />
						<span className="text-sm text-gray-600 ml-2">
							<FormattedDate date={new Date(post.created_at)} />
						</span>
					</div>
					<div className="flex">
						<p>雰囲気:</p>
						<div className="flex gap-2">
							{post.workplace?.atmosphere.map((word, index) => (
								<Pill key={index}>{word}</Pill>
							))}
						</div>
					</div>
					<p>職種？: {post.workplace?.job_category}</p>
					<p>時給: {post.workplace?.wage}ドル</p>
					<p className="mb-4 text-gray-800">{post.workplace?.comment}</p>
				</>
			)}
			{facilityType === "ACCOMMODATION" && (
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
		</Card>
	);
};

const ReviewCard = ({
	posts,
	facilityType,
}: {
	posts: Facility["posts"];
	facilityType: FacilityType;
}) => {
	if (!posts.length) {
		return <div>投稿がありません。</div>;
	}

	return (
		<>
			{posts.map((post, index) => (
				<Review key={index} post={post} facilityType={facilityType} />
			))}
		</>
	);
};

export default ReviewCard;
