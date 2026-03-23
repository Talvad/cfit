import { Factory, Group, Zap } from "lucide-react";

const ValuesBento = () => {
	return (
		<section className="py-24 bg-(--surface-container-low)">
			<div className="container mx-auto px-6">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
					<div className="md:col-span-8 bg-(--surface-container-highest) p-12 rounded-xl flex flex-col justify-end min-h-[400px] relative overflow-hidden group">
						<div className="absolute top-0 right-0 p-8">
							<Zap className="text-(--primary) size-15 opacity-20 group-hover:opacity-100 transition-opacity" />
						</div>
						<h3 className="text-4xl font-headline font-extrabold uppercase mb-4 text-(--on-surface)">
							Uncompromising Intensity
						</h3>
						<p className="text-(--on-surface-variant) text-lg max-w-lg">
							We believe that growth happens at the edge of discomfort. Our
							methodology pushes the boundaries of human performance through
							scientifically-backed high-intensity protocols.
						</p>
					</div>
					<div className="md:col-span-4 heat-gradient p-12 rounded-xl flex flex-col justify-between min-h-[400px]">
						<Factory className="text-(--on-primary-container) size-12" />

						<div>
							<h3 className="text-3xl font-headline font-extrabold uppercase mb-4 text-(--on-primary-container)">
								Industrial Precision
							</h3>
							<p className="text-(--on-primary-container)/80 text-lg">
								Every movement, every rep, every breath is measured. We treat
								fitness as an engineering challenge.
							</p>
						</div>
					</div>
					<div className="md:col-span-4 bg-(--surface-container) p-12 rounded-xl border border-white/5">
						<Group className="text-(--primary) size-12 mb-6" />
						<h3 className="text-2xl font-headline font-extrabold uppercase mb-4 text-(--on-surface)">
							Elite Collective
						</h3>
						<p className="text-(--on-surface-variant)">
							Culture is our strongest asset. At C-FIT, you are surrounded by a
							brotherhood of high-performers who hold each other to the highest
							standard.
						</p>
					</div>
					<div className="md:col-span-8 bg-(--surface) p-12 rounded-xl flex items-center gap-8 border border-white/5">
						<div
							className="hidden lg:block w-1/3 h-48 bg-[url('image-equipment-detail')] bg-cover rounded-lg"
							data-alt="Close up of heavy duty gym iron plates"
						></div>
						<div className="flex-1">
							<h3 className="text-2xl font-headline font-extrabold uppercase mb-4 text-(--on-surface)">
								The Iron Paradise
							</h3>
							<p className="text-(--on-surface-variant)">
								Our facility is designed to be a sanctuary of focus. No
								distractions, no gimmicks—just world-class equipment and the
								atmosphere of a high-performance lab.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ValuesBento;
