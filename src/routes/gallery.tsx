import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
	head: () => ({
		meta: [
			{
				title: "Gallery - CFitness",
			},
		],
	}),
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main className="page-wrap px-4 pb-8 pt-14">
			<section className="h-screen">
				<h1 className="text-6xl font-bold">Gallery</h1>
			</section>
		</main>
	);
}
