"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, Users, Star, IndianRupee, Plus, ArrowUpward, MoreVertical, Utensils, MessageSquare, Megaphone, ArrowForward } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function SellerDashboardPage() {
  const [stats, setStats] = useState({
    totalSales: 0,
    activeOrders: 0,
    rating: 4.9,
    revenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Hardcoded for MVP Seller: Chef Lola (00000000-0000-0000-0000-000000000001)
  const sellerId = '00000000-0000-0000-0000-000000000001';

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        // 1. Fetch Stats
        const { data: orders, error: ordersError } = await supabase
          .from('orders')
          .select('*')
          .eq('seller_id', sellerId);

        if (ordersError) throw ordersError;

        const totalRevenue = orders.reduce((acc, curr) => acc + (curr.total_price || 0), 0);
        const activeOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;

        setStats({
          totalSales: orders.length,
          activeOrders: activeOrdersCount,
          rating: 4.9, // Mock for now
          revenue: totalRevenue,
        });

        // 2. Fetch Recent Orders with Buyer info
        const { data: recent, error: recentError } = await supabase
          .from('orders')
          .select('*, users!orders_buyer_id_fkey(full_name, email)')
          .eq('seller_id', sellerId)
          .order('created_at', { ascending: false })
          .limit(5);

        if (recentError) throw recentError;
        setRecentOrders(recent);

      } catch (error) {
        console.error("Dashboard Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

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
    <div className="px-6 pb-12 max-w-7xl mx-auto space-y-10">
      {/* Welcome Header */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h3 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Welcome back, Kitchen Master</h3>
          <p className="text-on-surface-variant mt-1">Here's what's happening in your kitchen today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
            Download Report
          </button>
          <Link 
            href="/seller/add-food"
            className="bg-primary text-on-primary px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Listing
          </Link>
        </div>
      </section>

      {/* Summary Stats Bento Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-none relative overflow-hidden">
          <TrendingUp className="absolute top-4 right-4 text-orange-200 h-10 w-10 opacity-50" />
          <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Total Sales</p>
          <h4 className="text-3xl font-headline font-bold text-on-surface mt-2">{stats.totalSales}</h4>
          <p className="text-xs text-green-600 font-medium mt-2 flex items-center">
            <ArrowUpward className="h-3 w-3 mr-1" />
            12% from last month
          </p>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-none">
          <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Active Orders</p>
          <h4 className="text-3xl font-headline font-bold text-on-surface mt-2">{stats.activeOrders}</h4>
          <div className="flex -space-x-2 mt-3">
            <div className="w-6 h-6 rounded-full border-2 border-white bg-orange-100 flex items-center justify-center text-[10px] font-bold">JD</div>
            <div className="w-6 h-6 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-[10px] font-bold">AS</div>
            <div className="w-6 h-6 rounded-full border-2 border-white bg-orange-200 flex items-center justify-center text-[10px] font-bold">+2</div>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-none">
          <p className="text-stone-500 font-bold uppercase tracking-widest text-[10px]">Seller Rating</p>
          <div className="flex items-end gap-2 mt-2">
            <h4 className="text-3xl font-headline font-bold text-on-surface">{stats.rating}</h4>
            <div className="flex mb-1 text-orange-400">
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
              <Star className="h-4 w-4 fill-current" />
            </div>
          </div>
          <p className="text-xs text-on-surface-variant font-medium mt-2">Elite Kitchen Status</p>
        </div>

        <div className="bg-primary text-on-primary p-6 rounded-xl shadow-sm border-none relative overflow-hidden">
          <p className="text-orange-200 font-bold uppercase tracking-widest text-[10px]">Total Revenue</p>
          <h4 className="text-3xl font-headline font-bold mt-2 truncate">{formatCurrency(stats.revenue)}</h4>
          <p className="text-xs text-orange-100 font-medium mt-2">Next payout: Friday</p>
        </div>
      </section>

      {/* Main Dashboard Layout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h4 className="font-headline text-xl font-bold">Recent Orders</h4>
            <Link href="/seller/orders" className="text-primary font-semibold text-sm hover:underline">View All</Link>
          </div>
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-stone-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-stone-400 font-bold text-[10px] uppercase tracking-widest border-b border-stone-100">
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Total</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-50">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-stone-50/50 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center font-bold text-xs text-stone-600">
                            {order.users?.full_name?.charAt(0) || "B"}
                          </div>
                          <div>
                            <p className="text-sm font-bold">{order.users?.full_name || "Guest"}</p>
                            <p className="text-[10px] text-stone-400 truncate w-24">ORD-{order.id.substring(0, 5)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">{formatCurrency(order.total_price)}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          order.status === 'pending' ? 'bg-orange-100 text-orange-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {order.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-stone-400 hover:text-primary transition-colors">
                          <MoreVertical className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-stone-400">
                        <Utensils className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>No orders yet. They'll appear here once they start coming in!</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
            <h4 className="font-headline text-lg font-bold">Quick Actions</h4>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/seller/add-food" className="flex items-center gap-4 p-3 bg-surface-container-lowest rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Plus className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold">Add New Listing</p>
                  <p className="text-[10px] text-stone-500">Create a new menu item</p>
                </div>
              </Link>
              <button className="flex items-center gap-4 p-3 bg-surface-container-lowest rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold">View Messages</p>
                  <p className="text-[10px] text-stone-500">Customer chats</p>
                </div>
              </button>
              <button className="flex items-center gap-4 p-3 bg-surface-container-lowest rounded-lg hover:bg-orange-50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-stone-200 flex items-center justify-center text-stone-700 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold">Create Promo</p>
                  <p className="text-[10px] text-stone-500">Launch a discount</p>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border-none overflow-hidden relative">
            <div className="relative z-10">
              <h4 className="font-headline text-lg font-bold">Chef's Insight</h4>
              <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
                Demand for <span className="text-primary font-bold">Smoked Jollof</span> is up by <span className="text-primary font-bold">40%</span> in your area this weekend.
              </p>
              <button className="mt-4 text-xs font-bold text-primary flex items-center gap-1 group">
                Analyze Trends
                <ArrowForward className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="absolute -bottom-6 -right-6 opacity-5">
              <Utensils className="h-32 w-32" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
