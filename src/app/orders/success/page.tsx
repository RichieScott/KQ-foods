"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";

export default function OrderSuccessPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-32 px-6">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="max-w-md w-full text-center space-y-8"
        >
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center text-primary mx-auto">
              <span className="material-symbols-outlined text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-dashed border-primary/30 rounded-full"
            ></motion.div>
          </div>

          <div className="space-y-3">
            <h1 className="text-4xl font-headline font-extrabold tracking-tight">Feast Confirmed!</h1>
            <p className="text-on-surface-variant text-lg leading-relaxed">
              Your order has been placed successfully. Mama T's Kitchen has been notified and will start preparing your meal shortly.
            </p>
          </div>

          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 text-left space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Order Number</span>
              <span className="font-bold text-primary">#KQ-98231</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Estimated Delivery</span>
              <span className="font-bold">25 - 35 mins</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/orders/98231" className="flex-1 bg-primary text-on-primary py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm">delivery_dining</span>
              Track Order
            </Link>
            <Link href="/marketplace" className="flex-1 bg-surface-container-highest text-on-surface py-4 rounded-full font-bold hover:bg-surface-container-high active:scale-95 transition-all">
              Back to Market
            </Link>
          </div>

          <p className="text-xs text-on-surface-variant italic">
            A confirmation receipt has been sent to your email.
          </p>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
