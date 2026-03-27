export default function FeaturedSellers() {
  const sellers = [
    {
      name: "Mama T's Kitchen",
      specialty: "Specialist in Rice & Stews",
      rating: "4.9",
      orders: "1.2k+",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8HIkcvZz11FB9jT4UmipushaVabt1WQ0jw5gv718vu3rz5__tPCeflAx8oUAkIkp2EJHX48FDxdrohShzpeRgk52xIsF1SUZpqTqK-9jomfQktFu8nCPyGoAP23Hlne0alSn-0bYw95_cjY_Z-vjO1ReFQmdmTFXE86qbf_Z9vie7oxh0IAdIUddZ6s5Pqkj6R5iiuhXXdqVfWDQC4rKppI3xCQmOIHhs0r-36QLos19_jdgj8FfC0OKc7yvi5-m8CC8oVrLFJGY"
    },
    {
      name: "Grill Master Lagos",
      specialty: "Native Grills & Barbecue",
      rating: "4.8",
      orders: "850",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfaEfRm7kCdM1GzJOCbbL19QlCiQ-wtwNpPLfu8Hi0GCYP8N_ZHRv2JVQDV9Hovczv1i_qA_exBUJN8YlC5frLLWZkaOmDkdxCh9PWd7qqwizx6Ge8Lfc8tJqax_3sGX2iUYxfVaX5hP8em9Wdf-E9D7krdsAX4tv0Fw5-We8G1sLEho7OYPP9G1fXs3V-wbXRk8MO7W3d4eUEnre1qgUzkyxGgg5_cO934wC8okCdbisUtY3qqKQlMKZOTlA4KSN8CWMypMIX3A4"
    },
    {
      name: "The Snack Hub",
      specialty: "Pastries & Street Snacks",
      rating: "4.7",
      orders: "2.1k",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8i9LXGD91kABU9MCz6UcePZkJ67MnuAfpeCcmWoCotktScAwjt3PRdFcn7oSskrK1qNdM3Ylkpx3N_Ce2tZ5isHlVENMMHc6I3bOjZ0Myqgb9EeP8iOv2s69bLQPT4fFrRf2VacCWoeUlxMue-alOMrurnJT7ffHqFOl9MIOjdxj1Bnq5dFcRZ21CzKwwZQ-FT263eKdQhv4IqPEDqT0PckR7Tkjp_MF2DXGRkb0z4HaFnbqmEhJm8Y56qoTJ8bSrP1N0CEQriEY"
    },
    {
      name: "Igbo Flavors",
      specialty: "Authentic Southeast Soups",
      rating: "4.9",
      orders: "500",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRC0Yrpg7ov0G0JnYC_IcVCZdVZ7yDHY-tKFqUHPUHK-iTTof-ebx9i4fZyzIEqXP57e7T5QVLwVU9o2vxtCg5JNf4rf21UCP4Lb0t2LeTH6bgG8AHrfzninS-qNQESNoL8U3m2kfjM7eFT0VW-ksCydXgPxO7OnaGx_Dy8FGEX9i0gw0SvUX4zG1Wt2US-URG1ggVEZK3GWivjbnDymPXr5fM-Rie89M_PXro9kE55GPW0hsW4S9ByNqj2RdzMpqZGuF3t_Iq2Ik"
    }
  ];

  return (
    <section className="py-24 px-6 bg-surface-container">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-headline font-bold">Top Featured Sellers</h2>
          <p className="text-on-surface-variant">Highly-rated artisans bringing the best tastes to your doorstep.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sellers.map((seller) => (
            <div key={seller.name} className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 rounded-full bg-orange-100 mb-4 overflow-hidden ring-4 ring-primary-container/20">
                <img alt={seller.name} className="w-full h-full object-cover" src={seller.image}/>
              </div>
              <h4 className="font-headline font-bold">{seller.name}</h4>
              <p className="text-xs text-on-surface-variant mb-4">{seller.specialty}</p>
              <div className="flex items-center gap-1 bg-secondary-container px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="text-xs font-bold text-on-secondary-container">{seller.rating} ({seller.orders} Orders)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
