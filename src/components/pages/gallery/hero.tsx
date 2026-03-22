const Hero = () => {
	return (
		<section className="relative h-[409px] flex items-end px-8 pb-12 overflow-hidden bg-(--surface-container-low)">
			<div className="absolute inset-0 z-0 opacity-40">
				<div className="absolute inset-0 bg-linear-to-t from-(--background) via-transparent to-transparent"></div>
				<div
					className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&amp;w=2070&amp;auto=format&amp;fit=crop')] bg-cover bg-center"
					data-alt="Blurry background of high-end gym equipment"
				></div>
			</div>
			<div className="relative z-10 w-full max-w-7xl mx-auto">
				<h1 className="font-headline text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none text-(--on-background)">
					VISUAL{" "}
					<span className="text-(--primary-container) italic">ENERGY</span>
				</h1>
				<p className="mt-4 text-(--on-surface-variant) max-w-xl text-lg font-medium leading-relaxed">
					Witness the raw atmosphere of high-performance training. Our facility
					is designed for those who demand excellence from their environment and
					themselves.
				</p>
			</div>
		</section>
	);
};

export default Hero;
