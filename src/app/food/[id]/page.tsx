"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { supabase } from "@/lib/supabase";
import { useParams } from "next/navigation";

export default function FoodDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  
  const [food, setFood] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function fetchFood() {
      const { data, error } = await supabase
        .from('foods')
        .select(`
          *,
          sellers (
            business_name,
            rating,
            description,
            location
          )
        `)
        .eq('id', id)
        .single();
      
      if (error) {
        console.error("Error fetching food:", error);
      } else {
        setFood(data);
      }
      setLoading(false);
    }

    if (id) fetchFood();
  }, [id]);

  const handleAddToCart = () => {
    if (!food) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: food.id,
        name: food.name,
        price: Number(food.price),
        vendor: food.sellers.business_name,
        sellerId: food.seller_id,
        image: food.image_url
      });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center pt-32">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!food) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-32">
          <h1 className="text-2xl font-bold font-headline">Food not found</h1>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 pt-32 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Image Display */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl border border-outline-variant/10">
              <img src={food.image_url} alt={food.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>

          {/* Info Details */}
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  {food.category}
                </span>
                <span className="text-on-surface-variant text-xs">•</span>
                <span className="text-on-surface-variant text-xs font-medium">{food.preparation_time} mins prep</span>
              </div>
              <h1 className="text-5xl font-headline font-black tracking-tight leading-tight text-on-surface">{food.name}</h1>
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-black text-primary">₦{Number(food.price).toLocaleString()}</span>
                <span className="text-on-surface-variant line-through text-lg">₦{(Number(food.price) * 1.2).toLocaleString()}</span>
              </div>
            </div>

            <p className="text-on-surface-variant text-lg leading-relaxed font-body">
              {food.description || "No description available for this delicious meal."}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <div className="flex items-center bg-surface-container-high rounded-full p-1 w-full sm:w-auto">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container-lowest transition-colors"
                >
                  <span className="material-symbols-outlined">remove</span>
                </button>
                <span className="px-8 font-bold text-xl">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-sm hover:brightness-110 transition-all font-bold"
                >
                  <span className="material-symbols-outlined">add</span>
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className="w-full sm:flex-1 bg-primary text-on-primary py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Add to Feast
              </button>
            </div>

            <div className="p-6 bg-surface-container-low rounded-xl flex items-center justify-between border border-outline-variant/10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-surface-container-highest flex items-center justify-center text-primary overflow-hidden">
                  <span className="material-symbols-outlined text-2xl">chef_hat</span>
                </div>
                <div>
                  <h4 className="font-headline font-bold text-lg">{food.sellers.business_name}</h4>
                  <p className="text-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {food.sellers.location}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="font-bold text-lg">{food.sellers.rating}</span>
                </div>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Top Seller</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <section className="mt-20 space-y-8 border-t border-outline-variant/10 pt-20">
          <div className="flex items-end justify-between">
            <div>
              <h3 className="text-3xl font-headline font-black tracking-tight">Foodie Feedback</h3>
              <p className="text-on-surface-variant font-medium mt-1">What others are saying about this delicacy.</p>
            </div>
            <button className="text-primary font-bold hover:underline decoration-2 underline-offset-4">Read All Reviews</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 italic text-on-surface-variant leading-relaxed">
              "The flavors are incredibly authentic. It reminds me of home. The spice level was perfect!"
              <div className="mt-6 flex items-center gap-3 not-italic">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">SO</div>
                <span className="font-bold text-on-surface">Simi O.</span>
              </div>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm border border-outline-variant/10 italic text-on-surface-variant leading-relaxed">
              "Fast delivery and the food was still piping hot. Definitely ordering again next weekend."
              <div className="mt-6 flex items-center gap-3 not-italic">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-primary font-bold">KJ</div>
                <span className="font-bold text-on-surface">Kelechi J.</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
