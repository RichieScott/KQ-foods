"use client";

import SellerSidebar from "@/components/SellerSidebar";
import SellerMobileNav from "@/components/SellerMobileNav";
import { Search, Bell, HelpCircle, Menu } from "lucide-react";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-surface font-body text-on-surface min-h-screen">
      <SellerSidebar />
      
      <main className="md:ml-64 min-h-screen relative">
        {/* Top App Bar */}
        <header className="fixed top-0 right-0 left-0 md:left-64 z-40 bg-stone-50/80 dark:bg-stone-900/80 backdrop-blur-xl shadow-sm border-b border-stone-200 dark:border-stone-800">
          <div className="flex justify-between items-center px-6 py-3 w-full">
            <div className="flex items-center gap-4">
              <button className="md:hidden text-stone-600">
                <Menu className="h-6 w-6" />
              </button>
              <h2 className="font-headline font-semibold tracking-tight text-orange-800 dark:text-orange-400">Artisan Portal</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center bg-stone-200/50 dark:bg-stone-800/50 rounded-full px-4 py-1.5 focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <Search className="text-stone-500 h-4 w-4 mr-2" />
                <input 
                  className="bg-transparent border-none focus:ring-0 text-sm w-48 text-on-surface placeholder:text-stone-400" 
                  placeholder="Search orders..." 
                  type="text"
                />
              </div>
              
              <div className="flex gap-2">
                <button className="p-2 text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors active:scale-95">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="p-2 text-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-full transition-colors active:scale-95 font-medium">
                  <HelpCircle className="h-5 w-5" />
                </button>
              </div>
              
              <div className="h-8 w-8 rounded-full bg-surface-container-highest overflow-hidden border-2 border-primary/20">
                <img 
                  alt="Profile" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXj3Wy3o_l3KxObBQm8W-BLJEUP5qA49Y8pa_8Cnixsrlfa3nhlIKAkrGXQCkxK18DbtVTMUEwSAViLfUStQ1RcgOxaGv6nBug_2Sha_kmSnFNv2rMBxBBmN5MYzDb7vDFJwnPAfARyLCATZT_bd5w2jbMDUeU7KFhZWPggWj07GSIVSVbm4DUIKO9UOygodlshQDtQUpkWagMm_UHVd5GN7o5STaxUAkzK5kMa6gzzdkcvj03xpOXXxbw2GAyB97-QgyxWL7iqHc"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content Canvas */}
        <div className="pt-20">
          {children}
        </div>
      </main>
      
      <SellerMobileNav />
    </div>
  );
}
