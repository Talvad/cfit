import { Mail, MapPin, Phone } from "lucide-react";

const Location = () => {
	return (
		<section className="max-w-7xl mx-auto px-8 py-20">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
				{/* <!-- Contact Info & Location Column --> */}
				<div className="lg:col-span-5 space-y-8">
					{/* <!-- Address Card --> */}
					<div className="bg-(--surface-container) p-8 rounded-xl border-l-4 border-(--primary-container)">
						<div className="flex items-start gap-4">
							<MapPin className="text-(--primary-container) size-7.5" />

							<div>
								<h3 className="font-headline font-bold text-xl uppercase tracking-tight text-(--on-surface)">
									Base of Operations
								</h3>
								<p className="text-(--secondary) mt-2 leading-relaxed">
									888 Kinetic Way, Industrial District
									<br />
									Steel City, SC 45021
								</p>
							</div>
						</div>
					</div>
					{/* <!-- Direct Contact Card --> */}
					<div className="bg-(--surface-container-high) p-8 rounded-xl">
						<h3 className="font-headline font-bold text-xl uppercase tracking-tight text-(--on-surface) mb-6">
							Direct Lines
						</h3>
						<div className="space-y-6">
							<div className="flex items-center gap-4 group cursor-pointer">
								<Phone className="text-(--primary) group-hover:scale-110 transition-transform" />

								<div>
									<p className="text-xs uppercase tracking-widest text-(--outline) font-bold">
										Phone
									</p>
									<p className="text-(--on-surface) font-headline font-bold text-lg">
										+1 (555) KINETIC
									</p>
								</div>
							</div>
							<div className="flex items-center gap-4 group cursor-pointer">
								<Mail className="text-(--primary) group-hover:scale-110 transition-transform" />

								<div>
									<p className="text-xs uppercase tracking-widest text-(--outline) font-bold">
										Email
									</p>
									<p className="text-(--on-surface) font-headline font-bold text-lg">
										HQ@C-FIT.COM
									</p>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- Training Hours --> */}
					<div className="bg-(--surface-container-low) p-8 rounded-xl border border-white/5">
						<h3 className="font-headline font-bold text-xl uppercase tracking-tight text-(--on-surface) mb-4">
							The Forge Hours
						</h3>
						<ul className="space-y-3 font-body">
							<li className="flex justify-between items-center border-b border-white/5 pb-2">
								<span className="text-(--secondary)">Mon - Fri</span>
								<span className="text-(--on-surface) font-bold">
									04:00 - 23:00
								</span>
							</li>
							<li className="flex justify-between items-center border-b border-white/5 pb-2">
								<span className="text-(--secondary)">Saturday</span>
								<span className="text-(--on-surface) font-bold">
									06:00 - 20:00
								</span>
							</li>
							<li className="flex justify-between items-center pb-2">
								<span className="text-(--secondary)">Sunday</span>
								<span className="text-(--primary-container) font-black">
									MEMBERS ONLY (24H)
								</span>
							</li>
						</ul>
					</div>
				</div>
				{/* <!-- Form Column --> */}
				<div className="lg:col-span-7 bg-(--surface-container-highest) p-10 rounded-xl relative overflow-hidden shadow-2xl">
					<div className="absolute top-0 right-0 p-8 opacity-5 select-none">
						<span className="font-headline text-9xl font-black">FIT</span>
					</div>
					<h2 className="font-headline text-3xl font-black uppercase tracking-tighter text-(--on-surface) mb-8">
						Secure Your Station
					</h2>
					<form className="space-y-6">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							<div className="space-y-2">
								<label
									htmlFor="name"
									className="text-xs uppercase tracking-widest font-bold text-(--outline)"
								>
									Full Name
								</label>
								<input
									id="name"
									className="w-full bg-(--surface-container-low) border-none border-b-2 border-transparent focus:border-(--primary) focus:ring-0 text-(--on-surface) p-4 rounded-lg transition-all"
									placeholder="Enter name"
									type="text"
								/>
							</div>
							<div className="space-y-2">
								<label
									htmlFor="email"
									className="text-xs uppercase tracking-widest font-bold text-(--outline)"
								>
									Email Address
								</label>
								<input
									id="email"
									className="w-full bg-(--surface-container-low) border-none border-b-2 border-transparent focus:border-(--primary) focus:ring-0 text-(--on-surface) p-4 rounded-lg transition-all"
									placeholder="Enter email"
									type="email"
								/>
							</div>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="type"
								className="text-xs uppercase tracking-widest font-bold text-(--outline)"
							>
								Inquiry Type
							</label>
							<select
								id="type"
								className="w-full bg-(--surface-container-low) border-none border-b-2 border-transparent focus:border-(--primary) focus:ring-0 text-(--on-surface) p-4 rounded-lg transition-all appearance-none"
							>
								<option>Membership Plans</option>
								<option>Personal Training</option>
								<option>Corporate Packages</option>
								<option>Facility Tour</option>
							</select>
						</div>
						<div className="space-y-2">
							<label
								htmlFor="message"
								className="text-xs uppercase tracking-widest font-bold text-(--outline)"
							>
								Message
							</label>
							<textarea
								id="message"
								className="w-full bg-(--surface-container-low) border-none border-b-2 border-transparent focus:border-(--primary) focus:ring-0 text-(--on-surface) p-4 rounded-lg transition-all resize-none"
								placeholder="How can we help you reach peak performance?"
								rows={5}
							></textarea>
						</div>
						<button
							className="w-full heat-gradient py-5 rounded-full font-headline font-black text-(--on-primary-container) uppercase tracking-widest text-lg hover:brightness-110 active:scale-95 transition-all shadow-xl"
							type="submit"
						>
							INITIATE CONTACT
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Location;
