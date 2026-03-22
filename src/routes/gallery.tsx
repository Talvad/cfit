import { createFileRoute } from "@tanstack/react-router";
import GalleryGrid from "#/components/pages/gallery/gallery-grid";
import Hero from "#/components/pages/gallery/hero";
import Signature from "#/components/pages/gallery/signature";

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
		<main className="">
			<Hero />
			<GalleryGrid />
			<Signature />
		</main>
	);
}
