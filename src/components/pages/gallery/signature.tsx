import { Cog, Dumbbell, Timer, Users } from "lucide-react";

const Signature = () => {
	return (
		<section className="bg-(--surface-container-low) py-24">
			<div className="max-w-7xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
					<div className="max-w-2xl">
						<h2 className="font-headline text-5xl font-black uppercase tracking-tighter mb-4">
							ENGINEERED <br />
							<span className="text-(--primary-container)">FOR IMPACT</span>
						</h2>
						<div className="h-1 w-24 bg-(--primary-container)"></div>
					</div>
					<p className="text-(--on-surface-variant) uppercase text-sm font-bold tracking-[0.2em]">
						Crafted Experience / Professional Standards
					</p>
				</div>
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div className="space-y-4">
						<div className="aspect-square bg-(--surface) rounded-xl flex items-center justify-center p-8 group">
							<Dumbbell className="size-15 text-(--primary-container) group-hover:scale-110 transition-transform" />
						</div>
						<h4 className="font-headline font-black uppercase tracking-tighter text-center">
							Elite Gear
						</h4>
					</div>
					<div className="space-y-4">
						<div className="aspect-square bg-(--surface) rounded-xl flex items-center justify-center p-8 group">
							<Timer className="size-15 text-(--primary-container) group-hover:scale-110 transition-transform" />
						</div>
						<h4 className="font-headline font-black uppercase tracking-tighter text-center">
							24/7 Access
						</h4>
					</div>
					<div className="space-y-4">
						<div className="aspect-square bg-(--surface) rounded-xl flex items-center justify-center p-8 group">
							<Users className="size-15 text-(--primary-container) group-hover:scale-110 transition-transform" />
						</div>
						<h4 className="font-headline font-black uppercase tracking-tighter text-center">
							Pro Coaching
						</h4>
					</div>
					<div className="space-y-4">
						<div className="aspect-square bg-(--surface) rounded-xl flex items-center justify-center p-8 group">
							<Cog className="size-15 text-(--primary-container) group-hover:scale-110 transition-transform" />
						</div>
						<h4 className="font-headline font-black uppercase tracking-tighter text-center">
							Climate Control
						</h4>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Signature;
