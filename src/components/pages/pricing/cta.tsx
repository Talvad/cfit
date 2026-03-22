const Cta = () => {
	return (
		<section className="py-24 px-6 text-center">
			<div className="max-w-2xl mx-auto glass-card p-12 rounded-3xl border border-white/5">
				<h2 className="font-headline text-4xl font-black uppercase mb-6 leading-tight">
					STILL NOT SURE?
				</h2>
				<p className="text-(--on-surface-variant) mb-10">
					Try our powerhouse facilities for a day. Full access to everything for
					a single session.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<button
						type="button"
						className="px-10 py-4 bg-(--surface-container-highest) rounded-full font-headline font-black uppercase tracking-widest text-sm hover:brightness-125 transition-all"
					>
						BOOK A DAY PASS
					</button>
					<button
						type="button"
						className="px-10 py-4 heat-gradient text-(--on-primary-container) rounded-full font-headline font-black uppercase tracking-widest text-sm hover:scale-105 transition-all"
					>
						TALK TO A COACH
					</button>
				</div>
			</div>
		</section>
	);
};

export default Cta;
