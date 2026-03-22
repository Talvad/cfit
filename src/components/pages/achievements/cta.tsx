const Cta = () => {
	return (
		<section className="py-32 relative overflow-hidden">
			<div className="absolute inset-0 heat-gradient opacity-10"></div>
			<div className="max-w-4xl mx-auto px-6 text-center relative z-10">
				<h2 className="text-5xl md:text-7xl font-headline font-black uppercase tracking-tighter mb-8 leading-tight">
					YOUR STORY <br />
					STARTS <span className="italic text-(--primary)">TODAY.</span>
				</h2>
				<button
					type="button"
					className="heat-gradient text-(--on-primary-container) px-12 py-5 rounded-full font-headline font-black uppercase tracking-[0.2em] text-lg hover:brightness-110 transition-all shadow-xl shadow-(--primary)/20"
				>
					JOIN THE POWERHOUSE
				</button>
			</div>
		</section>
	);
};

export default Cta;
