import { createFileRoute } from "@tanstack/react-router";
import Comparision from "#/components/pages/pricing/comparision";
import Cta from "#/components/pages/pricing/cta";
import Hero from "#/components/pages/pricing/hero";
import PricingGrid from "#/components/pages/pricing/pricing-grid";

export const Route = createFileRoute("/pricing")({
	head: () => ({
		meta: [
			{
				title: "Pricing - CFitness",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="">
			<Hero />
			<PricingGrid />
			<Comparision />
			<Cta />
		</main>
	);
}
