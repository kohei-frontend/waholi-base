"use client";

import {
	Box,
	Burger,
	Button,
	Center,
	Collapse,
	Divider,
	Drawer,
	Group,
	HoverCard,
	ScrollArea,
	SimpleGrid,
	Text,
	UnstyledButton,
	useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import classes from "./index.module.css";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

const countries = [
	{
		icon: faLocationDot,
		title: "オーストラリア",
		description: "例：オーストラリアでのワーホリマップ",
		enabled: true,
		url: "0ac44860-3b58-96ec-f321-0886bc6b9942",
	},
	{
		icon: faLocationDot,
		title: "ニュージーランド",
		description: "ニュージーランドでのワーホリマップ",
		enabled: true,
		url: "8ead2888-19ab-72b4-72da-31f34c2f1263",
	},
	{
		icon: faLocationDot,
		title: "カナダ",
		description: "カナダでのワーホリマップ",
		enabled: false,
		url: "",
	},
];

function renderLinks(isLoggedIn: boolean, links: JSX.Element[]) {
	return isLoggedIn ? (
		<>
			<HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
				<HoverCard.Target>
					<a href="#" className={classes.link}>
						<Center inline>
							<Box component="span" mr={5}>
								ワーホリマップ
							</Box>
							<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
						</Center>
					</a>
				</HoverCard.Target>

				<HoverCard.Dropdown style={{ overflow: "hidden" }}>
					<SimpleGrid cols={2} spacing={0}>
						{links}
					</SimpleGrid>
				</HoverCard.Dropdown>
			</HoverCard>
			<a href="#" className={classes.link}>
				通知
			</a>
			<a href="#" className={classes.link}>
				マイページ
			</a>
			<a href="#" className={classes.link}>
				設定
			</a>
		</>
	) : (
		<>
			{/* <a href="#" className={classes.link}>
				使い方
			</a> */}
			<HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
				<HoverCard.Target>
					<a href="#" className={classes.link}>
						<Center inline>
							<Box component="span" mr={5}>
								ワーホリマップ
							</Box>
							<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
						</Center>
					</a>
				</HoverCard.Target>

				<HoverCard.Dropdown style={{ overflow: "hidden" }}>
					<SimpleGrid cols={2} spacing={0}>
						{links}
					</SimpleGrid>
				</HoverCard.Dropdown>
			</HoverCard>
			<a href="#" className={classes.link}>
				FAQ
			</a>
		</>
	);
}

export function HeaderMenu() {
	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
	const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
	const theme = useMantineTheme();
	const [isLoggedIn, setIsLoggedIn] = useState(false); // ログイン状態を管理

	const links = countries.map((item) => (
		<UnstyledButton
			className={classes.subLink}
			key={item.title}
			disabled={!item.enabled}
			style={{ color: item.enabled ? "inherit" : "gray" }}
			onClick={() => {
				if (item.enabled) {
					window.location.href = item.url; // URLに遷移
				}
			}}
		>
			<Group wrap="nowrap" align="flex-start">
				<FontAwesomeIcon icon={item.icon} className="mr-2" />
				<div>
					<Text size="sm" fw={500}>
						{item.title}
					</Text>
					<Text size="xs" c="dimmed">
						{item.description}
					</Text>
					{!item.enabled && (
						<Text size="xs" c="gray">
							準備中
						</Text>
					)}
				</div>
			</Group>
		</UnstyledButton>
	));

	return (
		<Box pb={10}>
			<header className={classes.header}>
				<Group justify="space-between" h="100%">
					<Image
						src={"/sampleLogo.png"}
						alt="Store front"
						width="40"
						height="40"
						className="object-cover"
					/>

					<Group h="100%" gap={0} visibleFrom="sm">
						<a href="#" className={classes.link}>
							ホーム
						</a>
						{renderLinks(isLoggedIn, links)}
					</Group>

					<Group visibleFrom="sm">
						{isLoggedIn ? (
							<Button onClick={() => setIsLoggedIn(false)}>ログアウト</Button>
						) : (
							<>
								<Button variant="default">ログイン</Button>
								<Button>新規登録</Button>
							</>
						)}
					</Group>

					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title="Navigation"
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h="calc(100vh - 80px" mx="-md">
					<Divider my="sm" />

					<a href="#" className={classes.link}>
						ホーム
					</a>
					<UnstyledButton className={classes.link} onClick={toggleLinks}>
						<Center inline>
							<Box component="span" mr={5}>
								ワーホリマップ
							</Box>
							<FontAwesomeIcon icon={faLocationDot} className="mr-2" />
						</Center>
					</UnstyledButton>
					<Collapse in={linksOpened}>{links}</Collapse>
					{isLoggedIn ? (
						<>
							<a href="#" className={classes.link}>
								通知
							</a>
							<a href="#" className={classes.link}>
								マイページ
							</a>
							<a href="#" className={classes.link}>
								設定
							</a>
						</>
					) : (
						<>
							<a href="#" className={classes.link}>
								使い方
							</a>
							<a href="#" className={classes.link}>
								FAQ
							</a>
						</>
					)}

					<Divider my="sm" />

					<Group justify="center" grow pb="xl" px="md">
						{isLoggedIn ? (
							<Button onClick={() => setIsLoggedIn(false)}>ログアウト</Button>
						) : (
							<>
								<Button variant="default">ログイン</Button>
								<Button>新規登録</Button>
							</>
						)}
					</Group>
				</ScrollArea>
			</Drawer>
		</Box>
	);
}
