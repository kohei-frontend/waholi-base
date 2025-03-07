import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEdit, faUsers } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function HowToUse() {
	const steps = [
		{
			icon: faUserPlus,
			title: "アカウント登録【無料】",
			description: "簡単な登録で、すぐに始められます。",
			image: "/home/signup.png",
		},
		{
			icon: faEdit,
			title: "職種別のリアルな情報を投稿",
			description:
				"『飲食』『ファーム』『オフィスワーク』など職種ごとに、過去のワーホリ実体験を共有。",
			image: "/home/post.png",
		},
		{
			icon: faUsers,
			title: "日本人ネットワークを活用して、最適な選択を！",
			description:
				"他の投稿を確認しながら、次の渡航先の情報も同じプラットフォームで簡単に入手。効率よく情報収集しワーホリを充実させよう。",
			image: "/home/connection.png",
		},
	];

	return (
		<section id="how-to-use" className="section white-bg">
			<div className="container">
				<h2 className="section-title">使い方の流れ</h2>
				<p className="section-subtitle">3ステップで、ワーホリ情報を最大限に活用できます</p>

				<div className="mt-16">
					{steps.map((step, index) => (
						<div
							key={index}
							className={`flex flex-col ${index % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 mb-24`}
						>
							<div className="w-full md:w-1/2">
								<div className="relative w-full h-[300px]">
									<Image
										src={step.image || "/placeholder.svg"}
										alt={step.title}
										fill
										sizes="(max-width: 768px) 100vw, 50vw"
										className="object-contain"
									/>
								</div>
							</div>

							<div className="w-full md:w-1/2">
								<div className="relative flex items-center mb-4">
									<div
										className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#A8D5BA]/20"
										style={{
											clipPath: "ellipse(50% 50% at 50% 50%)",
										}}
									/>

									<div className="bg-[#A8D5BA] text-white rounded-full w-10 h-10 flex items-center justify-center mr-4">
										{index + 1}
									</div>
									<FontAwesomeIcon
										icon={step.icon}
										className="text-[#FFA500] h-6 w-6 mr-3"
									/>
									<h3 className="text-2xl font-bold">{step.title}</h3>
								</div>
								<p className="text-gray-700 ml-14">{step.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
