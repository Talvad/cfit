import { Link } from "@tanstack/react-router";
import { footer } from "#/resources";
export default function Footer() {
	return (
		<footer className="w-full pt-16 pb-8 bg-(--surface-container-low) relative before:content-[''] before:absolute before:top-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-(--primary-container) before:to-transparent">
			<div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
				<div className="flex flex-col gap-6">
					{footer.logo}
					{/* <div className="text-xl font-black text-(--on-surface) font-headline">
						C-FIT
					</div> */}
					<p className="text-(--surface-variant) font-body text-sm leading-relaxed">
						{footer.description}
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="text-(--primary-container) font-headline font-bold uppercase tracking-widest text-xs">
						{footer.links.title}
					</h4>
					<div className="flex flex-col gap-2">
						{footer.links.menu.map((link) => (
							<Link
								key={link.href}
								className="text-(--surface-variant) hover:text-(--on-background) font-body text-sm transition-all"
								to={link.href}
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="text-(--primary-container) font-headline font-bold uppercase tracking-widest text-xs">
						{footer.contact.title}
					</h4>
					{footer.contact.items.map((item) => (
						<p
							key={item.key}
							className="text-(--surface-variant) font-body text-sm uppercase"
						>
							{item.key}: {item.value}
						</p>
					))}
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="font-['Inter'] text-sm tracking-wide text-(--surface-variant)">
					{footer.rights.title}
				</div>
				<div className="flex gap-6">
					<span className="text-(--primary-container) font-headline font-black italic">
						{footer.rights.subtitle}
					</span>
				</div>
			</div>
		</footer>
	);
}
