import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-surface-container-highest py-16 px-6 mt-20 border-t-0">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="text-2xl font-black text-orange-800 italic font-headline">KQ Foods</div>
          <p className="text-sm text-on-surface-variant leading-relaxed">Connecting you with the heart of Nigerian cuisine, one meal at a time. Authenticity and quality guaranteed.</p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">public</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">chat_bubble</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">share</span>
            </div>
          </div>
        </div>
        <div>
          <h6 className="font-headline font-bold mb-6">Company</h6>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><Link className="hover:text-primary transition-colors" href="#">About Us</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#">Our Vendors</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#">Careers</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#">Sustainability</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-headline font-bold mb-6">Support</h6>
          <ul className="space-y-4 text-sm text-on-surface-variant">
            <li><Link className="hover:text-primary transition-colors" href="#">Help Center</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#">Safety Center</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#">Community Guidelines</Link></li>
            <li><Link className="hover:text-primary transition-colors" href="#">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h6 className="font-headline font-bold mb-6">Download App</h6>
          <p className="text-xs text-on-surface-variant mb-4">Get the best experience on your mobile device.</p>
          <div className="flex flex-col gap-3">
            <button className="flex items-center gap-3 bg-on-surface text-surface py-2 px-4 rounded-lg">
              <span className="material-symbols-outlined">phone_iphone</span>
              <div className="text-left">
                <p className="text-[10px] uppercase leading-none">Download on the</p>
                <p className="text-sm font-bold leading-none">App Store</p>
              </div>
            </button>
            <button className="flex items-center gap-3 bg-on-surface text-surface py-2 px-4 rounded-lg">
              <span className="material-symbols-outlined">phone_android</span>
              <div className="text-left">
                <p className="text-[10px] uppercase leading-none">Get it on</p>
                <p className="text-sm font-bold leading-none">Google Play</p>
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-16 mt-16 border-t border-outline-variant/20 text-center">
        <p className="text-xs text-outline">© 2024 KQ Foods Marketplace. All rights reserved. Built for Nigerian food lovers.</p>
      </div>
    </footer>
  );
}
