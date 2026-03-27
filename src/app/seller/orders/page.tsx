"use client";

import React, { useEffect, useState } from "react";
import { Check, Clock, Truck, Package, Search, Filter, MoreVertical, XCircle, ChevronDown } from "lucide-react";
import { supabase } from "@/lib/supabase";

const statusColors: Record<string, string> = {
  pending: "bg-orange-100 text-orange-800",
  preparing: "bg-blue-100 text-blue-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

export const dynamic = 'force-dynamic';

export default function ManageOrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const sellerId = '00000000-0000-0000-0000-000000000001'; // Chef Lola

  useEffect(() => {
    async function fetchOrders() {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, users!orders_buyer_id_fkey(full_name, email, phone)')
          .eq('seller_id', sellerId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (error) {
        console.error("Fetch Orders Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      
      const currentOrder = orders.find(o => o.id === orderId);
      if (currentOrder && currentOrder.users?.email) {
        try {
          await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              to: currentOrder.users.email,
              subject: `Order Update - #${orderId.slice(0, 8)}`,
              html: `
                <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                  <h1 style="color: #ea580c; text-align: center;">KQ Foods</h1>
                  <h2 style="text-align: center;">Your feast is ${newStatus}!</h2>
                  <p>Great news! Your order <strong>#${orderId.slice(0, 8)}</strong> is now <strong>${newStatus}</strong>.</p>
                  <div style="text-align: center; margin: 30px 0;">
                    <a href="${typeof window !== 'undefined' ? window.location.origin : ''}/orders/${orderId}" style="background-color: #ea580c; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; border-radius: 50px;">Track Progress</a>

                  </div>
                  <p style="font-size: 12px; color: #666; text-align: center;">Get ready to enjoy your meal!</p>
                </div>
              `
            })
          });
        } catch (e) {
          console.error("Status update email failed", e);
        }
      }

      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    } catch (error) {
      console.error("Update Status Error:", error);
      alert("Failed to update order status.");
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
          <h3 className="font-headline text-3xl font-bold text-on-surface tracking-tight">Orders Management</h3>
          <p className="text-on-surface-variant mt-1">Accept and process your culinary commissions.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-container text-on-secondary-container px-6 py-2.5 rounded-full font-semibold text-sm hover:opacity-90 transition-opacity">
            Daily Summary
          </button>
        </div>
      </div>

       {/* Toolbar */}
       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-surface-container-low p-4 rounded-xl">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input 
            className="w-full pl-10 pr-4 py-2 bg-surface-container-lowest border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
            placeholder="Search order ID or customer..." 
            type="text"
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-lg border border-stone-100 text-sm font-medium hover:bg-stone-50 transition-colors">
            <Filter className="h-4 w-4" />
            Recently Created
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-surface-container-lowest rounded-2xl shadow-sm border border-stone-100 overflow-hidden group hover:border-primary/20 transition-all duration-300">
            <div className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Order Identity */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center text-primary-dim">
                    <Package className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                       <h4 className="font-bold text-lg">ORD-{order.id.substring(0, 8)}</h4>
                       <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${statusColors[order.status] || "bg-stone-100"}`}>
                        {order.status}
                       </span>
                    </div>
                    <p className="text-xs text-stone-500 font-medium">Placed on {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="lg:border-l lg:pl-6 border-stone-100">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Customer</p>
                  <p className="text-sm font-bold">{order.users?.full_name || "Guest User"}</p>
                  <p className="text-xs text-stone-500">{order.users?.phone || "No phone provided"}</p>
                </div>

                {/* Amount */}
                <div className="lg:border-l lg:pl-6 border-stone-100">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-xl font-headline font-extrabold text-primary-dim">{formatCurrency(order.total_price)}</p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 lg:border-l lg:pl-6 border-stone-100">
                  {order.status === 'pending' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'preparing')}
                      className="flex-1 lg:flex-none px-6 py-2.5 bg-primary text-on-primary rounded-full text-xs font-bold hover:bg-primary-dim transition-all active:scale-95 shadow-lg shadow-primary/10"
                    >
                      Accept Order
                    </button>
                  )}
                  {order.status === 'preparing' && (
                    <button 
                      onClick={() => updateStatus(order.id, 'delivered')}
                      className="flex-1 lg:flex-none px-6 py-2.5 bg-green-600 text-white rounded-full text-xs font-bold hover:bg-green-700 transition-all active:scale-95"
                    >
                      Mark Delivered
                    </button>
                  )}
                  <button className="p-2.5 bg-stone-100 text-stone-600 rounded-full hover:bg-stone-200 transition-all">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Quick Summary Footer */}
            <div className="px-6 py-3 bg-stone-50/50 flex items-center justify-between border-t border-stone-50">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500">
                    <Clock className="h-3.5 w-3.5" />
                    PREP TIME: 45 MINS
                 </div>
                 <div className="flex items-center gap-1.5 text-[11px] font-bold text-stone-500">
                    <Truck className="h-3.5 w-3.5" />
                    DELIVERY: ARTISAN PARTNER
                 </div>
              </div>
              <button className="text-[10px] font-bold text-primary uppercase tracking-widest hover:underline">
                View Full Order Details
              </button>
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <div className="py-24 text-center bg-surface-container-lowest rounded-2xl border border-stone-100">
             <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 opacity-70">
                <Clock className="h-8 w-8 text-stone-400" />
             </div>
             <p className="text-lg font-bold text-on-surface">No orders yet</p>
             <p className="text-sm text-on-surface-variant max-w-xs mx-auto mt-1">Incoming culinary commissions will appear here for you to accept and prepare.</p>
          </div>
        )}
      </div>
    </div>
  );
}
