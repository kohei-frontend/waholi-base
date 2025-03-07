import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAsia, faMapMarkedAlt, faUsers } from "@fortawesome/free-solid-svg-icons";

export default function CtaSection() {
	return (
		<section className="py-20 relative overflow-hidden">
			{/* 背景の装飾 */}
			<div className="absolute top-0 left-0 w-full h-full bg-[#A8D5BA]/20 -z-10"></div>
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#A8D5BA]/10 -z-10"></div>

			<div className="container mx-auto px-4 text-center">
				<h2 className="text-3xl md:text-4xl font-bold mb-6">
					今すぐ無料で登録して、最新のワーホリ情報を手に入れよう！
				</h2>
				<p className="text-xl mb-10 max-w-3xl mx-auto">
					地図ベースの直感的な検索で、あなたの理想のワーホリ先が見つかります。
					日本人ネットワークを活用して、より充実したワーホリ体験を！
				</p>

				<div className="flex flex-wrap justify-center gap-6 mb-12">
					<div className="flex items-center">
						<FontAwesomeIcon
							icon={faMapMarkedAlt}
							className="text-[#A8D5BA] h-5 w-5 mr-2"
						/>
						<span>地図で簡単検索</span>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon icon={faUsers} className="text-[#A8D5BA] h-5 w-5 mr-2" />
						<span>日本人コミュニティ</span>
					</div>
					<div className="flex items-center">
						<FontAwesomeIcon
							icon={faGlobeAsia}
							className="text-[#A8D5BA] h-5 w-5 mr-2"
						/>
						<span>世界中の情報</span>
					</div>
				</div>

				<button className="btn-primary text-lg px-10 py-4">無料で登録</button>
			</div>
		</section>
	);
}
