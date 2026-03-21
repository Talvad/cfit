export default function Footer() {
	return (
		<footer className="w-full pt-16 pb-8 bg-(--surface-container-low) relative before:content-[''] before:absolute before:top-0 before:w-full before:h-px before:bg-linear-to-r before:from-transparent before:via-(--primary-container) before:to-transparent">
			<div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
				<div className="flex flex-col gap-6">
					<div className="text-xl font-black text-(--on-surface) font-headline">
						C-FIT
					</div>
					<p className="text-(--surface-variant) font-body text-sm leading-relaxed">
						The premier destination for high-intensity athletic performance. We
						redefine the physical limit through industrial excellence.
					</p>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="text-(--primary-container) font-headline font-bold uppercase tracking-widest text-xs">
						Explore
					</h4>
					<div className="flex flex-col gap-2">
						<a
							className="text-(--surface-variant) hover:text-(--on-background) font-body text-sm transition-all"
							href="#"
						>
							Careers
						</a>
						<a
							className="text-(--surface-variant) hover:text-(--on-background) font-body text-sm transition-all"
							href="#"
						>
							Location
						</a>
						<a
							className="text-(--surface-variant) hover:text-(--on-background) font-body text-sm transition-all"
							href="#"
						>
							Privacy Policy
						</a>
						<a
							className="text-(--surface-variant) hover:text-(--on-background) font-body text-sm transition-all"
							href="#"
						>
							Terms of Service
						</a>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<h4 className="text-(--primary-container) font-headline font-bold uppercase tracking-widest text-xs">
						Contact Us
					</h4>
					<p className="text-(--surface-variant) font-body text-sm">
						HEADQUARTERS: KANNAGNAGAM, KK.
					</p>
					<p className="text-(--surface-variant) font-body text-sm">
						EMAIL: ASCEND@C-FIT.COM
					</p>
					<div className="flex gap-4 mt-4">
						<span className="material-symbols-outlined text-(--surface-variant) hover:text-(--primary) cursor-pointer">
							share
						</span>
						<span className="material-symbols-outlined text-(--surface-variant) hover:text-(--primary) cursor-pointer">
							public
						</span>
					</div>
				</div>
			</div>
			<div className="max-w-7xl mx-auto px-8 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="font-['Inter'] text-sm tracking-wide text-(--surface-variant)">
					© 2024 C-FIT. ALL RIGHTS RESERVED.
				</div>
				<div className="flex gap-6">
					<span className="text-(--primary-container) font-headline font-black italic">
						FORCE. FLOW. FINISH.
					</span>
				</div>
			</div>
		</footer>
	);
}
