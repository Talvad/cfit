import { Brain, CircleGauge } from "lucide-react";

const Protocols = () => {
	return (
		<section className="bg-(--background) py-24">
			<div className="max-w-7xl mx-auto px-8">
				<div className="flex justify-between items-end mb-16">
					<div>
						<h2 className="font-headline text-5xl font-black tracking-tighter uppercase mb-4">
							The Forge Protocols
						</h2>
						<p className="text-(--on-secondary-container) max-w-md">
							Our specialized disciplines designed for elite human optimization.
						</p>
					</div>
					<span className="text-(--primary) font-headline font-bold text-8xl opacity-10 leading-none">
						01-04
					</span>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
					{/* <!-- Service 1 --> */}
					<div className="md:col-span-2 md:row-span-2 bg-(--surface-container-high) rounded-xl p-8 flex flex-col justify-end relative overflow-hidden group">
						<img
							alt="Strength Training"
							className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:scale-110 transition-transform duration-700"
							data-alt="Heavy barbell with plates in dark atmosphere"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIo-QjhnEqGEO0qZoejuswO0ySQrQ7BeX58lGF9KcmfErqfNgcDpUG_GIpAFYRGQWtR6j9DJ66AD5brb_8ZaQgydwySygq3BceehM44y8xmf9W3BvG5HN_OdvC_TiQ2Cf_giVEpPH4ToU45tYh9yLi5ebhInowDBbHkDArC8lRl1lNLzvLipy2iH9kguLilkZw63fb7F4LTTbtfSsrpd9NI0NARCh2vs7ZVV14TvENTs4uy5v60j2Ywidq9IYPEwG5G6_t6W2oCFA"
						/>
						<div className="relative z-10">
							<span className="text-(--primary-container) font-headline font-black text-6xl mb-4 block opacity-50">
								01
							</span>
							<h3 className="font-headline text-3xl font-black mb-4">
								KINETIC STRENGTH
							</h3>
							<p className="text-(--on-surface-variant) max-w-sm">
								Raw power development utilizing olympic-standard equipment and
								velocity-based training protocols.
							</p>
						</div>
					</div>
					{/* <!-- Service 2 --> */}
					<div className="md:col-span-2 bg-(--surface-container-highest) rounded-xl p-8 flex items-center justify-between group">
						<div>
							<span className="text-(--primary-container) font-headline font-black text-4xl mb-2 block opacity-50">
								02
							</span>
							<h3 className="font-headline text-2xl font-black uppercase">
								Metabolic Engine
							</h3>
						</div>
						<span className="text-6xl text-(  --primary) opacity-20 group-hover:rotate-12 transition-transform">
							<CircleGauge className="size-12" />
						</span>
					</div>
					{/* <!-- Service 3 --> */}
					<div className="bg-(--surface-container) rounded-xl p-8 flex flex-col justify-between group hover:bg-(--primary-container) transition-colors duration-300">
						<span className="text-4xl text-(--primary) group-hover:text-(--on-primary-container)">
							<Brain className="size-12" />
						</span>
						<div>
							<h3 className="font-headline text-xl font-black uppercase group-hover:text-(--on-primary-container)">
								Neural Focus
							</h3>
							<p className="text-sm text-(--on-surface-variant) group-hover:text-(--on-primary-container)/80 mt-2">
								Mind-muscle synchronization and cognitive recovery.
							</p>
						</div>
					</div>
					{/* <!-- Service 4 --> */}
					<div className="bg-(--surface-container-highest) rounded-xl p-8 flex flex-col justify-between border-l-4 border-(--primary)">
						<span className="text-(--primary-container) font-headline font-black text-4xl opacity-50">
							04
						</span>
						<div>
							<h3 className="font-headline text-xl font-black uppercase">
								Elite Coaching
							</h3>
							<p className="text-sm text-(--on-surface-variant) mt-2">
								1-on-1 performance architecture with master instructors.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Protocols;
