"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SidebarFilters from "@/components/SidebarFilters";
import FoodCard from "@/components/FoodCard";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFoods() {
      const { data, error } = await supabase
        .from('foods')
        .select(`
          *,
          sellers (
            business_name,
            rating
          )
        `);
      
      if (error) {
        console.error("Error fetching foods:", error);
      } else {
        setFoods(data || []);
      }
      setLoading(false);
    }

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(food => 
    food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    food.sellers?.business_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Sub-header with Search */}
      <div className="fixed top-20 w-full z-40 bg-surface/80 backdrop-blur-xl border-b border-surface-container py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input 
                type="text"
                placeholder="Search for delicacies..."
                className="w-full bg-surface-container-high rounded-lg py-2 pl-10 pr-4 outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 transition-all text-sm border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="hidden md:flex items-center gap-3 ml-4">
            <button className="p-2 rounded-full hover:bg-orange-50 text-orange-700 active:scale-95 transition-all"><span className="material-symbols-outlined">filter_list</span></button>
            <button className="p-2 rounded-full hover:bg-orange-50 text-orange-700 active:scale-95 transition-all"><span className="material-symbols-outlined">grid_view</span></button>
          </div>
        </div>
      </div>

      <main className="pt-40 pb-32 max-w-7xl mx-auto px-6 flex gap-8">
        <SidebarFilters />
        
        <section className="flex-1">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-background">Artisan Market</h1>
              <p className="text-on-surface-variant mt-1">Discover curated Nigerian flavors from local kitchens.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredFoods.map((food) => (
              <FoodCard 
                key={food.id} 
                id={food.id}
                name={food.name}
                price={`₦${food.price.toLocaleString()}`}
                numericPrice={food.price}
                vendor={food.sellers?.business_name || "Unknown Vendor"}
                sellerId={food.seller_id}
                rating={food.sellers?.rating?.toString() || "0.0"}
                image={food.image_url}
                tag={food.category === 'Main Course' ? 'Bestseller' : undefined}
              />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
