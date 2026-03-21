const Mission = () => {
	return (
		<section className="bg-(--surface-container-low) py-24 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
				<div>
					<h2 className="font-headline text-4xl font-black uppercase tracking-tighter mb-8 text-(--primary-container)">
						Our Mission
					</h2>
					<p className="text-3xl font-headline font-bold leading-tight text-(--on-surface) mb-6 italic">
						"WE ARE NOT A GYM. WE ARE AN IRON PARADISE ARCHITECTED FOR THOSE WHO
						DEMAND SUPERIORITY."
					</p>
					<div className="h-1 w-24 bg-(--primary) mb-8"></div>
					<p className="text-lg text-(--on-surface-variant) leading-relaxed">
						C-FIT exists to bridge the gap between amateur fitness and
						professional performance. Our philosophy combines science-backed
						programming with an industrial environment that triggers immediate
						psychological focus.
					</p>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="aspect-3/4 rounded-xl overflow-hidden mt-12">
						<img
							alt="Gym Equipment"
							className="w-full h-full object-cover"
							data-alt="Industrial gym interior with heavy duty racks"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE40TQswepKloB7RQnXccOR-RiGEoeDbHbUDZf2tTnjjw3rpttT-vBYhyhc9-ySGmqbYGZzhGm7Nxa4_WPqm4LVzRPy_UmLJloQpd2CcFtgoxHWhpDooicVIQSfeQnHXIr902zOIF4E3rqj-nTZ6KSHiT67XLm6EuGd-P3nBolwbVLNUpD5aMik5tY_ZC1dCqW8E-0DRVgDZ_N8u9HkNTh2aKIHFKBWZzCGJm13X8rHOU64kta7PND78VZBb0XkLbi_y5e3q5yq7k"
						/>
					</div>
					<div className="aspect-3/4 rounded-xl overflow-hidden">
						<img
							alt="Training"
							className="w-full h-full object-cover"
							data-alt="Athlete preparing for heavy powerlift"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsukvf2c2ecz6hh1DDYZnuC45eiBrIkUhPmMoOA4KS6HgzO4JWxz3MB212bUVaiFpj5tfU9ixTzqqoZ9VtW4Ku8F6XZXvnBDqD47vqmZHV4zOSO3_9MgFULMmgy04hn-98sLdL2CPHvpP--UU89G6d6fAyWcgSM2ZIm9qW1ShR8kfblJApP-2whb8wNQp_6u99c3_G3SfWkMha2lbPgi947XnCtvHj63TlckHtNsWYPmhClCtY_0iPyHX8mQ4C72HqQcrclFF6mhQ"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Mission;
