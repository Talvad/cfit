import { Link } from "@tanstack/react-router";

const Logo = () => {
	return (
		<Link to="/">
			<span className="text-3xl font-black text-[#d32f2f] tracking-tighter font-headline">
				C-FI<span className="text-white">T</span>
			</span>
		</Link>
	);
};

export default Logo;
