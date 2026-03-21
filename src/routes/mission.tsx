import { createFileRoute } from "@tanstack/react-router";

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
		<main className="page-wrap px-4 pb-8 pt-14">
			<section className="h-screen">
				<h1 className="text-6xl font-bold">Mission</h1>
			</section>
		</main>
	);
}
