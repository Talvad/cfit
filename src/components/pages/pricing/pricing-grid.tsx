import { CheckCircle } from "lucide-react";

const PricingGrid = () => {
	return (
		<section className="py-24 px-6 max-w-7xl mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
				{/* <!-- Basic Tier --> */}
				<div className="flex flex-col bg-(--surface-container-low) rounded-xl p-8 border border-white/5 transition-transform hover:-translate-y-2">
					<div className="mb-8">
						<span className="text-(--on-secondary-container) text-xs font-headline font-bold uppercase tracking-[0.2em] mb-2 block">
							Foundational
						</span>
						<h3 className="text-3xl font-headline font-black uppercase text-(--on-surface)">
							Basic
						</h3>
					</div>
					<div className="mb-8 flex items-baseline gap-1">
						<span className="text-5xl font-headline font-black text-(--primary)">
							$49
						</span>
						<span className="text-(--on-surface-variant) font-label">
							/MONTH
						</span>
					</div>
					<div className="grow space-y-5 mb-10">
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />

							<span className="text-(--on-surface) text-sm">
								24/7 Access to Gym Floor
							</span>
						</div>
						<div className="flex items-center gap-3 text-(--on-surface-variant) opacity-60">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Standard Locker Room</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Free Orientation Session</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Basic Progress Tracking</span>
						</div>
					</div>
					<button
						type="button"
						className="w-full py-4 rounded-xl font-headline font-bold uppercase tracking-widest text-sm bg-(--surface-container-highest) text-(--on-surface) hover:bg-(--surface-bright) transition-colors"
					>
						SELECT PLAN
					</button>
				</div>
				{/* <!-- Standard Tier (Featured) --> */}
				<div className="flex flex-col glass-card rounded-xl p-8 relative border-2 border-(--primary-container) transform scale-105 z-10 shadow-2xl">
					<div className="absolute -top-4 left-1/2 -translate-x-1/2 heat-gradient px-6 py-1 rounded-full text-[10px] font-headline font-black uppercase tracking-[0.3em] text-(--on-primary-container)">
						Most Popular
					</div>
					<div className="mb-8">
						<span className="text-(--primary) text-xs font-headline font-bold uppercase tracking-[0.2em] mb-2 block">
							Performance
						</span>
						<h3 className="text-3xl font-headline font-black uppercase text-(--on-surface)">
							Standard
						</h3>
					</div>
					<div className="mb-8 flex items-baseline gap-1">
						<span className="text-5xl font-headline font-black text-(--primary)">
							$89
						</span>
						<span className="text-(--on-surface-variant) font-label">
							/MONTH
						</span>
					</div>
					<div className="grow space-y-5 mb-10">
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary)" />
							<span className="text-(--on-surface) text-sm font-semibold">
								Unlimited Group Classes
							</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary)" />
							<span className="text-sm">Sauna &amp; Steam Access</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary)" />
							<span className="text-sm">Nutritional Consultation</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary)" />
							<span className="text-sm">Advanced Mobile App Metrics</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary)" />
							<span className="text-sm">1 Guest Pass per Month</span>
						</div>
					</div>
					<button
						type="button"
						className="w-full py-4 rounded-xl font-headline font-black uppercase tracking-widest text-sm heat-gradient text-(--on-primary-container) hover:brightness-110 active:scale-95 transition-all shadow-lg"
					>
						CHOOSE STANDARD
					</button>
				</div>
				{/* <!-- Premium Tier --> */}
				<div className="flex flex-col bg-(--surface-container-low) rounded-xl p-8 border border-white/5 transition-transform hover:-translate-y-2">
					<div className="mb-8">
						<span className="text-(--on-secondary-container) text-xs font-headline font-bold uppercase tracking-[0.2em] mb-2 block">
							Elite
						</span>
						<h3 className="text-3xl font-headline font-black uppercase text-(--on-surface)">
							Premium
						</h3>
					</div>
					<div className="mb-8 flex items-baseline gap-1">
						<span className="text-5xl font-headline font-black text-(--primary)">
							$149
						</span>
						<span className="text-(--on-surface-variant) font-label">
							/MONTH
						</span>
					</div>
					<div className="grow space-y-5 mb-10">
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-(--on-surface) text-sm">
								2 Personal Training Sessions/mo
							</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Priority Equipment Booking</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Physiotherapy Screening</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Recovery Lounge &amp; Cryo access</span>
						</div>
						<div className="flex items-center gap-3">
							<CheckCircle className="text-(--primary-container)" />
							<span className="text-sm">Laundry Service for Training Gear</span>
						</div>
					</div>
					<button
						type="button"
						className="w-full py-4 rounded-xl font-headline font-bold uppercase tracking-widest text-sm bg-(--surface-container-highest) text-(--on-surface) hover:bg-(--surface-bright) transition-colors"
					>
						SELECT PLAN
					</button>
				</div>
			</div>
		</section>
	);
};

export default PricingGrid;
