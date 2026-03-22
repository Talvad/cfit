const GalleryGrid = () => {
	return (
		<section className="py-20 px-6 max-w-[1400px] mx-auto">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
				{/* <!-- Main Focus Card --> */}
				<div className="md:col-span-8 group relative overflow-hidden rounded-xl aspect-video bg-(--surface-container-highest)">
					<img
						alt="Main Weight Room"
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						data-alt="Modern gym interior with heavy duty weight lifting racks"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJ_N9xep5WNFzv9DI_ft5Yl5w5kvay7wB4n8keHheYhSd4lw0CEOhSggW2hJ_pyuflqqxrYE8FhWSJH3HdHXziDDhDGlPs0dJmxISgZbX1TbdIO2XqskWpfIP-OKfpgwgha3kkgj4Yd8gM-TKQaRegM6D2VC_lR5XCzWOw517iIXr3UL5H5rO1hjPhQ6d3_OoH1-cjQbnMr7ROEMRm2Wil5ibX4q2XxgIxVlTf5ZZKU0Y-9QZGwZ_DokiZPxOMCyH5Gk_pwt-2Zi4"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-(--background)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
						<div>
							<span className="text-(--primary) font-headline font-bold uppercase tracking-widest text-xs">
								Facilities
							</span>
							<h3 className="text-2xl font-black uppercase text-(--on-surface)">
								The Iron Forge
							</h3>
						</div>
					</div>
				</div>
				{/* <!-- Secondary High Card --> */}
				<div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square md:aspect-auto bg-(--surface-container-highest)">
					<img
						alt="Dumbbell Rack"
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						data-alt="Organized row of heavy metal dumbbells in gym"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXTG3e8T1sPs5v4HaIY8qWC9-OI-fwWtk7jPZCvtw_Np1EmIUki5ms_27WH_mVFPdO0laeiQocfGDJirb9NE4dsryqeS86s-ml3g7-9m2JzH4nETam3A92Jwd8n7gSZDtLBgi6lHkW_jJ1DRb61k4MkGHrxpnbXiu2iCH9KsxDIMhA5vtGLmOIFEsa-iY4ixrXZMFd9-euQSFfpuPzuZYyGdNIiylB9y2YBMs1T7_WInbRqIbDloXAEbPW6Be0GYrgpVOSVZd_xH0"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-(--background)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
						<h3 className="text-xl font-black uppercase text-(--on-surface)">
							Precision Tools
						</h3>
					</div>
				</div>
				{/* <!-- Three Column Row --> */}
				<div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square bg-(--surface-container-highest)">
					<img
						alt="Training Session"
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						data-alt="Athlete performing high intensity functional training workout"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDw6Pc2TlW07A62CxsepWAy9fICeY6nu5dTznKdfyRHTHXwOzx6IaIeBAW0Jazp277RZ0zA6uA3CJbQewQOxupRUA3SBg5KTm9jUdH0c_DEx2X7JvTh2_ki9FfValpDetSckyuLstt1qE6M1cJYWRpGSlkU3KmcOH4Uk_KtJhm-MVDGvFynWV3JLRj6RAHrIZfi_7citlCf8uWDEzH60Ged2UxZY4WsY36vsZKkIigjY1zOYFwaa5a1CVR0vfpz8cACGb5fKYRuVYk"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-(--background)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
						<h3 className="text-xl font-black uppercase text-on-surface">
							Dynamic Force
						</h3>
					</div>
				</div>
				<div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square bg-(--surface-container-highest)">
					<div className="absolute inset-0 kinetic-gradient opacity-20 group-hover:opacity-40 transition-opacity"></div>
					<img
						alt="Boxing Area"
						className="w-full h-full object-cover mix-blend-luminosity transition-transform duration-700 group-hover:scale-110 group-hover:mix-blend-normal"
						data-alt="Professional boxing heavy bags hanging in dark gym"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbGpBzvHlt38W1xxXBUYAxATGMzy5XNFsEiR99uX6e3bn8QyS_ZFpulllXL-kDC81TBMPsynCjEhNCLs5qde4K6jQ3PUCWVBU0Rt-wCkNaQSb4PeJHbMcd5tDnQ03gvBIAsnWTj2-WA0ieGVI0fhOo8-a8BPmQ09SdS-vBy86-h8qgCOGq8NCeSnwXIuBN6A0grVQP_bSIW4zDd3f2kmCYNQ8TdmgbtYH9GFjr8y6IsztBVYP78COX3aK_WKlTM7zluoti2KI8aIo"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-(--background)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
						<h3 className="text-xl font-black uppercase text-(--on-surface)">
							The Strike Zone
						</h3>
					</div>
				</div>
				<div className="md:col-span-4 group relative overflow-hidden rounded-xl aspect-square bg-(--surface-container-highest)">
					<img
						alt="Cardio Suite"
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						data-alt="Modern row of treadmills in minimalist gym"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHVwpdWwCo8goHucJ6RIFhLJg_g9-9apz9sP_P5zg3yleLlFLYz-w84giJCsqyxw-7Irte5GkGJ41OWG2APLkEE_c7c1YJSqiAY2u43e6bMMRxuJ0iII1nvUSwbfTrOkocOpiJyYdjCQq8SA4anl325-9wNqe43hOpYl3WqV_bnIGKTb9RXgvCCvJ7wMwzLpdVnCziSU_ffmBqZhrb7dF9PCZRVrUQUFaEEPTNghacgBjNSSux6guVyiipKzLBkhEZzaOneIcjXfQ"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-(--background)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
						<h3 className="text-xl font-black uppercase text-(--on-surface)">
							Endurance Lab
						</h3>
					</div>
				</div>
				{/* <!-- Wide Bottom Card --> */}
				<div className="md:col-span-6 group relative overflow-hidden rounded-xl aspect-video bg-(--surface-container-highest)">
					<img
						alt="Stretching Area"
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
						data-alt="Spacious yoga and stretching mats area"
						src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKF5fNaSQvyhs7XFUO1v47P3IZOU_7SMjOJGRAhdyVmtrZ-dWMYxhKWdj4VgC855kcHoWUWQ170gNsdj7VycJRJjH687Uyiltz9D9Y9LUoQ4-OFEsYvcGR9yJbJbAvH3XYrnKhKOeOC_-mNwLzVDZOKkBWzwr_lW5H3xW-U8KlNBiUZROa8p3CxBi9KDXPJMFtEz9aBJE2cgNhdSo5Yr_fTP2tGoGzmUd_1K4iR8wp_d57g-5kXe53HOWwZvWtI0KL86k8GVRIGys"
					/>
					<div className="absolute inset-0 bg-linear-to-t from-(--background)/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
						<h3 className="text-2xl font-black uppercase text-(--on-surface)">
							Recovery Lounge
						</h3>
					</div>
				</div>
				{/* <!-- Stats/CTA Card --> */}
				<div className="md:col-span-6 kinetic-gradient rounded-xl p-8 flex flex-col justify-center items-start space-y-6">
					<span className="bg-(--background)/20 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest text-(--on-primary-container)">
						Live Sessions
					</span>
					<h2 className="font-headline text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none text-(--on-primary-container)">
						READY TO BECOME PART OF THE{" "}
						<span className="text-(--background)">GALLERY?</span>
					</h2>
					<p className="text-(--on-primary-container)/80 text-lg font-medium leading-relaxed max-w-md">
						Our members aren't just faces; they are the kinetic power that
						drives C-FIT. Start your transformation today.
					</p>
					<div className="flex flex-wrap gap-4 pt-4">
						<button
							type="button"
							className="bg-(--background) text-(--on-background) px-8 py-3 rounded-xl font-headline font-bold uppercase tracking-widest text-sm hover:scale-105 active:scale-95 transition-all"
						>
							BOOK A TOUR
						</button>
						<button
							type="button"
							className="border-2 border-(--background)/30 text-(--background) px-8 py-3 rounded-xl font-headline font-bold uppercase tracking-widest text-sm hover:bg-(--background)/10 transition-all"
						>
							SEE MEMBERSHIPS
						</button>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GalleryGrid;
