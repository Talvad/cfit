import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/pages/contact/hero";
import Location from "#/components/pages/contact/location";
import MapComp from "#/components/pages/contact/map-comp";

export const Route = createFileRoute("/contact")({
	head: () => ({
		meta: [
			{
				title: "Contact - CFitness",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="">
			<Hero />
			<Location />
			<MapComp />
		</main>
	);
}
