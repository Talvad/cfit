const Hero = () => {
	return (
		<section className="relative min-h-[512px] flex items-center justify-center overflow-hidden bg-(--surface-container-lowest)">
			<div className="absolute inset-0 z-0 opacity-30">
				<div className="absolute inset-0 bg-linear-to-b from-transparent to-(--background)"></div>
				<img
					className="w-full h-full object-cover grayscale"
					alt="Intense high-performance industrial gym atmosphere"
					data-alt="Intense high-performance industrial gym atmosphere"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqyWhSiBtTR5jlUM-Y3eq5lG9x4LVvMJRdLDbul1yS5QtN0Dj9NFLaz5fN5BMu5WaNvca0lQc1OwXJKN2Thg497jeYvr7JxpVA2nPu5H76xcMqlpC2dMj5L3kFqSa1qR7IV2mIMhbwiM4IVvDMGRQMiKKJrFH0KkNrmHfR3kjVRvYamgK-pLMeZ6O_4ztoE7IDizn_WM0IyMuXpNMaS7PGf7Q-XQdTv1ZQeVPFr0ESWDxyBMsZ0HsGJim9v-XvdR3F19otYEgPpjU"
				/>
			</div>
			<div className="relative z-10 text-center px-4 max-w-4xl">
				<h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4 text-on-background">
					INVEST IN <span className="text-(--primary)">POWER</span>
				</h1>
				<p className="text-(--on-surface-variant) text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
					Transparent tiers built for peak performance. Choose your entry into
					the elite circle of C-FIT athletics.
				</p>
			</div>
		</section>
	);
};

export default Hero;
