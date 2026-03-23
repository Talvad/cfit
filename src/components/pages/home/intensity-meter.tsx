const IntensityMeter = () => {
	return (
		<section className="py-24 bg-(--surface-container-low)">
			<div className="container mx-auto px-6 text-center max-w-4xl">
				<h2 className="text-4xl font-headline font-black uppercase mb-16 tracking-tight">
					Our Performance Standards
				</h2>
				<div className="space-y-12">
					<div className="space-y-4">
						<div className="flex justify-between items-end font-headline font-bold uppercase text-xs tracking-widest text-(--on-surface-variant)">
							<span>Mental Fortitude</span>
							<span className="text-(--primary)">100%</span>
						</div>
						<div className="h-2 w-full bg-(--surface-container-lowest) rounded-full overflow-hidden">
							<div className="h-full bg-(--primary) w-full shadow-[0_0_15px_rgba(255,179,172,0.4)]"></div>
						</div>
					</div>
					<div className="space-y-4">
						<div className="flex justify-between items-end font-headline font-bold uppercase text-xs tracking-widest text-(--on-surface-variant)">
							<span>Physical Output</span>
							<span className="text-(--primary)">94%</span>
						</div>
						<div className="h-2 w-full bg-(--surface-container-lowest) rounded-full overflow-hidden">
							<div className="h-full bg-(--primary) w-[94%] shadow-[0_0_15px_rgba(255,179,172,0.4)]"></div>
						</div>
					</div>
					<div className="space-y-4">
						<div className="flex justify-between items-end font-headline font-bold uppercase text-xs tracking-widest text-(--on-surface-variant)">
							<span>Technical Precision</span>
							<span className="text-(--primary)">98%</span>
						</div>
						<div className="h-2 w-full bg-(--surface-container-lowest) rounded-full overflow-hidden">
							<div className="h-full bg-(--primary) w-[98%] shadow-[0_0_15px_rgba(255,179,172,0.4)]"></div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default IntensityMeter;
