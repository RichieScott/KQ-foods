"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function PopularFoods() {
  const { addToCart } = useCart();

  const foods = [
    {
      id: "pop-1",
      name: "Party Smoky Jollof Rice",
      price: "₦4,500",
      numericPrice: 4500,
      description: "Served with grilled peppered chicken and sweet fried plantains.",
      vendor: "Mama T's Kitchen",
      rating: "4.8",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAv8vo9fVMhXNESKM6oN330_A4N7KntTsIsn0wZMKP-_MzAOWSENcEojZWwbkOr-rixYEgZDCR5s_MTal0tc7kPcrl6EbSkHCqQJAv8UbhHJre4uQ_bGly5Ba5PepDzJl025jwd-RW5sGkIZoizWfx66PE_hnTgO3QECgKXiNROjxNdZsShp99cwgG3xRLx7JjGuGVubseopaRjyMvidVrZu4JPaO98JcvcWn4z_xsIZs4lpPdZcbnKY8wSy7tpf7GJUAO7BDCZ15c",
      bestseller: true,
      colSpan: "md:col-span-2"
    },
    {
      id: "pop-2",
      name: "Egusi with Pounded Yam",
      price: "₦5,200",
      numericPrice: 5200,
      vendor: "Lagos Kitchen",
      rating: "4.9",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLt6TaStKwRKOteElS2haNTruk0prgK8nUwmDea0sqCfVinyghvw-mYbws9q_y7xr86q7YM3_vZM9eVjh1ClHq9vO7ffuPGdAiMwdcNPFvBtlhdaYxYGI6G8TPXMoJbI858KvCPsMcxwGWqTXfj6LR8rYbpzEwvZFUC2lmBWhBdFdz8UNf1w3dSvQ-5dArS3JjiAqXHU9fBi7Y7AhGWIGK2INwGcbWOfXYNohqmpGL0Vaa8-Bh8KhqAvOWp3-tAMa4qEpT4mIjKXs"
    },
    {
      id: "pop-3",
      name: "Akara & Custard",
      price: "₦1,200",
      numericPrice: 1200,
      vendor: "Morning Treats",
      rating: "4.7",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3oJuWpo3UjQtoRAVMpmvpOIW4cmkdYFK2tbKRBuFolgaUicZ9qIFJD7Fs7jwCmcH4frGMUK_OT7b3YLFFHQGgq-9NypmL4pjqsT_udYSepEjic8-89UrnfPIqEA3bzUy9PN3AHbcaMq7-oQ-0zL5unaz_L08CPPSto1FG4P5SLKMIDkNREl_Dz7lLDceYjQUPrm2_v3A1e0BEJpW9VloeVcsfXZG4int7ZRFXWwClyb0SwoUxUK0-reOVER2N6BiTanxKdPeXfSk"
    },
    {
      id: "pop-4",
      name: "Sweet Puff Puff (12pcs)",
      price: "₦800",
      numericPrice: 800,
      vendor: "The Snack Hub",
      rating: "4.6",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZmAk9jAYIHciqQOa91OHIEVO7ZHN0_-BxGw1uF_0oxyhWR_j1qzU-we86Jd6lDnIQpHEbc9l9jz8cotNWbrLUY_-pqEqi2huXmb4-ZRlBEi3sgZYujUjJXryN1TIMBurIuCAmSDyQeGuMiOjzNiq6rITQjvcOzFcW2UzXPB5TPVybWMTmOuYVAQVPMD58ajB5muXoAteu-tNtPF9eY4NEZaytGQc75NnTa9O43zZiwGMwF6QqY0bkX7maNUNo2by8bUaTwVjyUU4"
    },
    {
      id: "pop-5",
      name: "Peppered Asun Platter",
      price: "₦6,000",
      numericPrice: 6000,
      description: "Slow-grilled goat meat chopped and sautéed in spicy habanero sauce.",
      vendor: "Grill Master Lagos",
      rating: "5.0",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCWSkMJpat-Lp8tKTBbcnp8C40xup4fDk1JxmRSJdc_Si0txpBBE2K-RKo-y7mdie77sSlMYEogyof0vXa2A_0hlgsRq_sLcrAnbDCPvkQFHV-UehFu7ZL_0-z1iRSQRZzZgFh5MBGQzjM_jw_XXqaST-uZe8-6gSm8ZhH1vVlrMSehbY210dMHAsGbrRHp4MgUmN2f7SeQ8m5tA0Xtcd5KtnqyXacBN-522HlLJw0Za_tsmEYbMTxJlRdzfLFlPUP762FBBWCHFe8",
      colSpan: "lg:col-span-2"
    },
    {
      id: "pop-6",
      name: "Traditional Abacha",
      price: "₦2,500",
      numericPrice: 2500,
      vendor: "Igbo Flavors",
      rating: "4.8",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCk1E4uYOOK4ReN6UzyEI59AuZd9qyXv-_EFG9YdUpjDJZykhcbTVZ3Igv4cWvDVXOiHbED2YC6k7YdCC7nCUAz9i_NcdNnHiOaPpQOJcbcxWL7Qs_tQEXnlbsGMma575vffO7fzLOR9CKZ0ygMIkPFSs_DyhLrFZNi9_vSCqWaDB0PdslWhZk9IhNM9uikkwKw5vcHKEcSvI2cT09LDckESzJ5JrcNj_C7rg409gcYIXr1V1sQ9QVzIFtsKRJIEYNvy2dlhozMeN4"
    }
  ];

  const handleAdd = (food: any) => {
    addToCart({
      id: food.id,
      name: food.name,
      price: food.numericPrice,
      vendor: food.vendor,
      image: food.image
    });
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-headline font-extrabold tracking-tight">Popular Foods</h2>
          <p className="text-on-surface-variant mt-2">The most loved dishes by our community this week.</p>
        </div>
        <Link href="/marketplace" className="text-primary font-bold flex items-center gap-1 hover:gap-2 transition-all cursor-pointer">
          View All <span className="material-symbols-outlined">chevron_right</span>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {foods.map((food, idx) => (
          <div key={idx} className={`group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col ${food.colSpan || ''}`}>
            <div className="relative h-64 overflow-hidden">
              <img alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={food.image}/>
              {food.bestseller && (
                <div className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full text-on-primary text-xs font-bold uppercase">Bestseller</div>
              )}
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className={`${food.colSpan ? 'text-xl' : 'text-lg'} font-headline font-bold`}>{food.name}</h3>
                <span className="text-primary font-black text-lg">{food.price}</span>
              </div>
              {food.description && <p className="text-sm text-on-surface-variant mb-4">{food.description}</p>}
              
              <div className="mt-auto pt-4 border-t border-surface-container">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest"></div>
                    <span className="text-xs font-semibold">{food.vendor}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-orange-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-xs font-bold">{food.rating}</span>
                  </div>
                </div>
                <button 
                  onClick={() => handleAdd(food)}
                  className="w-full bg-primary text-on-primary py-2 rounded-full font-bold text-sm hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
