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
type Website = {
	header: Header;
	footer: string;
	pages: {
		home: string;
		mission: string;
		gallery: string;
		achievements: string;
		pricing: string;
		contact: string;
	};
};
const menu: NavLinks = [
	{
		name: "Home",
		href: "/",
	},
	{
		name: "Mission",
		href: "/mission",
	},
	{
		name: "Gallery",
		href: "/gallery",
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
		name: "Contact",
		href: "/contact",
	},
];
export const header: Header = {
	menu,
	cta: "JOIN NOW",
	logo: <Logo />,
};
export const website: Website = {
	header,
	footer: "",
	pages: {
		home: "",
		mission: "",
		gallery: "",
		achievements: "",
		pricing: "",
		contact: "",
	},
};
