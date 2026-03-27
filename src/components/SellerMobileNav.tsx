"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, UtensilsCrossed, ReceiptText, MessageSquare } from "lucide-react";

const navItems = [
  { name: "Home", href: "/seller", icon: LayoutDashboard },
  { name: "Listings", href: "/seller/listings", icon: UtensilsCrossed },
  { name: "Add", href: "/seller/add-food", icon: PlusCircle },
  { name: "Orders", href: "/seller/orders", icon: ReceiptText },
  { name: "Chats", href: "/seller/messages", icon: MessageSquare },
];

export default function SellerMobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 px-4 py-2 border-t border-stone-100 pb-safe shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-300 flex-1 ${
                isActive ? "text-primary" : "text-stone-400"
              }`}
            >
              <Icon className={`h-5 w-5 mb-1 ${isActive ? "fill-current/10" : ""}`} />
              <span className="text-[9px] font-bold uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
