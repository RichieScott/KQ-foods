"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: role,
          },
        },
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user profile in public.users table
        const { error: profileError } = await supabase.from("users").insert({
          id: authData.user.id,
          email: email,
          full_name: fullName,
          role: role,
        });

        if (profileError) throw profileError;

        if (role === "seller") {
          // Create initial seller profile
          const { error: sellerError } = await supabase.from("sellers").insert({
            id: authData.user.id,
            business_name: fullName + "'s Kitchen",
            location: "Lagos, Nigeria", // Default
          });
          if (sellerError) throw sellerError;
        }

        router.push("/auth/login?message=Check your email to confirm your account");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-background min-h-screen flex flex-col items-center justify-center p-4">
      <header className="mb-12 text-center">
        <h1 className="font-headline font-black text-4xl text-primary tracking-tighter">KQ Foods</h1>
        <p className="font-body text-on-surface-variant mt-2 text-lg">Join the Digital Artisan community</p>
      </header>
      <main className="w-full max-w-[500px]">
        <div className="bg-surface-container-lowest rounded-xl shadow-[0_32px_64px_rgba(45,47,47,0.06)] p-8 md:p-10 relative overflow-hidden">
          {/* Account Type Toggle */}
          <div className="flex p-1.5 bg-surface-container-low rounded-full mb-8">
            <button 
              onClick={() => setRole("buyer")}
              className={`flex-1 py-3 px-6 rounded-full font-headline font-bold text-sm transition-all duration-200 ${
                role === "buyer" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Buyer
            </button>
            <button 
              onClick={() => setRole("seller")}
              className={`flex-1 py-3 px-6 rounded-full font-headline font-bold text-sm transition-all duration-200 ${
                role === "seller" ? "bg-primary text-on-primary shadow-sm" : "text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              Seller
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-label text-[0.75rem] font-bold tracking-widest uppercase text-on-surface-variant ml-1">Full Name</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">person</span>
                <input 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 text-on-surface placeholder:text-outline" 
                  placeholder="Chidi Adebayo" 
                  type="text"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-[0.75rem] font-bold tracking-widest uppercase text-on-surface-variant ml-1">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">mail</span>
                <input 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 text-on-surface placeholder:text-outline" 
                  placeholder="chidi@example.com" 
                  type="email"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-[0.75rem] font-bold tracking-widest uppercase text-on-surface-variant ml-1">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">lock</span>
                <input 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 text-on-surface placeholder:text-outline" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block font-label text-[0.75rem] font-bold tracking-widest uppercase text-on-surface-variant ml-1">Confirm Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">verified_user</span>
                <input 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-xl focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all duration-200 text-on-surface placeholder:text-outline" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>
            
            <button 
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-headline font-extrabold text-lg rounded-full shadow-lg hover:opacity-90 active:scale-[0.98] transition-all duration-200 mt-4 disabled:opacity-50" 
              type="submit"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <div className="mt-8 pt-8 border-t border-surface-container flex flex-col items-center gap-4">
            <p className="text-on-surface-variant">
              Already have an account? 
              <Link className="text-primary font-bold hover:underline ml-1" href="/auth/login">Log In</Link>
            </p>
          </div>
        </div>
      </main>
      <footer className="mt-8 text-center pb-8">
        <button className="flex items-center gap-2 mx-auto text-on-surface-variant font-label text-[10px] tracking-widest uppercase hover:text-primary transition-colors duration-200">
          <span className="material-symbols-outlined text-[18px]">help_outline</span>
          Need assistance?
        </button>
      </footer>
    </div>
  );
}
