import type { ReactNode } from "react";
import Logo from "#/components/logo";

type NavLink = {
	name: string;
	href: string;
};
type NavLinks = NavLink[];
type Header = {
	menu: NavLinks;
	cta: string;
	logo: ReactNode;
};
const menu: NavLinks = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Achievements",
		href: "/achievements",
	},

	{
		name: "Pricing",
		href: "/pricing",
	},
	{
		name: "Gallery",
		href: "/gallery",
	},
];
export const header: Header = {
	menu,
	cta: "JOIN NOW",
	logo: <Logo />,
};
type GroupNav = {
	title: string;
	menu: NavLinks;
};
type Item = {
	key: string;
	value: string;
};
type Footer = {
	logo: ReactNode;
	description: string;
	links: GroupNav;
	contact: {
		title: string;
		items: Item[];
	};
	rights: {
		title: string;
		subtitle: string;
	};
};
const footerMenu: NavLinks = [
	{
		name: "Careers",
		href: "/careers",
	},
	{
		name: "Location",
		href: "/location",
	},
	{
		name: "Privacy Policy",
		href: "/privacy-policy",
	},
	{
		name: "Terms of Service",
		href: "/terms-of-service",
	},
];
const footerContact: Item[] = [
	{
		key: "headquarters",
		value: "kannanagam,K.K Dist",
	},
	{
		key: "email",
		value: "[EMAIL_ADDRESS]",
	},
	{
		key: "phone",
		value: "1234567890",
	},
];
export const footer: Footer = {
	logo: <Logo />,
	description:
		"The premier destination for high-intensity athletic performance. We redefine the physical limit through industrial excellence.",
	links: {
		title: "Quick Links",
		menu: footerMenu,
	},
	contact: {
		title: "Contact",
		items: footerContact,
	},
	rights: {
		title: "© 2024 C-FIT. ALL RIGHTS RESERVED.",
		subtitle: "FORCE. FLOW. FINISH.",
	},
};

type Website = {
	header: Header;
	footer: Footer;
	pages: {
		home: string;
		mission: string;
		gallery: string;
		achievements: string;
		pricing: string;
		contact: string;
	};
};

export const website: Website = {
	header,
	footer,
	pages: {
		home: "",
		mission: "",
		gallery: "",
		achievements: "",
		pricing: "",
		contact: "",
	},
};
