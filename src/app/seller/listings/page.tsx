"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Plus, Search, Filter, MoreVertical, Utensils } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ManageListingsPage() {
  const [foods, setFoods] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const sellerId = '00000000-0000-0000-0000-000000000001'; // Chef Lola

  useEffect(() => {
    async function fetchFoods() {
      try {
        const { data, error } = await supabase
          .from('foods')
          .select('*')
          .eq('seller_id', sellerId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFoods(data || []);
      } catch (error) {
        console.error("Fetch Foods Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchFoods();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;
    
    try {
      const { error } = await supabase
        .from('foods')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFoods(foods.filter(f => f.id !== id));
    } catch (error) {
      console.error("Delete Error:", error);
      alert("Failed to delete listing.");
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-6 pb-12 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Manage Listings</h3>
          <p className="text-on-surface-variant mt-1">Review and update your culinary collection.</p>
        </div>
        <Link 
          href="/seller/add-food"
          className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2 w-fit"
        >
          <Plus className="h-4 w-4" />
          Add New Dish
        </Link>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-container-low p-4 rounded-xl">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20" 
            placeholder="Search listings..." 
            type="text"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-lg border border-stone-100 text-sm font-medium hover:bg-stone-50 transition-colors">
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-lg border border-stone-100 text-sm font-medium hover:bg-stone-50 transition-colors">
            Sort
          </button>
        </div>
      </div>

      {/* Listings Table */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-stone-100">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-stone-400 font-bold text-[10px] uppercase tracking-widest border-b border-stone-100">
                <th className="px-6 py-4">Dish Details</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-50">
              {foods.map((food) => (
                <tr key={food.id} className="hover:bg-stone-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={food.image_url} alt={food.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-on-surface">{food.name}</p>
                        <p className="text-[11px] text-stone-400 uppercase tracking-tighter">ID: {food.id.substring(0, 8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium px-2 py-1 bg-surface-container-high rounded-md text-on-surface-variant">
                      {food.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-sm">{formatCurrency(food.price)}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <span className={`w-2 h-2 rounded-full ${food.availability ? 'bg-green-500' : 'bg-stone-300'}`}></span>
                       <span className="text-xs font-medium">{food.availability ? 'Live' : 'Hidden'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        className="p-2 text-stone-400 hover:text-primary hover:bg-orange-50 rounded-lg transition-all"
                        onClick={() => router.push(`/seller/edit-food/${food.id}`)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-stone-400 hover:text-error hover:bg-error/5 rounded-lg transition-all"
                        onClick={() => handleDelete(food.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {foods.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-stone-400">
                    <Utensils className="h-16 w-16 mx-auto mb-4 opacity-10" />
                    <p className="text-lg font-medium">No listings found</p>
                    <p className="text-sm">Start by adding your first signature dish!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
