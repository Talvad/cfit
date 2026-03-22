const Hero = () => {
	return (
		<section className="relative min-h-[614px] flex items-center overflow-hidden py-24">
			<div className="absolute inset-0 z-0">
				<div className="absolute inset-0 bg-linear-to-r from-(--background) via-(--background)/80 to-transparent z-10"></div>
				<img
					alt="Gym background"
					className="w-full h-full object-cover grayscale opacity-40"
					data-alt="High intensity gym environment with weights"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXb7zoQHmbeSusCgp6VV2Lp-DQZ5W2jRGJZeBJIq2fkOs0V9t4GZ6RzbSsjuUuzfbUSdBRx-hmsZVnF1zvgn4XQVxqkbV71aPeX-W3mFpUIzqkrxpd2maevoWkD-vNt0Hc1O1XVY7RWBhJFTsNaVLMKHR-YkP5SZkPuJf0gbXE0K-U3itqKYzsFhVKIZhnU1LGoialmYwmJig_Fvbsk79WWZ174mslgYjorIZJcgR_KllxUzASHR-GM9avV70mNA8QYUptxGKhgzo"
				/>
			</div>
			<div className="relative z-20 max-w-7xl mx-auto px-6 w-full">
				<div className="max-w-3xl">
					<span className="inline-block heat-gradient px-4 py-1 rounded-full text-xs font-headline font-black uppercase tracking-widest mb-6">
						Wall of Fame
					</span>
					<h1 className="text-6xl md:text-8xl font-headline font-black uppercase tracking-tighter leading-none text-(--on-background) mb-8">
						FORGED IN <span className="text-(--primary) italic">IRON.</span>
						<br />
						PROVEN BY <span className="text-(--primary)">RESULTS.</span>
					</h1>
					<p className="text-xl text-(--on-surface-variant) max-w-xl font-light leading-relaxed">
						At C-FIT, we don't just count reps; we count transformations.
						Explore the stories of our members who pushed past limits and
						redefined what's possible.
					</p>
				</div>
			</div>
		</section>
	);
};

export default Hero;
