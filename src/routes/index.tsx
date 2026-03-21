import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/pages/hero";
import Mission from "#/components/pages/mission";

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
			<section className="h-screen">
				<h1 className="text-6xl font-bold">CFIT</h1>
			</section>
		</main>
	);
}
