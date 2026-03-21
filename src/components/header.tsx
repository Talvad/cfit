import { Link } from "@tanstack/react-router";
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
			<nav className="page-wrap  flex justify-between items-center">
				<Logo />
				<ul className="hidden md:flex gap-6">
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
							>
								{link.name}
							</Link>
						</li>
					))}
				</ul>

				<button
					type="button"
					className="bg-primary-container text-on-primary-container px-6 py-2 rounded-full font-headline font-extrabold tracking-tighter hover:scale-105 active:scale-95 transition-all"
				>
					JOIN NOW
				</button>
			</nav>
			{/* <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
				<Logo />

				<div className="flex w-full flex-wrap items-center gap-x-4 gap-y-1 pb-1 text-sm font-semibold sm:order-2 sm:w-auto sm:flex-nowrap sm:pb-0">
					<Link
						to="/"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						Home
					</Link>
					<Link
						to="/about"
						className="nav-link"
						activeProps={{ className: "nav-link is-active" }}
					>
						About
					</Link>
				</div>
				<div className="ml-auto flex items-center gap-1.5 sm:ml-0 sm:gap-2">
					<ThemeToggle />
				</div>
			</nav> */}
		</header>
	);
}
