import { ExternalLink, LocateFixed } from "lucide-react";

const MapComp = () => {
	return (
		<section className="w-full h-[500px] relative bg-(--surface-container-low) grayscale contrast-125 opacity-80 hover:grayscale-0 transition-all duration-700">
			<div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-b from-(--background) via-transparent to-(--background)"></div>
			<img
				className="w-full h-full object-cover"
				alt="Satellite map view of the industrial district location"
				data-alt="Satellite map view of the industrial district location"
				data-location="Steel City"
				src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtiTPiaUGWLOMkK8wkFSNYkPiyneT2f0VgmoL0FC8vqYIDlSbGa0yIuR2QQ_IpFUlhDpRHMaKuFMXM9OLbcuhMkBfxd7W93me6ejsmmdeCgx5X0K1dkIU0QHmdZ-hcPfb-E_4RPuZ-TSKemB2nHsSF8ji4-FV-tp8HXjBrblK6w1uSPiXXAkA_N3nuLTArQxJO3C6dgEpZTgwAP2uyOQ28AY8e-hFZR85yJfShDrRCD5ZU_xC3YnOaBESzqXcZFIsUoVaRO15vx0U"
			/>
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
				<div className="relative">
					<div className="absolute inset-0 bg-(--primary-container) animate-ping rounded-full opacity-40"></div>
					<div className="bg-(--primary-container) p-4 rounded-full shadow-[0_0_30px_rgba(211,47,47,0.8)] relative">
						<LocateFixed className="text-(--on-primary-container) size-9" />
					</div>
				</div>
			</div>
			{/* <!-- Interactive Map Overlay --> */}
			<div className="absolute bottom-12 left-12 z-20 glass-panel p-6 rounded-xl border border-white/10 max-w-xs">
				<p className="font-headline font-bold text-(--on-surface) uppercase tracking-tight">
					C-FIT HQ
				</p>
				<p className="text-sm text-(--secondary) mt-1">
					Get custom directions to the most advanced training facility in the
					state.
				</p>
				<button
					type="button"
					className="mt-4 flex items-center gap-2 text-(--primary) font-bold uppercase tracking-wider text-xs"
				>
					OPEN IN NAVIGATION <ExternalLink className="size-3.5" />
				</button>
			</div>
		</section>
	);
};

export default MapComp;
