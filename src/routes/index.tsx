import { createFileRoute } from "@tanstack/react-router";
import Cta from "#/components/pages/home/cta";
import Founders from "#/components/pages/home/founders";
import Hero from "#/components/pages/home/hero";
import IntensityMeter from "#/components/pages/home/intensity-meter";
import Mission from "#/components/pages/home/mission";
import MissionHero from "#/components/pages/home/mission-hero";
import Protocols from "#/components/pages/home/protocols";
import ValuesBento from "#/components/pages/home/values-bento";

export const Route = createFileRoute("/")({
	head: () => ({
		meta: [
			{
				title: "Home - CFitness",
			},
		],
	}),
	component: App,
});

function App() {
	return (
		<main className="">
			<Hero />
			<Mission />
			<Protocols />
			<MissionHero />
			<ValuesBento />
			<Founders />
			<IntensityMeter />
			<Cta />
		</main>
	);
}
