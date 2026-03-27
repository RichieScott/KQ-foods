"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { CheckCircle, Utensils, Bike, Home, Clock, MapPin, MessageSquare, Star, Send } from "lucide-react";

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);
  
  // Rating states
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingRating, setExistingRating] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*, sellers(*), order_items(*, foods(*))')
          .eq('id', params.id)
          .single();

        if (error) throw error;
        if (data) {
          setOrder(data);
          setStatus(data.status);
          
          // Fetch existing rating
          const { data: ratingData } = await supabase
            .from('ratings')
            .select('*')
            .eq('order_id', params.id)
            .maybeSingle();
          
          if (ratingData) setExistingRating(ratingData);
        }
      } catch (err) {
        console.error("Fetch Order Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();

    // Subscribe to real-time status updates
    const channel = supabase
      .channel(`order-tracking-${params.id}`)
      .on(
        'postgres_changes',
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'orders',
          filter: `id=eq.${params.id}`
        },
        (payload) => {
          setStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.id]);

  const handleRate = async () => {
    if (rating === 0) return alert("Please select a star rating");
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase
        .from('ratings')
        .insert({
          order_id: params.id,
          buyer_id: order.buyer_id,
          seller_id: order.seller_id,
          rating,
          comment
        })
        .select()
        .single();
      
      if (error) throw error;
      setExistingRating(data);
      
      // Update seller average rating (simplified for MVP: just one new rating added)
      // In production, use a RPC call or DB trigger
    } catch (err) {
      console.error(err);
      alert("Failed to submit rating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: "pending", label: "Order Placed", desc: "Received and awaiting kitchen confirmation", icon: CheckCircle, done: ["pending", "preparing", "shipped", "delivered"].includes(status) },
    { id: "preparing", label: "Preparing", desc: "Our chef is layering the spices perfectly", icon: Utensils, done: ["preparing", "shipped", "delivered"].includes(status), active: status === "preparing" },
    { id: "shipped", label: "Out for Delivery", desc: "A rider is bringing your feast to you", icon: Bike, done: ["shipped", "delivered"].includes(status), active: status === "shipped" },
    { id: "delivered", label: "Delivered", desc: "Enjoy your authentic Nigerian meal!", icon: Home, done: status === "delivered", active: status === "delivered" },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-surface items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!order) return null;

  const subtotal = order.order_items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
  const deliveryFee = order.total_price - subtotal;

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body text-on-background">
      <Navbar />
      
      <main className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
        <section className="mb-12">
          <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase font-label mb-2 block">Order #{params.id.substring(0, 8)}</span>
          <h2 className="text-4xl md:text-5xl font-extrabold font-headline text-on-surface tracking-tight mb-4">Track Your Feast</h2>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-sm font-semibold">
              {status === 'pending' ? 'Waiting for confirmation' : 
               status === 'preparing' ? 'Food is being prepared' :
               status === 'shipped' ? 'Rider is on the way' :
               'Your feast has arrived!'}
            </span>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-10">
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_32px_64px_-12px_rgba(45,47,47,0.06)] border border-stone-100">
              <h3 className="text-lg font-bold font-headline mb-8">Live Status</h3>
              <div className="relative space-y-8">
                {steps.map((step, idx) => {
                  const Icon = step.icon;
                  const isPending = !step.done && !step.active;
                  return (
                    <div key={step.id} className={`flex items-start gap-6 transition-opacity duration-500 ${isPending ? 'opacity-40' : 'opacity-100'}`}>
                      <div className="relative flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center z-10 ${step.done ? 'bg-primary text-on-primary' : step.active ? 'bg-primary-container text-on-primary-container border-4 border-surface-container-lowest animate-pulse' : 'bg-surface-container-high text-on-surface-variant'}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        {idx < steps.length - 1 && (
                          <div className={`w-0.5 h-12 absolute top-10 ${step.done ? 'bg-primary' : 'bg-surface-container-highest'}`}></div>
                        )}
                      </div>
                      <div className="pt-1">
                        <h4 className={`font-bold ${step.active ? 'text-primary' : 'text-on-surface'}`}>{step.label}</h4>
                        <p className="text-sm text-on-surface-variant">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rating Section */}
            <AnimatePresence>
              {status === 'delivered' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-surface-container-lowest p-8 rounded-xl shadow-lg border border-primary/10 overflow-hidden relative"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <Star className="h-24 w-24 fill-primary" />
                  </div>
                  
                  {existingRating ? (
                    <div className="text-center py-4">
                      <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-8 w-8 ${i < existingRating.rating ? 'fill-primary text-primary' : 'text-stone-300'}`} />
                        ))}
                      </div>
                      <h3 className="font-headline text-2xl font-bold mb-2">Thank you!</h3>
                      <p className="text-on-surface-variant italic">"{existingRating.comment}"</p>
                      <p className="mt-4 text-xs font-bold text-primary uppercase tracking-widest">Feedback Recorded</p>
                    </div>
                  ) : (
                    <div>
                      <h3 className="font-headline text-2xl font-bold mb-2 text-primary">How was your feast?</h3>
                      <p className="text-on-surface-variant mb-8">Share your culinary experience with the community.</p>
                      
                      <div className="flex gap-2 mb-8">
                        {[...Array(5)].map((_, i) => {
                          const starValue = i + 1;
                          return (
                            <button
                              key={i}
                              type="button"
                              className="focus:outline-none transition-transform hover:scale-110 active:scale-95"
                              onClick={() => setRating(starValue)}
                              onMouseEnter={() => setHover(starValue)}
                              onMouseLeave={() => setHover(0)}
                            >
                              <Star className={`h-10 w-10 ${(hover || rating) >= starValue ? 'fill-primary text-primary' : 'text-stone-300'} transition-colors`} />
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-4">
                        <textarea 
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                          placeholder="Your compliments to the chef..."
                          className="w-full bg-surface-container-low border-none rounded-xl p-4 min-h-[100px] focus:ring-2 focus:ring-primary transition-all text-sm font-medium"
                        />
                        <button 
                          disabled={isSubmitting || rating === 0}
                          onClick={handleRate}
                          className="w-full bg-primary hover:bg-primary-dim text-on-primary font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 shadow-xl shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Send className="h-5 w-5" />
                          <span>{isSubmitting ? 'Recording...' : 'Submit Feedback'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Clock className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider font-label">Estimated Arrival</span>
                </div>
                <p className="text-3xl font-extrabold font-headline">25 - 35 min</p>
              </div>
              <div className="bg-surface-container-low p-6 rounded-xl space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <MapPin className="h-5 w-5" />
                  <span className="text-xs font-bold uppercase tracking-wider font-label">Delivery Address</span>
                </div>
                <p className="text-sm font-medium leading-relaxed">Artisan Delivery Zone, Lagos Island</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-5 space-y-10">
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container border border-stone-100">
                  <img src={order.sellers.image_url} alt={order.sellers.business_name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-bold text-lg font-headline">{order.sellers.business_name}</h3>
                  <div className="flex items-center gap-1 text-primary">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-bold">{order.sellers.rating}</span>
                    <span className="text-xs text-on-surface-variant font-medium ml-1">Elite Kitchen</span>
                  </div>
                </div>
              </div>
              <Link 
                href={`/chat/${order.seller_id}`}
                className="w-full py-4 bg-secondary-container text-on-secondary-container rounded-full font-bold text-sm flex items-center justify-center gap-2 hover:bg-opacity-80 transition-all active:scale-95"
              >
                <MessageSquare className="h-5 w-5" />
                Chat with Seller
              </Link>
            </div>

            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/10 overflow-hidden">
              <div className="p-6 bg-surface-container-low">
                <h3 className="font-bold font-headline text-lg">Order Summary</h3>
              </div>
              <div className="p-6 space-y-6">
                {order.order_items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-start gap-4">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg bg-surface-container overflow-hidden">
                        <img src={item.foods.image_url} alt={item.foods.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{item.foods.name}</h4>
                        <p className="text-xs text-on-surface-variant">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                <div className="pt-6 mt-6 space-y-3">
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-on-surface-variant">
                    <span>Delivery Fee</span>
                    <span>{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold font-headline pt-3 border-t-2 border-surface-container border-dashed">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(order.total_price)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
