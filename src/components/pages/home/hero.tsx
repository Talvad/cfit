import { Zap } from "lucide-react";

const Hero = () => {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden py-40">
			<div className="absolute inset-0 z-0">
				<img
					alt="Athletic Hero"
					className="w-full h-full object-cover opacity-100"
					data-alt="Intense athlete lifting weights in dark gym"
					src="/images/hero-bg.jpeg"
				/>
				<div className="absolute inset-0 bg-linear-to-r from-(--background) via-(--background)/40 to-(--background)"></div>
			</div>
			<div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
				<div className="max-w-2xl">
					<span className="inline-block bg-(--primary-container) text-(--on-primary-container) px-3 py-1 text-sm font-bold tracking-widest uppercase mb-6 rounded-lg">
						Est. 2024
					</span>
					<h1 className="text-6xl md:text-8xl font-black font-headline tracking-tighter leading-none text-on-surface mb-8">
						FORGED IN <br />
						<span className="text-(--primary) italic">KINETIC</span> POWER
					</h1>
					<p className="text-xl text-(--on-surface-variant) mb-10 font-medium max-w-lg leading-relaxed">
						Beyond the rep. Beyond the burn. We build high-performance athletes
						through industrial-grade precision and raw athletic intensity.
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<button
							type="button"
							className="heat-gradient text-(--on-primary-container) px-10 py-5 rounded-full font-headline font-black text-lg tracking-tight hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
						>
							START YOUR ASCENT
							<Zap />
						</button>
						<button
							type="button"
							className="bg-(--surface-container-highest) text-(--on-surface) px-10 py-5 rounded-full font-headline font-black text-lg tracking-tight hover:bg-(--surface-bright) active:scale-95 transition-all"
						>
							EXPLORE THE FACILITY
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Hero;
