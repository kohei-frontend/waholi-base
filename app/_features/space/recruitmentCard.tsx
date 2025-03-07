import { Card, Avatar } from "@mantine/core";
import FormattedDate from "@/app/_components/FormattedDate";
import { Facility } from "@/app/types";

const Recruitment = ({ post }: { post: Facility["posts"][number] }) => {
	const avatar = "M";
	return (
		<Card className="max-w-xl mx-auto p-4 shadow-sm">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center gap-3">
					<Avatar color="blue" radius="xl" className="text-white">
						{avatar}
					</Avatar>
					<div>
						<h3 className="font-medium">{post.user_id}</h3>
						<FormattedDate date={new Date(post.created_at)} />
					</div>
				</div>
			</div>
			<p>職種？: {post.workplace?.job_category}</p>
			<p>時給: {post.workplace?.wage}ドル</p>
			<p className="mb-4 text-gray-800">{post.workplace?.comment}</p>
		</Card>
	);
};

const RecruitmentCard = ({ posts }: { posts: Facility["posts"] }) => {
	if (!posts.length) {
		return <div>募集情報がありません。</div>;
	}

	return (
		<>
			{posts.map((post, index) => (
				<Recruitment key={index} post={post} />
			))}
		</>
	);
};

export default RecruitmentCard;
