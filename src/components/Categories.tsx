export default function Categories() {
  const categories = [
    { name: "Rice Dishes", icon: "rice_bowl" },
    { name: "Soups & Swallow", icon: "soup_kitchen" },
    { name: "Street Food", icon: "outdoor_grill" },
    { name: "Snacks", icon: "bakery_dining" },
    { name: "Drinks", icon: "local_bar" },
  ];

  return (
    <section className="py-24 px-6 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center mb-16 space-y-2">
          <h2 className="text-3xl font-headline font-bold text-center">Explore Categories</h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {categories.map((category) => (
            <div key={category.name} className="flex flex-col items-center group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-surface-container-lowest flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                <span className="material-symbols-outlined text-4xl text-primary group-hover:text-on-primary">
                  {category.icon}
                </span>
              </div>
              <span className="mt-4 font-headline font-semibold text-sm">{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
