"use client";

import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) setMessage(msg);
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      if (data.user) {
        // Fetch user role to redirect appropriately
        const { data: profile } = await supabase
          .from("users")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (profile?.role === "seller") {
          router.push("/dashboard/seller");
        } else {
          router.push("/marketplace");
        }
      }
    } catch (err: any) {
      setError(err.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background font-body text-on-surface antialiased min-h-screen flex items-center justify-center p-6 bg-mesh">
      <main className="w-full max-w-[1100px] grid md:grid-cols-2 bg-surface-container-lowest rounded-xl overflow-hidden shadow-2xl">
        {/* Left Side: Branding */}
        <section className="hidden md:flex flex-col justify-between p-12 bg-primary relative overflow-hidden">
          <div className="relative z-10">
            <Link href="/" className="font-headline font-black text-4xl text-on-primary tracking-tighter">KQ Foods</Link>
            <p className="font-headline font-bold text-on-primary/80 text-lg mt-2">The Digital Artisan Marketplace</p>
          </div>
          <div className="relative z-10">
            <blockquote className="font-headline text-2xl font-semibold text-on-primary leading-tight">
              "Authentic flavors delivered with modern precision."
            </blockquote>
          </div>
        </section>

        {/* Right Side: Login Form */}
        <section className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-headline text-3xl font-bold text-on-surface tracking-tight mb-2">Welcome Back</h2>
            <p className="text-on-surface-variant font-medium">Please enter your culinary credentials.</p>
          </div>

          {message && (
            <div className="mb-6 p-4 bg-primary-container/10 text-primary rounded-lg text-sm font-medium">
              {message}
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-lg text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-label text-[10px] font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Email Address</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">mail</span>
                <input 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline/50 font-medium" 
                  placeholder="chef@kqfoods.com" 
                  type="email"
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="block font-label text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Password</label>
                <Link className="text-[10px] font-bold tracking-widest uppercase text-primary hover:opacity-80 transition-opacity" href="/auth/forgot-password">Forgot?</Link>
              </div>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all text-on-surface placeholder:text-outline/50 font-medium" 
                  placeholder="••••••••" 
                  type="password"
                />
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full py-4 bg-primary text-on-primary font-headline font-bold rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50" 
              type="submit"
            >
              {loading ? "Logging in..." : "Login to Kitchen"}
              <span className="material-symbols-outlined text-xl">arrow_forward</span>
            </button>
          </form>

          <div className="mt-10 pt-10 border-t-2 border-surface-container flex flex-col items-center gap-6">
            <p className="text-sm font-medium text-on-surface-variant">
              Don't have an account? 
              <Link className="text-primary font-bold hover:underline decoration-2 underline-offset-4" href="/auth/signup">Sign Up</Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
