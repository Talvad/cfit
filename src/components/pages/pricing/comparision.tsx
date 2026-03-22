import { CheckCircle } from "lucide-react";

const Comparision = () => {
	return (
		<section className="py-24 bg-(--surface-container-lowest)">
			<div className="max-w-5xl mx-auto px-6">
				<h2 className="font-headline text-3xl font-black uppercase mb-12 text-center">
					Detailed Comparison
				</h2>
				<div className="overflow-x-auto">
					<table className="w-full text-left">
						<thead>
							<tr className="border-b border-white/5">
								<th className="py-6 px-4 font-headline uppercase text-(--on-surface-variant)">
									Feature
								</th>
								<th className="py-6 px-4 font-headline uppercase text-(--primary)">
									Basic
								</th>
								<th className="py-6 px-4 font-headline uppercase text-(--primary)">
									Standard
								</th>
								<th className="py-6 px-4 font-headline uppercase text-(--primary)">
									Premium
								</th>
							</tr>
						</thead>
						<tbody className="text-on-surface">
							<tr className="border-b border-white/5">
								<td className="py-6 px-4 font-semibold">24/7 Access</td>
								<td className="py-6 px-4">
									<CheckCircle className="text-(--primary)" />
								</td>
								<td className="py-6 px-4">
									<CheckCircle className="text-(--primary)" />
								</td>
								<td className="py-6 px-4">
									<CheckCircle className="text-(--primary)" />
								</td>
							</tr>
							<tr className="border-b border-white/5">
								<td className="py-6 px-4 font-semibold">Group Classes</td>
								<td className="py-6 px-4 text-(--on-surface-variant) opacity-30">
									—
								</td>
								<td className="py-6 px-4">Unlimited</td>
								<td className="py-6 px-4">Unlimited</td>
							</tr>
							<tr className="border-b border-white/5">
								<td className="py-6 px-4 font-semibold">Personal Training</td>
								<td className="py-6 px-4 text-(--on-surface-variant) opacity-30">
									—
								</td>
								<td className="py-6 px-4 text-(--on-surface-variant) opacity-30">
									—
								</td>
								<td className="py-6 px-4">2 / Month</td>
							</tr>
							<tr className="border-b border-white/5">
								<td className="py-6 px-4 font-semibold">Recovery Zone</td>
								<td className="py-6 px-4 text-(--on-surface-variant) opacity-30">
									—
								</td>
								<td className="py-6 px-4">Sauna Only</td>
								<td className="py-6 px-4">Full Suite</td>
							</tr>
							<tr>
								<td className="py-6 px-4 font-semibold">Guest Passes</td>
								<td className="py-6 px-4 text-(--on-surface-variant) opacity-30">
									—
								</td>
								<td className="py-6 px-4">1 / Month</td>
								<td className="py-6 px-4">4 / Month</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default Comparision;
