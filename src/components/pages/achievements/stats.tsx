import { MonitorDot, ShieldEllipsis } from "lucide-react";

const Stats = () => {
	return (
		<section className="py-24 bg-(--surface-container-low) relative">
			<div className="max-w-7xl mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* <!-- Stat Card 1 --> */}
					<div className="md:col-span-2 bg-(--surface-container-highest) p-10 rounded-xl relative overflow-hidden group">
						<div className="relative z-10">
							<h3 className="font-headline font-black text-6xl text-primary tracking-tighter">
								5,000+
							</h3>
							<p className="font-headline uppercase font-bold text-(--on-surface) tracking-widest mt-2">
								Pounds Lost Collectively
							</p>
							<p className="mt-4 text-(--on-surface-variant) max-w-xs">
								Our community relentless pursuit of health has resulted in
								massive life changes.
							</p>
						</div>
						<MonitorDot className="absolute -bottom-2 -right-2 size-32 text-white/5 group-hover:text-(--primary)/10 transition-colors" />
					</div>
					{/* <!-- Stat Card 2 --> */}
					<div className="bg-(--primary-container) p-8 rounded-xl flex flex-col justify-end">
						<h3 className="font-headline font-black text-4xl text-(--on-primary-container) tracking-tighter">
							98%
						</h3>
						<p className="font-headline uppercase font-bold text-(--on-primary-container)/80 text-xs tracking-widest">
							Success Rate
						</p>
					</div>
					{/* <!-- Stat Card 3 --> */}
					<div className="bg-(--surface-container-high) p-8 rounded-xl flex flex-col justify-end">
						<h3 className="font-headline font-black text-4xl text-on-surface tracking-tighter">
							12k
						</h3>
						<p className="font-headline uppercase font-bold text-(--on-surface-variant) text-xs tracking-widest">
							Workouts Tracked
						</p>
					</div>
					{/* <!-- Stat Card 4 --> */}
					<div className="bg-(--surface-container-highest) p-8 rounded-xl md:col-span-1 flex flex-col justify-between">
						<ShieldEllipsis className="text-(--primary) size-9" />

						<div>
							<h3 className="font-headline font-black text-3xl text-(--on-surface) tracking-tighter">
								National Champions
							</h3>
							<p className="text-xs text-(--on-surface-variant) uppercase mt-1">
								4 Athletes Produced
							</p>
						</div>
					</div>
					{/* <!-- Stat Card 5 - The Power Card --> */}
					<div className="md:col-span-3 bg-(--surface) p-1 rounded-xl relative overflow-hidden border border-(--primary)/10">
						<div className="flex flex-col md:flex-row h-full">
							<div className="md:w-1/2 p-8 flex flex-col justify-center">
								<h2 className="font-headline font-black text-4xl uppercase tracking-tighter mb-4">
									The Kinetic Standard
								</h2>
								<p className="text-(--on-surface-variant) mb-6">
									We measure performance through science. Our proprietary C-FIT
									metric tracks power output, recovery, and metabolic
									efficiency.
								</p>
								<div className="space-y-4">
									<div className="space-y-1">
										<div className="flex justify-between text-xs font-headline uppercase font-bold">
											<span>Strength Output</span>
											<span>85%</span>
										</div>
										<div className="h-2 bg-(--surface-container-lowest) rounded-full overflow-hidden">
											<div className="h-full bg-(--primary) w-[85%]"></div>
										</div>
									</div>
									<div className="space-y-1">
										<div className="flex justify-between text-xs font-headline uppercase font-bold">
											<span>Endurance Tier</span>
											<span>92%</span>
										</div>
										<div className="h-2 bg-(--surface-container-lowest) rounded-full overflow-hidden">
											<div className="h-full bg-(--primary) w-[92%]"></div>
										</div>
									</div>
								</div>
							</div>
							<div className="md:w-1/2 min-h-[300px]">
								<img
									alt="Gym Stats"
									className="w-full h-full object-cover"
									data-alt="Close up of gym equipment with dramatic lighting"
									src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxLimJbrirg4c8rz-bRMDiqg-cVxfis-st6n2OtPZgkYqr6gGfmTL7h7vfcTXnKxfwMQd1vns7oJaRHk1qHBX7krgo1gpkBXsli5YQm94xVnVAEt0WNHca5fi2EZPSynZJTplSPnE4BgLpXLywL8BrELyT9nSD6xNLlNEsqS8ZPz1GLZKH4TyXXc5kn26yARS5ZAuIHYNundqLOny3RvIjefRtjmWZRLC94xX_roFLPrDe7NQ9rNCEW1LnMWNHnQ7lDydIgwfGlAw"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Stats;
