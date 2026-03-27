"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, subtotal } = useCart();
  const deliveryFee = 1200;
  const serviceCharge = 500;
  const total = subtotal + deliveryFee + serviceCharge;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount);
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-32">
          <div className="text-center space-y-4">
            <span className="material-symbols-outlined text-stone-200 text-9xl">shopping_cart</span>
            <h1 className="text-3xl font-headline font-bold">Your cart is empty</h1>
            <p className="text-stone-500">Looks like you haven't added any delicacies yet.</p>
            <Link href="/marketplace" className="inline-block bg-primary text-on-primary px-8 py-3 rounded-full font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all">
              Go to Marketplace
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-6 py-12 md:py-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex items-baseline justify-between">
              <h1 className="text-4xl font-extrabold tracking-tight text-on-background">Your Feast <span className="text-primary italic">Awaits</span></h1>
              <span className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">{cart.length} Items</span>
            </div>

            <div className="space-y-8">
              {cart.map((item) => (
                <div key={item.id} className="group relative flex flex-col md:flex-row gap-6 p-4 rounded-xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container-high">
                  <div className="w-full md:w-48 h-48 md:h-40 overflow-hidden rounded-lg shadow-sm">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="text-xl font-bold text-on-background">{item.name}</h3>
                        <span className="text-xl font-bold text-primary">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                      <p className="text-on-surface-variant text-sm mt-1">From <span className="text-tertiary font-medium">{item.vendor}</span></p>
                    </div>
                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center bg-surface-container-highest rounded-full p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container-lowest transition-colors"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="px-4 font-bold text-on-background">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-on-primary shadow-sm active:scale-90 transition-transform"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-on-surface-variant hover:text-error flex items-center gap-2 transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">delete_outline</span>
                        <span className="text-xs font-semibold uppercase tracking-wider">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-xl bg-orange-50/50 flex flex-col items-center text-center">
              <h4 className="text-lg font-bold text-orange-900">Hungry for more?</h4>
              <p className="text-orange-800/70 text-sm mt-1">Explore our chef-curated specials and desserts.</p>
              <Link href="/marketplace" className="mt-4 px-6 py-2 rounded-full border border-orange-200 text-primary text-sm font-bold hover:bg-orange-100 transition-colors">
                Browse Market
              </Link>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-32 space-y-6">
              <div className="bg-surface-container-lowest p-8 rounded-xl shadow-sm border border-outline-variant/10">
                <h2 className="text-2xl font-bold mb-8 text-on-background tracking-tight">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-bold text-on-background">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-medium">Delivery Fee</span>
                    <span className="font-bold text-on-background">{formatCurrency(deliveryFee)}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span className="font-medium">Service Charge</span>
                    <span className="font-bold text-on-background">{formatCurrency(serviceCharge)}</span>
                  </div>
                  <div className="pt-4 mt-4 border-t-2 border-dashed border-outline-variant/20">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Total Amount</span>
                        <div className="text-3xl font-black text-primary mt-1">{formatCurrency(total)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <Link href="/checkout" className="block w-full text-center bg-primary text-on-primary py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
                    Proceed to Checkout
                  </Link>
                  <p className="text-center text-[11px] text-on-surface-variant px-4">
                    Secure payment powered by Paystack. Prices include VAT.
                  </p>
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
