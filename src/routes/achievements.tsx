import { createFileRoute } from "@tanstack/react-router";
import Awards from "#/components/pages/achievements/awards";
import Cta from "#/components/pages/achievements/cta";
import Hero from "#/components/pages/achievements/hero";
import Stats from "#/components/pages/achievements/stats";
import SuccessStories from "#/components/pages/achievements/success-stories";

export const Route = createFileRoute("/achievements")({
	head: () => ({
		meta: [
			{
				title: "Achievements - CFitness",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="">
			<Hero />
			<Stats />
			<SuccessStories />
			<Awards />
			<Cta />
		</main>
	);
}
