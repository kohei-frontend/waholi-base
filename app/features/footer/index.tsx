"use client";

import { ActionIcon, Anchor, Group } from "@mantine/core";
import Image from "next/image";
import classes from "./index.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const links = [
	{ link: "#", label: "ホーム" },
	{ link: "#", label: "使い方" },
	{ link: "#", label: "ワーホリマップ" },
	{ link: "#", label: "FAQ" },
];

export default function FooterCentered() {
	const items = links.map((link) => (
		<Anchor
			c="dimmed"
			key={link.label}
			href={link.link}
			lh={1}
			onClick={(event) => event.preventDefault()}
			size="sm"
		>
			{link.label}
		</Anchor>
	));

	return (
		<div className={classes.footer}>
			<div className={classes.inner}>
				<Image
					src={"/sampleLogo.png"}
					alt="Store front"
					width="80"
					height="80"
					className="object-cover"
				/>

				<Group className={classes.links}>{items}</Group>

				<Group gap="xs" justify="flex-end" wrap="nowrap">
					<ActionIcon size="lg" variant="default" radius="xl">
						<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
					</ActionIcon>
					<ActionIcon size="lg" variant="default" radius="xl">
						<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
					</ActionIcon>
					<ActionIcon size="lg" variant="default" radius="xl">
						<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
					</ActionIcon>
				</Group>
			</div>
		</div>
	);
}
