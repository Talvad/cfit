import { MapPin } from "lucide-react";

const Cta = () => {
	return (
		<section className="relative py-32 overflow-hidden bg-(--surface-container-lowest)">
			<div className="absolute right-0 top-0 w-1/3 h-full bg-(--primary-container)/10 -skew-x-12 transform translate-x-20"></div>
			<div className="max-w-7xl mx-auto px-8 relative z-10 text-center">
				<h2 className="font-headline text-6xl md:text-7xl font-black tracking-tighter mb-8">
					READY TO <span className="text-(--primary)">EVOLVE?</span>
				</h2>
				<p className="text-xl text-(--on-surface-variant) mb-12 max-w-2xl mx-auto">
					Limited memberships available for the current season. Secure your
					position in the powerhouse today.
				</p>
				<div className="flex flex-col md:flex-row items-center justify-center gap-6">
					<button
						type="button"
						className="bg-(--on-surface) text-(--background) px-12 py-6 rounded-full font-headline font-black text-xl hover:scale-105 transition-transform"
					>
						CLAIM YOUR PASS
					</button>
					<div className="flex items-center gap-4 text-(--on-secondary-container) font-headline font-bold">
						<MapPin />
						DOWNTOWN HUB, SECTOR 7
					</div>
				</div>
			</div>
		</section>
	);
};

export default Cta;
