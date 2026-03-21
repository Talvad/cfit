import { createFileRoute } from "@tanstack/react-router";
import Hero from "#/components/pages/hero";

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
			<section className="h-screen">
				<h1 className="text-6xl font-bold">CFIT</h1>
			</section>
		</main>
	);
}
