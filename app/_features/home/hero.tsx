import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faMapMarkedAlt, faUsers } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

function HeroTitle() {
	return (
		<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
			<span className="text-[#FFA500]">ワーホリ情報</span>を
			<br />
			マップから探す
			<br />
			マップでシェア！
			<br />
			{/* <span className="text-[#FFA500]">ワーホリ情報</span>に特化したシェアサイト */}
		</h1>
	);
}

function HeroButtons() {
	return (
		<div className="flex flex-wrap justify-center md:justify-start gap-4">
			<button className="btn-primary">無料で登録して情報をチェック</button>
			<button className="btn-secondary">詳しく見る</button>
		</div>
	);
}

function HeroFeatures() {
	return (
		<div className="mt-12 flex flex-wrap justify-center md:justify-start gap-6">
			<Feature icon={faMapMarkedAlt} text="地図で簡単検索" />
			<Feature icon={faUsers} text="日本人コミュニティ" />
			<Feature icon={faGlobeAsia} text="世界中の情報" />
		</div>
	);
}

function Feature({ icon, text }: { icon: IconDefinition; text: string }) {
	return (
		<div className="flex items-center">
			<FontAwesomeIcon icon={icon} className="text-[#A8D5BA] h-5 w-5 mr-2" />
			<span>{text}</span>
		</div>
	);
}

export default function Hero() {
	return (
		<section className="relative overflow-hidden pt-20 pb-32">
			{/* 背景の装飾 */}
			<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#A8D5BA]/20 to-transparent -z-10"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A8D5BA]/10 -z-10"></div>

			<div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
				<div className="relative text-center md:text-left">
					{/* モバイル表示での背景画像 */}
					<div className="absolute top-[-50%] inset-0 md:hidden">
						<Image
							src="/home/hero2.png"
							alt="ワーホリマップのイメージ"
							fill
							className="object-cover opacity-10"
							priority
						/>
					</div>
					<HeroTitle />
					<p className="text-xl md:text-2xl mb-8 text-gray-700">
						ワーホリ情報に特化したシェアサイトで、日本人ネットワークを活かそう！
					</p>
					<HeroButtons />
					<HeroFeatures />
				</div>

				<div className="relative hidden md:block">
					<div className="relative w-full h-[400px] md:h-[500px]">
						<Image
							src="/home/map_transparent.png"
							alt="ワーホリマップのイメージ"
							fill
							className="object-contain"
							priority
						/>
					</div>
					<div className="absolute -bottom-4 -right-4 bg-white rounded-lg shadow-lg p-4 w-40">
						<div className="text-sm font-bold">ユーザー数</div>
						<div className="text-2xl font-bold text-[#FFA500]">+1,000人突破(仮)</div>
						<div className="text-xs text-gray-500">世界中で利用(仮)</div>
					</div>
				</div>
			</div>
		</section>
	);
}
