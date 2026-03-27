import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import PopularFoods from "@/components/PopularFoods";
import FeaturedSellers from "@/components/FeaturedSellers";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
        <Hero />
        <Categories />
        <PopularFoods />
        <FeaturedSellers />
        <Reviews />
      </main>
      <Footer />
      
      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/yournumber"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 md:bottom-8 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          viewBox="0 0 24 24"
          width="24"
          height="24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L22 4l-1.5 6.5z"></path>
        </svg>
      </a>

      {/* Mobile Bottom Nav Spacer */}
      <div className="md:hidden h-20"></div>
      
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-6 pt-3 bg-surface/80 backdrop-blur-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] z-50 rounded-t-3xl">
        <a className="flex flex-col items-center justify-center bg-orange-100 text-orange-900 rounded-2xl px-5 py-2 active:scale-90 transition-all duration-200" href="/">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>home</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider mt-1">Home</span>
        </a>
        <a className="flex flex-col items-center justify-center text-zinc-500 px-5 py-2 hover:text-orange-600 active:scale-90 transition-all duration-200" href="/marketplace">
          <span className="material-symbols-outlined">storefront</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider mt-1">Market</span>
        </a>
        <a className="flex flex-col items-center justify-center text-zinc-500 px-5 py-2 hover:text-orange-600 active:scale-90 transition-all duration-200" href="/orders">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider mt-1">Orders</span>
        </a>
        <a className="flex flex-col items-center justify-center text-zinc-500 px-5 py-2 hover:text-orange-600 active:scale-90 transition-all duration-200" href="/account">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-semibold uppercase tracking-wider mt-1">Account</span>
        </a>
      </div>
    </div>
  );
}
