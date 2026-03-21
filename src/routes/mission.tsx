import { createFileRoute } from "@tanstack/react-router";
import Founders from "#/components/pages/mission/founders";
import Hero from "#/components/pages/mission/hero";
import IntensityMeter from "#/components/pages/mission/intensity-meter";
import ValuesBento from "#/components/pages/mission/values-bento";

export const Route = createFileRoute("/mission")({
	head: () => ({
		meta: [
			{
				title: "Mission - CFitness",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="">
			<Hero />
			<ValuesBento />
			<Founders />
			<IntensityMeter />
		</main>
	);
}
