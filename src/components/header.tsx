import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./logo";

// import ThemeToggle from "./ThemeToggle";

const navLinks = [
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
export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-[#131313] border-b border-white/10 shadow-2xl py-4 backdrop-blur-lg">
			<nav className="px-4 md:px-20 flex items-center gap-6">
				<Logo />
				<NavLinks className="order-3 md:order-2" />
				<button
					type="button"
					className="ml-auto order-2 md:order-3 bg-(--primary-container) text-(--on-primary-container) px-4 md:px-6 py-2 rounded-full font-headline md:font-extrabold font-bold tracking-tighter hover:scale-105 active:scale-95 transition-all"
				>
					JOIN NOW
				</button>
			</nav>
		</header>
	);
}

const NavLinks = ({ className, ...props }: React.ComponentProps<"div">) => {
	const [openMenu, setOpenMenu] = useState(false);
	const toggleOpenMenu = () => {
		setOpenMenu(!openMenu);
	};
	return (
		<div className={` ${className}`} {...props}>
			<button type="button" className="md:hidden" onClick={toggleOpenMenu}>
				{openMenu ? <X /> : <Menu />}
			</button>

			<ul
				className={`flex flex-col md:flex-row gap-6 absolute md:relative top-full left-0 right-0 bg-[#131313] md:py-0 py-5 md:px-0 px-10 md:border-t-0 border-t border-white/10 md:shadow-none shadow-2xl ${!openMenu && "hidden md:flex"}`}
			>
				{navLinks.map((link) => (
					<li key={link.href}>
						<Link
							to={link.href}
							className="font-headline uppercase tracking-tighter font-bold text-[#e5e2e1] hover:text-[#ffb3ac] transition-colors"
							activeProps={{
								className: "text-[#ffb3ac] border-b-2 border-[#d32f2f] pb-1",
							}}
							inactiveProps={{
								className:
									"text-[#e5e2e1] hover:text-[#ffb3ac] hover:border-b-2 hover:border-[#d32f2f] transition-colors",
							}}
							onClick={() => setOpenMenu(false)}
						>
							{link.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
