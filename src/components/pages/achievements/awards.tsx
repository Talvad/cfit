import { BadgeCheck, Boxes, Medal } from "lucide-react";

const Awards = () => {
	return (
		<section className="py-24 bg-(--surface-container)">
			<div className="max-w-7-xl mx-auto px-6">
				<div className="text-center mb-16">
					<h2 className="text-4xl font-headline font-black uppercase tracking-tighter">
						GYM <span className="text-(--primary) italic">ACCOLADES</span>
					</h2>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
					<div className="text-center group">
						<div className="w-24 h-24 mx-auto mb-6 bg-(--surface-container-highest) rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
							<Medal className="size-9 text-(--primary)" />
						</div>
						<h4 className="font-headline font-black uppercase text-xl mb-2">
							Best Gym 2023
						</h4>
						<p className="text-sm text-(--on-surface-variant)">
							Voted #1 Training Facility by City Athletics Association.
						</p>
					</div>
					<div className="text-center group">
						<div className="w-24 h-24 mx-auto mb-6 bg-(--surface-container-highest) rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
							<BadgeCheck className="size-9 text-(--primary)" />
						</div>
						<h4 className="font-headline font-black uppercase text-xl mb-2">
							Elite Certified
						</h4>
						<p className="text-sm text-(--on-surface-variant)">
							All trainers are IFBB &amp; NASM Master Certified level or higher.
						</p>
					</div>
					<div className="text-center group">
						<div className="w-24 h-24 mx-auto mb-6 bg-(--surface-container-highest) rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
							<Boxes className="size-9 text-(--primary)" />
						</div>
						<h4 className="font-headline font-black uppercase text-xl mb-2">
							Community First
						</h4>
						<p className="text-sm text-(--on-surface-variant)">
							Over $50k raised for local athletic youth scholarships.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Awards;
