import React from "react";
import CtaSection from "./ctaSection";
import Hero from "./hero";
import HowToUse from "./howToUse";
import Issue from "./issue";

export default function HomeFeature() {
	return (
		<div>
			<Hero />
			<Issue />
			<HowToUse />
			<CtaSection />
		</div>
	);
}
