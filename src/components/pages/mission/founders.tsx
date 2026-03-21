const Founders = () => {
	return (
		<section className="py-32 bg-(--background) relative overflow-hidden">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-linear-to-r from-transparent via-(--primary)/30 to-transparent"></div>
			<div className="container mx-auto px-6">
				<div className="flex flex-col md:flex-row gap-20 items-center">
					<div className="w-full md:w-1/2 relative">
						<div className="aspect-4/5 bg-(--surface-container-highest) rounded-xl overflow-hidden relative">
							<img
								alt="C-FIT Founders"
								className="w-full h-full object-cover grayscale contrast-125"
								data-alt="Two professional athletic gym founders standing in industrial setting"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuAhemGMiVCch5BW4F-HYYcv3RppBniN3vg83iq1WBg_DZwaWl-RsGIyVb6c7oiHzeHE4sc0TvEfQR5j-L8upFHB9VLHrvPkXbpUbf5ha5yIgsILtU_hVqwW_vs-EZkHLLjOs11xdgUt5Qb8Zyvlh-bM4xQA1ECaolC_NgXmgdR9qt17MY3Edu0GiLcEiYVqNn9Ooj4ZB84nB-IBZZxqh_FUQFPUnauZfcPpqNsKSzAi07YyHkvRIcN_q3DhFIcjkdjf1_pHioCQpUU"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-(--background) via-transparent to-transparent"></div>
						</div>
						{/* <!-- Power Card Overlay --> */}
						<div className="absolute -bottom-10 -right-6 md:right-10 obsidian-glass p-8 rounded-xl border border-white/10 max-w-xs shadow-2xl">
							<p className="italic font-body text-(--on-surface-variant) leading-relaxed">
								"We founded C-FIT because we were tired of soft gyms. We wanted
								a place that respected the grind."
							</p>
							<div className="mt-6">
								<p className="font-headline font-bold text-(--primary) uppercase tracking-wider">
									Marcus &amp; Elena Vance
								</p>
								<p className="text-xs text-(--on-surface)/60 uppercase tracking-widest">
									Founders &amp; Visionaries
								</p>
							</div>
						</div>
					</div>
					<div className="w-full md:w-1/2">
						<h2 className="text-5xl font-headline font-black uppercase text-(--on-background) mb-12 tracking-tighter">
							The Vision <br />
							Behind the Steel
						</h2>
						<div className="space-y-8">
							<div>
								<h4 className="text-(--primary) font-headline font-bold uppercase mb-2">
									Dedicated to the Craft
								</h4>
								<p className="text-(--on-surface-variant) leading-relaxed">
									With over 20 years of combined experience in competitive
									athletics and sports science, Marcus and Elena created C-FIT
									to bridge the gap between boutique luxury and raw training
									intensity.
								</p>
							</div>
							<div>
								<h4 className="text-(--primary) font-headline font-bold uppercase mb-2">
									A Culture of Excellence
								</h4>
								<p className="text-(--on-surface-variant) leading-relaxed">
									Our founders believe that fitness is the foundation of a
									disciplined life. Every program at C-FIT is hand-crafted to
									build mental toughness alongside physical dominance.
								</p>
							</div>
							<div className="pt-8">
								<div className="w-24 h-1 bg-(--primary) mb-4"></div>
								<p className="text-sm uppercase tracking-[0.4em] font-headline font-bold text-(--on-surface)/40">
									Established 2018
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Founders;
