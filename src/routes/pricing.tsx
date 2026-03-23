import { createFileRoute } from "@tanstack/react-router";
import Comparision from "#/components/pages/pricing/comparision";
import Cta from "#/components/pages/pricing/cta";
import Hero from "#/components/pages/pricing/hero";
import Location from "#/components/pages/pricing/location";
import MapComp from "#/components/pages/pricing/map-comp";
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
			<Location />
			<MapComp />
			<Cta />
		</main>
	);
}
