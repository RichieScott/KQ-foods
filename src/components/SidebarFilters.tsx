"use client";

export default function SidebarFilters() {
  const categories = [
    { name: "Jollof & Rice", icon: "restaurant", active: true },
    { name: "Local Soups", icon: "soup_kitchen" },
    { name: "Snacks", icon: "cookie" },
    { name: "Drinks", icon: "liquor" },
  ];

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-28 space-y-8">
        <div>
          <h3 className="font-headline font-bold text-lg mb-4">Categories</h3>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li key={cat.name}>
                <button className={`w-full text-left px-4 py-2.5 rounded-xl flex items-center gap-3 transition-all ${
                  cat.active 
                    ? "bg-white text-orange-700 font-bold shadow-sm" 
                    : "text-zinc-600 hover:bg-zinc-200/50"
                }`}>
                  <span className="material-symbols-outlined text-xl">{cat.icon}</span>
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg mb-4">Price Range</h3>
          <div className="px-2">
            <input 
              className="w-full h-1.5 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary" 
              type="range"
              min="500"
              max="10000"
            />
            <div className="flex justify-between mt-2 text-xs font-label text-outline uppercase tracking-wider">
              <span>₦500</span>
              <span>₦10,000+</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg mb-4">Rating</h3>
          <div className="space-y-2">
            {[4.5, 4.0].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="rounded border-outline-variant text-primary focus:ring-primary transition-all"
                  defaultChecked={rating === 4.5}
                />
                <span className="flex items-center text-sm text-on-surface">
                  {rating}+ 
                  <span className="material-symbols-outlined text-sm ml-1 text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-headline font-bold text-lg mb-4">Location</h3>
          <select className="w-full bg-surface-container-low border-none rounded-xl text-sm py-3 px-4 focus:ring-2 focus:ring-primary/20 outline-none">
            <option>Lagos, Nigeria</option>
            <option>Abuja, FCT</option>
            <option>Port Harcourt</option>
            <option>Ibadan</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
