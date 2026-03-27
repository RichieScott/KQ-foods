"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, PlusCircle, UtensilsCrossed, ReceiptText, MessageSquare, UserCircle, LifeBuoy, LogOut } from "lucide-react";

const navItems = [
  { name: "Dashboard Overview", href: "/seller", icon: LayoutDashboard },
  { name: "Add Food Listing", href: "/seller/add-food", icon: PlusCircle },
  { name: "Manage Listings", href: "/seller/listings", icon: UtensilsCrossed },
  { name: "Orders", href: "/seller/orders", icon: ReceiptText },
  { name: "Messages", href: "/seller/messages", icon: MessageSquare },
  { name: "Profile Settings", href: "/seller/profile", icon: UserCircle },
];

export default function SellerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 bg-stone-50 dark:bg-stone-950 py-6 z-50 border-r border-stone-200 dark:border-stone-800">
      <div className="px-6 mb-8">
        <h1 className="font-headline text-lg font-extrabold text-orange-900 dark:text-orange-50 tracking-tight">Artisan Portal</h1>
        <p className="text-xs text-stone-500 font-medium">Nigerian Cuisine</p>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all duration-300 ease-in-out font-medium text-sm ${
                isActive
                  ? "bg-orange-100/50 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300"
                  : "text-stone-500 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-800/50"
              }`}
            >
              <Icon className={`mr-3 h-5 w-5 ${isActive ? "fill-current" : ""}`} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto px-4 space-y-1">
        <Link 
          href="/"
          className="w-full mb-4 py-3 px-4 bg-primary text-on-primary rounded-full font-bold text-sm shadow-sm hover:opacity-90 transition-opacity flex items-center justify-center"
        >
          View Live Store
        </Link>
        <Link
          href="/seller/support"
          className="flex items-center text-stone-500 dark:text-stone-400 px-4 py-3 rounded-xl hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-sm font-medium transition-all"
        >
          <LifeBuoy className="mr-3 h-5 w-5" />
          Support
        </Link>
        <button
          className="w-full flex items-center text-stone-500 dark:text-stone-400 px-4 py-3 rounded-xl hover:bg-stone-200/50 dark:hover:bg-stone-800/50 text-sm font-medium transition-all"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );
}
