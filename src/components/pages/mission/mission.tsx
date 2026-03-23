const Hero = () => {
	return (
		<section className="relative min-h-screen flex items-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-linear-to-r from-(--background) via-(--background/80) to-(--transparent) z-10"></div>
				<div
					className="w-full h-full bg-[url('image-hero-training')] bg-cover bg-center"
					data-alt="Intense high contrast gym training scene"
				></div>
			</div>
			<div className="container mx-auto px-6 relative z-20 py-36">
				<div className="max-w-3xl">
					<span className="text-(--primary) font-headline font-bold tracking-[0.3em] uppercase mb-2 block">
						Our Philosophy
					</span>
					<h1 className="text-7xl md:text-9xl font-headline font-black text-(--on-background) uppercase leading-tight tracking-tighter mb-4">
						Kinetic <br />{" "}
						<span
							className="text-transparent stroke-(--primary) text-stroke-2"
							style={{ WebkitTextStroke: "2px var(--primary)" }}
						>
							Powerhouse
						</span>
					</h1>
					<p className="text-xl md:text-2xl text-(--on-surface-variant) max-w-xl leading-relaxed font-light">
						We don't just build muscle. We forge resilience. C-FIT is an
						industrial-grade ecosystem designed for those who demand precision
						and raw power.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
