const Hero = () => {
	return (
		<section className="relative h-[409px] flex items-end px-8 pb-12 overflow-hidden bg-(--surface-container-low)">
			<div className="absolute inset-0 z-0">
				<img
					className="w-full h-full object-cover opacity-40"
					alt="Dark industrial gym interior with red lighting"
					data-alt="Dark industrial gym interior with red lighting"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDV_H7nFf5xLBtYmmMNLxQ8h9mXSfVn1M4HX4FrUpRYYorKTXrx6Gj-xsrl31_z3qqymKH2slj0GaMmPY380Y8O1MF3k4iXo4_01VR5jx9GbdG3rtYmls9JrONfZaliJ0cIAU01lAAB8MeoqJcAlIVx4oNsWMmkAGpJTIoAFb8tt-p8dMXjjHm6J3qDTgNd1G8oIpBY83cdJC3Ba1wb-uBDC7_6jbAQf7pLe4ZQBkjMBEw-HfFjobviI8xYgpZzCxipWI_krbA3K2U"
				/>
				<div className="absolute inset-0 bg-linear-to-t from-(--background) via-transparent to-transparent"></div>
			</div>
			<div className="relative z-10 max-w-7xl mx-auto w-full">
				<h1 className="font-headline text-5xl md:text-7xl font-black uppercase tracking-tighter text-(--on-background)">
					GET IN <span className="text-(--primary-container)">TOUCH</span>
				</h1>
				<p className="font-body text-lg text-(--secondary) mt-4 max-w-xl">
					Join the elite powerhouse. Reach out for memberships, personal
					training, or to tour our kinetic industrial facility.
				</p>
			</div>
		</section>
	);
};

export default Hero;
