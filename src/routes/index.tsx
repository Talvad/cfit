import { createFileRoute } from "@tanstack/react-router";
import Cta from "#/components/pages/home/cta";
import Hero from "#/components/pages/home/hero";
import Mission from "#/components/pages/home/mission";
import Protocols from "#/components/pages/home/protocols";

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
			<Cta />
		</main>
	);
}
