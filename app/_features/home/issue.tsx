"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faClock,
	faMapMarkedAlt,
	faBuilding,
	faUsers,
	faGlobeAmericas,
	faMap,
	faBriefcase,
	faGlobe,
} from "@fortawesome/free-solid-svg-icons";

export default function Issue() {
	const challenges = [
		{
			icon: faClock,
			title: "SNSの投稿がすぐ流れていって追いきれない",
			description: "SNSの投稿は流れが早く、必要な情報の把握が難しいと感じていませんか？",
		},
		{
			icon: faBuilding,
			title: "仕事・住まいの情報がバラバラで探しにくい",
			description: "仕事や住まいの情報が分散していて、探しにくいと感じていませんか？",
		},
		{
			icon: faMapMarkedAlt,
			title: "どのエリアに何があるのか分かりづらい",
			description: "地理感がないまま情報を探すのは非効率的です",
		},
		{
			icon: faUsers,
			title: "現地での日本人ネットワークを活かしきれない",
			description: "貴重なネットワークを最大限に活用できていますか？",
		},
		{
			icon: faGlobeAmericas,
			title: "次の渡航先の情報収集が難しい",
			description: "州や国を跨いだ計画が立てづらい",
		},
	];

	const solutions = [
		{
			title: "ワーホリに特化した◯◯◯で効率よく情報収集できます",
			description: "ワーホリに関する情報しかシェアされていないので、効率よく情報収集できます",
		},
		{
			title: "職種別の実体験投稿で、リアルな情報が集まる！",
			description: "飲食、ファーム、オフィスワークなど、職種ごとの生の声を確認できます",
		},
		{
			title: "地図ベースで地理感を掴みながら情報収集できます",
			description: "どこに何の何があるのかをパッと見で把握できます",
		},
		{
			title: "ワーホリ連携で、リアルな最新情報をタイムリーに入手",
			description: "現地の日本人ネットワークと連携し、常に最新情報を更新しています",
		},
		{
			title: "国を跨いでワーホリ情報を一元化！",
			description: "複数の国の情報を◯◯◯で簡単に比較。次の渡航先も簡単に情報収集",
		},
	];

	return (
		<section id="features" className="section green-bg">
			<div className="container">
				<h2 className="section-title">ワーホリの課題と解決策</h2>

				<div className="grid md:grid-cols-2 gap-16 mt-12">
					<div>
						<h3 className="text-2xl font-bold mb-6 text-center md:text-left">
							よくある課題
						</h3>
						<div className="space-y-6">
							{challenges.map((item, index) => (
								<div key={index} className="card flex items-start">
									<div className="mr-4 mt-1">
										<FontAwesomeIcon
											icon={item.icon}
											className="text-[#FFA500] h-6 w-6"
										/>
									</div>
									<div>
										<h4 className="font-bold text-lg mb-1">{item.title}</h4>
										<p className="text-gray-600">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div>
						<h3 className="text-2xl font-bold mb-6 text-center md:text-left">
							私たちの解決策
						</h3>
						<div className="space-y-6">
							{solutions.map((item, index) => (
								<div key={index} className="card flex items-start">
									<div className="mr-4 mt-1 text-[#A8D5BA] font-bold text-xl">
										{index + 1}.
									</div>
									<div>
										<h4 className="font-bold text-lg mb-1">{item.title}</h4>
										<p className="text-gray-600">{item.description}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

// import {
// 	Badge,
// 	Card,
// 	Container,
// 	Group,
// 	SimpleGrid,
// 	Text,
// 	Title,
// 	useMantineTheme,
// } from "@mantine/core";
// import classes from "./issue.module.css";

// const features = [
// 	{
// 		title: "地図で最新情報を一目で把握",
// 		description:
// 			"SNSの投稿は流れが早く、最新情報の把握が難しいと感じていませんか？エリアごとの情報を地図上に視覚的に表示し、効率的な情報収集をサポートします。",
// 		icon: faMap,
// 	},
// 	{
// 		title: "職種別の実体験投稿でリアルな情報を提供",
// 		description:
// 			"仕事や住まいの情報が分散していて探しにくいとお悩みではありませんか？飲食、ファーム、オフィスワークなど、職種ごとの実体験投稿を集約し、信頼性の高い情報を提供します。",
// 		icon: faBriefcase,
// 	},
// 	{
// 		title: "国をまたいで地理感覚をつかみながら効率的に情報収集",
// 		description:
// 			"「どこで募集しているのか分からない」と感じることはありませんか？エリアごとの仕事や住まいの情報を地図上で表示し、地理感覚をつかみながら効率的に情報収集が可能です。",
// 		icon: faGlobe,
// 	},
// 	{
// 		title: "ワーホリ特化の日本人コミュニティと連携",
// 		description:
// 			"サイトやSNSのグループで情報が分散していると感じていませんか？ワーホリに特化した日本人コミュニティと連携し、ネットワークを広げるお手伝いをします。",
// 		icon: faUsers,
// 	},
// ];

// export default function Issue() {
// 	const FeatureCards = features.map((feature) => (
// 		<Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
// 			<FontAwesomeIcon icon={feature.icon} size="2x" color="#3498db" />
// 			<Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
// 				{feature.title}
// 			</Text>
// 			<Text fz="sm" c="dimmed" mt="sm">
// 				{feature.description}
// 			</Text>
// 		</Card>
// 	));

// 	return (
// 		<section id="features" className="section green-bg">
// 			<Container size="lg" py="xl">
// 				<Title order={2} className={classes.title} ta="center" mt="sm">
// 					ワーホリでよく聞く悩みとその解決策
// 				</Title>

// 				<Text c="dimmed" className={classes.description} ta="center" mt="md">
// 					ワーキングホリデー（ワーホリ）は、自由に行動し、自らの判断で仕事や遊び、住まいを選択できる魅力的な制度です。​しかし、最も重要な情報収集の面で、多くの課題や悩みが生じることがあります。
// 				</Text>

// 				<SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
// 					{FeatureCards}
// 				</SimpleGrid>
// 			</Container>
// 		</section>
// 	);
// }
