"use client";

import SellerSidebar from "@/components/SellerSidebar";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function SellerDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeOrders: 0,
    rating: 4.9,
    revenue: "₦0"
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    // In a real app, fetch statistics and recent orders from Supabase
    setStats({
      totalSales: 1284,
      activeOrders: 24,
      rating: 4.9,
      revenue: "₦842,000"
    });

    setRecentOrders([
      { id: "ORD-9421", customer: "Emeka Okafor", items: "Jollof Party Pack (L)", amount: "₦14,500", status: "NEW" },
      { id: "ORD-9388", customer: "Amara Wilson", items: "Egusi Soup with Pounded Yam", amount: "₦8,200", status: "PREPARING" },
      { id: "ORD-9350", customer: "Kelechi B.", items: "Suya Grilled Chicken Box", amount: "₦12,000", status: "OUT FOR DELIVERY" }
    ]);
  }, []);

  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <SellerSidebar />
      
      <main className="md:ml-64 min-h-screen">
        {/* Top App Bar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-sm border-b border-stone-200 dark:border-stone-800">
          <div className="flex justify-between items-center px-6 py-3 w-full">
            <div className="flex items-center gap-4">
              <span className="md:hidden material-symbols-outlined text-stone-600">menu</span>
              <h2 className="font-headline font-semibold tracking-tight text-orange-800 dark:text-orange-400">Editorial Gastronomy</h2>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-stone-200/50 dark:bg-stone-800/50 rounded-full px-4 py-1.5">
                <span className="material-symbols-outlined text-stone-500 text-sm mr-2">search</span>
                <input className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface" placeholder="Search orders..." type="text"/>
              </div>
              <div className="flex gap-2">
                <button className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-colors active:scale-95 duration-200">
                  <span className="material-symbols-outlined">notifications</span>
                </button>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                MT
              </div>
            </div>
          </div>
        </header>

        {/* Canvas Area */}
        <div className="pt-24 px-6 pb-12 max-w-7xl mx-auto space-y-10">
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h3 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Welcome back</h3>
              <p className="text-on-surface-variant mt-1">Here's what's happening in your kitchen today.</p>
            </div>
            <div className="flex gap-3">
              <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2">
                <span className="material-symbols-outlined text-lg">add</span>
                New Listing
              </button>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm relative overflow-hidden">
              <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Total Sales</p>
              <h4 className="text-3xl font-headline font-bold text-on-surface mt-2">{stats.totalSales}</h4>
              <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
                <span className="material-symbols-outlined text-xs mr-1">arrow_upward</span>
                12% from last month
              </p>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
              <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Active Orders</p>
              <h4 className="text-3xl font-headline font-bold text-on-surface mt-2">{stats.activeOrders}</h4>
            </div>
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm">
              <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Total Reviews</p>
              <div className="flex items-end gap-2 mt-2">
                <h4 className="text-3xl font-headline font-bold text-on-surface">{stats.rating}</h4>
                <div className="flex mb-1 text-orange-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-primary text-on-primary p-6 rounded-xl shadow-sm">
              <p className="text-orange-200 font-bold uppercase tracking-widest text-[10px]">Revenue This Month</p>
              <h4 className="text-3xl font-headline font-bold mt-2">{stats.revenue}</h4>
            </div>
          </section>

          {/* Recent Orders */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 space-y-4">
              <h4 className="font-headline text-xl font-bold">Recent Orders</h4>
              <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-stone-100">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-stone-400 font-bold text-[10px] uppercase tracking-widest border-b border-stone-100">
                      <th className="px-6 py-4">Customer</th>
                      <th className="px-6 py-4">Items</th>
                      <th className="px-6 py-4">Amount</th>
                      <th className="px-6 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-50">
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-stone-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold">{order.customer}</p>
                          <p className="text-[10px] text-stone-400">{order.id}</p>
                        </td>
                        <td className="px-6 py-4 text-xs">{order.items}</td>
                        <td className="px-6 py-4 text-sm font-medium">{order.amount}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            order.status === 'NEW' ? 'bg-orange-100 text-orange-800' : 
                            order.status === 'PREPARING' ? 'bg-blue-100 text-blue-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chef's Insight */}
            <div className="bg-surface-container-low p-6 rounded-xl space-y-4 border border-stone-100">
              <h4 className="font-headline text-lg font-bold">Chef's Insight</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Demand for <span className="text-primary font-bold">Smoked Jollof</span> is up by <span className="text-primary font-bold">40%</span> in your area this weekend. Consider a "Weekend Bundle" to maximize sales.
              </p>
              <button className="text-xs font-bold text-primary flex items-center gap-1 group">
                Analyze Trends
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
