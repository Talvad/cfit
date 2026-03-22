const SuccessStories = () => {
	return (
		<section className="py-24 bg-(--background)">
			<div className="max-w-7xl mx-auto px-6">
				<div className="mb-16 flex items-end justify-between">
					<div>
						<h2 className="text-5xl font-headline font-black uppercase tracking-tighter">
							MEMBER <span className="text-(--primary) italic">VOICES</span>
						</h2>
						<div className="h-1 w-24 kinetic-gradient mt-4"></div>
					</div>
					<p className="hidden md:block text-(--on-surface-variant) max-w-sm text-sm">
						Real stories from real people who decided that average wasn't
						enough.
					</p>
				</div>
				<div className="space-y-32">
					{/* <!-- Story 1 --> */}
					<div className="flex flex-col md:flex-row items-center gap-12 group">
						<div className="w-full md:w-5/12 relative">
							<div className="absolute -top-4 -left-4 w-full h-full border-2 border-(--primary)/20 rounded-xl group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
							<img
								alt="Sarah Story"
								className="relative z-10 w-full aspect-4/5 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
								data-alt="Portrait of an athletic woman in gym attire"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzdUsOUxT0sgQbIuBo0Rt-3QIRgrBRlssT5MjPnzke8jVdPHvaIi41ZDjJvpHXOfhADMmyxZ_pPV1fsaFlo3JePq-x1QCHfvskbVuXISJha1xsEutmtNBixNUdKADl3JAuZ4k91Kx9qGbuXaXsbd7Mt4QsLmNsdeCchG2-CpzVVUnT6LiggBr_35Dt0QR8jIDVO0jL3zfSQ4LApDy5HiBx9PmI8_qHa6ohEeko4n5K2okpjH7asud8br97K0Fi747JaSJN430e3cU"
							/>
						</div>
						<div className="w-full md:w-7/12">
							<span className="font-headline font-bold text-(--primary) tracking-widest uppercase text-sm">
								Transformation: 12 Months
							</span>
							<h3 className="text-6xl font-headline font-black uppercase tracking-tighter mt-4 mb-6 leading-none">
								SARAH <span className="text-(--primary)">M.</span>
							</h3>
							<blockquote className="text-2xl italic font-light text-(--on-surface) mb-8 border-l-4 border-(--primary) pl-6">
								"C-FIT didn't just change my body; it changed my mindset. I
								walked in wanting to lose weight and walked out a competitive
								powerlifter."
							</blockquote>
							<div className="grid grid-cols-2 gap-8 py-8 border-t border-white/5">
								<div>
									<p className="text-xs font-headline uppercase font-bold text-(--on-surface-variant) tracking-widest">
										Squat PR
									</p>
									<p className="text-3xl font-headline font-black text-(--on-surface) mt-1">
										285 LBS
									</p>
								</div>
								<div>
									<p className="text-xs font-headline uppercase font-bold text-(--on-surface-variant) tracking-widest">
										Body Fat %
									</p>
									<p className="text-3xl font-headline font-black text-(--on-surface) mt-1">
										-14%
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- Story 2 --> */}
					<div className="flex flex-col md:flex-row-reverse items-center gap-12 group">
						<div className="w-full md:w-5/12 relative">
							<div className="absolute -top-4 -right-4 w-full h-full border-2 border-(--primary)/20 rounded-xl group-hover:-translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>
							<img
								alt="James Story"
								className="relative z-10 w-full aspect-4/5 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-700"
								data-alt="Strong male athlete resting between sets"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuBuxIFKiC5EB3Xium8rRJWrPJFDiu9BmQ-N7OFm4v3GTDQmcL715EugFxIaWQlkEnsZPdvIjFGnRQucFYw7BG3Txb0EuNZNTsG7Pn7hJop3WeaypAJSC5-BEcUsXlq0Z7ixcknVi5AFTHk5NKGn3y6Cs0Jn544dSsFUfHYk9q5aZRKi0Imvv0Qx4E4k4cuIqoY3ow5cd1Xz-0QG2Xr4X9CzCkW_PefYeUbckjfDUuXHWKgy-KL3ov7pmELCuv_fsuQLqbfe8aXhsvU"
							/>
						</div>
						<div className="w-full md:w-7/12">
							<span className="font-headline font-bold text-(--primary) tracking-widest uppercase text-sm">
								Transformation: 8 Months
							</span>
							<h3 className="text-6xl font-headline font-black uppercase tracking-tighter mt-4 mb-6 leading-none text-right">
								JAMES <span className="text-(--primary)">K.</span>
							</h3>
							<blockquote className="text-2xl italic font-light text-(--on-surface) mb-8 border-r-4 border-(--primary) pr-6 text-right">
								"The community here is relentless. When you see everyone else
								pushing at 110%, you have no choice but to keep up. My energy
								levels have doubled."
							</blockquote>
							<div className="grid grid-cols-2 gap-8 py-8 border-t border-white/5 text-right">
								<div>
									<p className="text-xs font-headline uppercase font-bold text-(--on-surface-variant) tracking-widest">
										Lean Muscle Gained
									</p>
									<p className="text-3xl font-headline font-black text-(--on-surface) mt-1">
										+18 LBS
									</p>
								</div>
								<div>
									<p className="text-xs font-headline uppercase font-bold text-(--on-surface-variant) tracking-widest">
										Resting Heart Rate
									</p>
									<p className="text-3xl font-headline font-black text-(--on-surface) mt-1">
										48 BPM
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SuccessStories;
