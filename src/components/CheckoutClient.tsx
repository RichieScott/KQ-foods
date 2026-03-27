"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { usePaystackPayment } from "react-paystack";
import { supabase } from "../lib/supabase";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function CheckoutClient() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = 1200;
  const serviceCharge = 500;
  const total = subtotal + deliveryFee + serviceCharge;

  // Paystack Configuration
  const config = {
    reference: (new Date()).getTime().toString(),
    email: "buyer@example.com", // Linked to test buyer
    amount: total * 100,
    publicKey: "pk_test_3531b7a69a0a867b133d8bdu0hwX5w_2dehpiqE",
  };

  const onSuccess = async (reference: any) => {
    setIsProcessing(true);
    try {
      // 1. Create Order
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          buyer_id: '00000000-0000-0000-0000-000000000002', // Test Buyer ID
          seller_id: cart[0].sellerId, // First vendor in cart for MVP
          total_price: total,
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // 2. Create Order Items
      const orderItems = cart.map(item => ({
        order_id: order.id,
        food_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // 3. Send Email Notification
      try {
        await fetch('/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: config.email,
            subject: `Order Confirmed - #${order.id.slice(0, 8)}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #ea580c; text-align: center;">KQ Foods</h1>
                <h2 style="text-align: center;">Your feast is being prepared!</h2>
                <p>Hi there,</p>
                <p>Your order <strong>#${order.id.slice(0, 8)}</strong> for <strong>${formatCurrency(total)}</strong> has been received by the artisan kitchen and is now being prepared with care.</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="${typeof window !== 'undefined' ? window.location.origin : ''}/orders/${order.id}" style="background-color: #ea580c; color: white; padding: 15px 25px; text-decoration: none; font-weight: bold; border-radius: 50px;">Track Order Status</a>
                </div>
                <p style="font-size: 12px; color: #666; text-align: center;">Thank you for supporting local artisan chefs!</p>
              </div>
            `
          })
        });
      } catch (e) {
        console.error("Email notification failed", e);
      }

      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error("Detailed Order Creation Error:", error);
      alert("Payment successful, but order failed to save. Please contact support with Ref: " + reference.reference);
    } finally {
      setIsProcessing(false);
    }
  };

  const onClose = () => {
    console.log('Payment modal closed');
  };

  const initializePayment = usePaystackPayment(config);

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address || !city || !phone) {
      alert("Please fill in all delivery details");
      return;
    }

    if (paymentMethod === "card") {
      initializePayment({onSuccess, onClose});
    } else {
      // Handle Bank Transfer or COD
      onSuccess({ reference: "manual_" + Date.now() });
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  if (cart.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface font-body text-on-surface">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 pt-32 pb-24">
        {isProcessing && (
          <div className="fixed inset-0 bg-surface/80 backdrop-blur-sm z-[60] flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="font-bold font-headline animate-pulse">Securing your feast...</p>
          </div>
        )}

        <div className="mb-12">
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-background">Secure Checkout</h2>
          <p className="text-on-surface-variant mt-2 text-lg">Review your selection and choose your delivery preferences.</p>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Delivery & Payment */}
          <div className="lg:col-span-7 space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                </div>
                <h3 className="font-headline text-2xl font-bold">Delivery Address</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Street Address</label>
                  <input 
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                    placeholder="123 Artisan Way, Victoria Island" 
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">City</label>
                  <input 
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                    placeholder="Lagos" 
                    type="text"
                  />
                </div>
                <div>
                  <label className="block text-xs font-label font-bold uppercase tracking-wider text-on-surface-variant mb-2">Phone Number</label>
                  <input 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-surface-container-high border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                    placeholder="+234 --- --- ----" 
                    type="tel"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                </div>
                <h3 className="font-headline text-2xl font-bold">Payment Method</h3>
              </div>
              <div className="space-y-4">
                <label className={`relative flex items-center p-6 rounded-xl cursor-pointer border-2 transition-all ${paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-transparent bg-surface-container-low hover:bg-surface-container'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-5 h-5 text-primary focus:ring-primary border-outline-variant"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <div className="ml-4 flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">Credit or Debit Card</span>
                      <span className="text-sm text-on-surface-variant">Visa, Mastercard, Verve</span>
                    </div>
                    <span className="material-symbols-outlined text-zinc-400">credit_card</span>
                  </div>
                </label>
                <label className={`relative flex items-center p-6 rounded-xl cursor-pointer border-2 transition-all ${paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-transparent bg-surface-container-low hover:bg-surface-container'}`}>
                  <input 
                    type="radio" 
                    name="payment" 
                    className="w-5 h-5 text-primary focus:ring-primary border-outline-variant"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <div className="ml-4 flex items-center justify-between w-full">
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">Pay on Delivery</span>
                      <span className="text-sm text-on-surface-variant">Cash or POS upon arrival</span>
                    </div>
                    <span className="material-symbols-outlined text-zinc-400">handshake</span>
                  </div>
                </label>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
                </div>
                <h3 className="font-headline text-2xl font-bold">Order Notes</h3>
              </div>
              <textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-surface-container-high border-none rounded-md px-4 py-4 focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all" 
                placeholder="Extra spicy, no onions, or gate code instructions..." 
                rows={4}
              ></textarea>
            </section>
          </div>

          <div className="lg:col-span-5">
            <div className="sticky top-32 p-8 rounded-xl bg-surface-container-lowest shadow-[0_32px_64px_-12px_rgba(45,47,47,0.06)] border border-outline-variant/10">
              <h3 className="font-headline text-2xl font-bold mb-8">Order Summary</h3>
              <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-cover bg-center overflow-hidden flex-shrink-0" style={{ backgroundImage: `url('${item.image}')` }}></div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <p className="font-bold text-on-surface">{item.name} x {item.quantity}</p>
                        <p className="font-bold text-on-surface">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                      <p className="text-sm text-on-surface-variant">From {item.vendor}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-3 py-6 border-t border-outline-variant/15">
                <div className="flex justify-between text-on-surface-variant">
                  <span className="text-sm font-label uppercase tracking-wider">Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="text-sm font-label uppercase tracking-wider">Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="text-sm font-label uppercase tracking-wider">Service Charge</span>
                  <span>{formatCurrency(serviceCharge)}</span>
                </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-outline-variant/15 mb-8">
                <span className="font-headline text-lg font-bold">Total Amount</span>
                <span className="font-headline text-3xl font-extrabold text-primary tracking-tight">{formatCurrency(total)}</span>
              </div>
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-primary hover:bg-primary-dim text-on-primary font-bold py-5 rounded-full flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isProcessing ? 'Processing...' : 'Place Order'}</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}
