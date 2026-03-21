import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/pages/hero";
import Mission from "#/components/pages/mission";
import Protocols from "#/components/pages/protocols";

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
		</main>
	);
}
