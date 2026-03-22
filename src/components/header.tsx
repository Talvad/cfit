import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
// import ThemeToggle from "./ThemeToggle";
import { header } from "#/resources";
export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-(--background) border-b border-white/10 shadow-2xl py-4 backdrop-blur-lg">
			<nav className="px-4 md:px-20 flex items-center gap-6">
				{header.logo}
				<NavLinks className="order-3 md:order-2" />
				<button
					type="button"
					className="ml-auto order-2 md:order-3 bg-(--primary-container) text-(--on-primary-container) px-4 md:px-6 py-2 rounded-full font-headline md:font-extrabold font-bold tracking-tighter hover:scale-105 active:scale-95 transition-all"
				>
					{header.cta}
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
				className={`flex flex-col md:flex-row gap-6 absolute md:relative top-full left-0 right-0 bg-(--background) md:py-0 py-5 md:px-0 px-10 md:border-t-0 border-t border-white/10 md:shadow-none shadow-2xl ${!openMenu && "hidden md:flex"}`}
			>
				{header.menu.map((link) => (
					<li key={link.href}>
						<Link
							to={link.href}
							className="font-headline uppercase tracking-tighter font-bold text-(--on-surface) hover:text-(--primary) transition-colors"
							activeProps={{
								className:
									"text-(--primary) border-b-2 border-(--primary-container) pb-1",
							}}
							inactiveProps={{
								className:
									"text-(--on-surface) hover:text-(--primary) hover:border-b-2 hover:border-(--primary-container) transition-colors",
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
