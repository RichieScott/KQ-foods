export default function Hero() {
  return (
    <section className="relative min-h-[870px] flex items-center px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="z-10 space-y-8">
          <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-xs font-bold tracking-widest uppercase font-label">The Digital Artisan Hub</span>
          <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tight leading-[1.1] text-on-surface">
            Delicious <span className="text-primary italic">Nigerian</span> Meals Delivered to You
          </h1>
          <p className="text-lg text-on-surface-variant max-w-md leading-relaxed">
            Experience the authentic taste of home with curated recipes from Nigeria's finest local vendors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
            <div className="relative flex-grow">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" placeholder="Find your favorite food" type="text"/>
            </div>
            <button className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
              Order Now
            </button>
          </div>
        </div>
        <div className="relative lg:h-[600px] flex items-center justify-center">
          <div className="absolute inset-0 bg-primary-container/10 rounded-[3rem] rotate-3 -z-10 scale-105"></div>
          <img alt="Nigerian Jollof Rice with Suya" className="rounded-[2rem] object-cover h-[500px] w-full shadow-2xl rotate-[-2deg] hover:rotate-0 transition-all duration-500" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNLUGWSTZEAaeJCBz2PvrztDu9KSZJX_QeZeMtdoxZMvq65rIO2qqRpszGFQf5XtrKSBz95cLhu2WmKrwI-zwmNPSzTTswBezAHOsB47NxhO89it8gWW2m9n-JNwHuo3eowJxP9norVm2xZOx1Qhmih4Ewfw1WaZkE1x-b_IMeNBvBBQALyCQEaSRUCtVA7Wyf0eef3zIXU_axLm_0VFYYhGuQFWDRtJAryrP5RRIf6ZxqFhUhg0bxXUoUmFHneTr-OQn6kHhQ2Xo"/>
          <div className="absolute -bottom-8 -left-8 p-6 bg-surface-container-lowest rounded-2xl shadow-xl max-w-[200px] hidden md:block">
            <div className="flex items-center gap-2 mb-2">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="font-bold">4.9 Rating</span>
            </div>
            <p className="text-xs text-on-surface-variant leading-tight">Authentic Smoky Taste from Lagos Main Market</p>
          </div>
        </div>
      </div>
    </section>
  );
}
