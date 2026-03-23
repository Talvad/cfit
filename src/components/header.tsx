import { Link } from "@tanstack/react-router";

// import ThemeToggle from "./ThemeToggle";
import { header } from "#/resources";
export default function Header() {
	return (
		<header className="sticky top-0 z-50 bg-(--background) border-b border-white/10 shadow-2xl py-4 backdrop-blur-lg">
			<nav className="px-4 md:px-20 grid grid-cols-2 md:flex items-center justify-between gap-2 md:gap-6">
				{header.logo}
				<NavLinks className="order-3 md:order-2 col-span-2" />
				<button
					type="button"
					className="order-2 md:order-3 bg-(--primary-container) text-(--on-primary-container) px-4 py-2 rounded-full font-headline font-semibold text-sm tracking-tighter hover:scale-105 active:scale-95 transition-all"
				>
					{header.cta}
				</button>
			</nav>
		</header>
	);
}

const NavLinks = ({ className, ...props }: React.ComponentProps<"ul">) => {
	return (
		<ul
			className={`flex gap-6 justify-between bg-(--surface-container-low) md:bg-transparent px-6 py-1 rounded-md ${className}`}
			{...props}
		>
			{header.menu.map((link) => (
				<li key={link.href}>
					<Link
						to={link.href}
						className="flex flex-col md:flex-row items-center gap-1 font-headline uppercase tracking-tighter font-light md:font-semibold text-xs md:text-sm text-(--on-surface) hover:text-(--primary) transition-colors"
						activeProps={{
							className:
								"text-(--primary) md:border-b-2 md:border-(--primary-container) md:pb-1 bg-(--primary-container) md:bg-transparent p-1 md:p-0 rounded-md md:rounded-none",
						}}
						inactiveProps={{
							className:
								"text-(--on-surface) hover:text-(--primary) hover:border-b-2 hover:border-(--primary-container) transition-colors",
						}}
					>
						<link.icon className="size-4" />
						<span>{link.name}</span>
					</Link>
				</li>
			))}
		</ul>
	);
};
