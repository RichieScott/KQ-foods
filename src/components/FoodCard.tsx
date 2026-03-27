"use client";

import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface FoodCardProps {
  id: string;
  name: string;
  price: string;
  numericPrice?: number;
  vendor: string;
  sellerId: string;
  rating: string;
  image: string;
  tag?: string;
  tagColor?: string;
}

export default function FoodCard({
  id,
  name,
  price,
  numericPrice,
  vendor,
  sellerId,
  rating,
  image,
  tag,
  tagColor = "bg-primary",
}: FoodCardProps) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({
      id,
      name,
      price: numericPrice || parseInt(price.replace(/[^\d]/g, "")),
      vendor,
      sellerId,
      image,
    });
  };
  return (
    <article className="bg-surface-container-lowest rounded-xl overflow-hidden group hover:shadow-xl hover:shadow-orange-900/5 transition-all duration-500 flex flex-col h-full">
      <div className="relative h-56 overflow-hidden">
        <img 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
          src={image}
        />
        {tag && (
          <div className="absolute top-4 left-4">
            <span className={`${tagColor}/90 backdrop-blur-md text-on-primary text-[10px] font-label font-bold uppercase tracking-widest px-3 py-1.5 rounded-full`}>
              {tag}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-10 h-10 rounded-full bg-white/80 backdrop-blur shadow-sm flex items-center justify-center text-error hover:scale-110 transition-transform">
            <span className="material-symbols-outlined">favorite</span>
          </button>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-headline font-bold text-xl leading-tight">{name}</h2>
          <div className="flex items-center gap-1 bg-primary-container/10 px-2 py-1 rounded-lg">
            <span className="material-symbols-outlined text-sm text-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span className="text-xs font-bold text-primary">{rating}</span>
          </div>
        </div>
        <p className="text-on-surface-variant text-sm mb-4">By {vendor}</p>
        <div className="mt-auto flex justify-between items-center pt-4 border-t border-surface-container">
          <div className="flex flex-col">
            <span className="text-[10px] text-outline font-label uppercase tracking-tighter">Starting at</span>
            <span className="text-lg font-bold text-on-background">{price}</span>
          </div>
          <button 
            onClick={handleAdd}
            className="bg-primary hover:bg-primary-dim text-on-primary rounded-full px-6 py-2.5 font-bold text-sm active:scale-95 transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
            Add
          </button>
        </div>
      </div>
    </article>
  );
}
