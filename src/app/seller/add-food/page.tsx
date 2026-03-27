"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Camera, Lightbulb, Send, Drafts, ChevronDown, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AddFoodPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    prepTime: "",
    category: "",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZqnFSzr9_yp8FED9z5m7TAw0OuX-_oVmT3bKT6dhhlHSDTB_mjfCzh_TtLRxgXq3KZMvU9GqsoMmQV5mTAQTrG3X1Cxw2LPCTGQmOqwTgIA3w1Z3t5IPEnqH-lQeJV6Vw8LivwYAdSzOb8s2jMSCJAuKk_e0j9I84FsrDEgkZ7JqUayvKxrsI3SkpbWoGZt8AITA7NFo72ei82ARpNNsgGS3yR0IMvMgvuA-yCxyyYNzOL4fWbOoVcZGE-jttNrlXoO2I51Uf9BA", // Default placeholder
  });

  const sellerId = '00000000-0000-0000-0000-000000000001'; // Chef Lola

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setFormData({ ...formData, image_url: URL.createObjectURL(file) });
    }
  };

  const uploadImage = async (file: File) => {
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${sellerId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('food-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('food-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = formData.image_url;
      
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('foods')
        .insert({
          seller_id: sellerId,
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          image_url: finalImageUrl,
          preparation_time: parseInt(formData.prepTime),
          created_at: new Date().toISOString()
        });

      if (error) throw error;

      router.push("/seller/listings");
    } catch (err) {
      console.error("Error adding food:", err);
      alert("Failed to create listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-12 pb-20 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Column: Image Upload & Preview */}
        <div className="w-full lg:w-5/12">
          <div className="sticky top-32">
            <label className="block text-sm font-bold text-on-surface mb-4 tracking-tight uppercase">Food Photography</label>
            <div 
               onClick={() => fileInputRef.current?.click()}
               className="group relative aspect-[4/5] rounded-2xl overflow-hidden bg-surface-container-low border-2 border-dashed border-outline-variant hover:border-primary transition-all cursor-pointer flex items-center justify-center"
            >
              <img 
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" 
                alt="Food Preview" 
                src={formData.image_url}
              />
              <div className="relative z-10 bg-surface/40 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-center shadow-2xl">
                {uploading ? <Loader2 className="h-10 w-10 text-primary mx-auto mb-2 animate-spin" /> : <Camera className="h-10 w-10 text-primary mx-auto mb-2" />}
                <p className="text-sm font-bold text-on-primary-container">
                  {imageFile ? "Change Dish Image" : "Upload Dish Image"}
                </p>
                <p className="text-[10px] text-on-surface-variant mt-1">High-res JPEG or PNG (Max 5MB)</p>
              </div>
              <input 
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageSelect}
              />
            </div>
            <div className="mt-6 p-4 rounded-xl bg-primary-container/10 flex items-start gap-3">
              <Lightbulb className="text-primary h-5 w-5 mt-0.5" />
              <p className="text-xs text-on-primary-fixed-variant leading-relaxed">
                <strong className="block mb-1">Editorial Tip:</strong>
                Use natural daylight and a slightly overhead angle (45°) to capture the texture and shine of your dish.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Form Fields */}
        <div className="w-full lg:w-7/12">
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* General Info */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-8 bg-tertiary rounded-full"></span>
                <h3 className="font-headline font-bold text-2xl text-on-surface tracking-tight">General Information</h3>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1">Food Name</label>
                <input 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-5 py-4 bg-surface-container-high border-0 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all outline-none text-on-surface font-medium placeholder:text-outline" 
                  placeholder="e.g. Signature Smoky Jollof & Asun" 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center ml-1">
                  <label className="block text-sm font-semibold text-on-surface-variant">Description</label>
                  <span className="text-[10px] font-bold text-outline-variant uppercase">Up to 500 characters</span>
                </div>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-5 py-4 bg-surface-container-high border-0 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all outline-none text-on-surface font-medium leading-relaxed resize-none" 
                  placeholder="Describe the spices, prep method, and cultural story behind this dish..." 
                  rows={5}
                ></textarea>
              </div>
            </section>

            {/* Pricing & Prep */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-8 bg-primary rounded-full"></span>
                <h3 className="font-headline font-bold text-2xl text-on-surface tracking-tight">Pricing & Preparation</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">Base Price (₦)</label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-primary">₦</span>
                    <input 
                      required
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      className="w-full pl-10 pr-5 py-4 bg-surface-container-high border-0 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all outline-none text-on-surface font-bold" 
                      placeholder="4,500" 
                      type="number"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-on-surface-variant ml-1">Prep Time (Mins)</label>
                  <div className="relative group">
                    <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-outline">MINUTES</span>
                    <input 
                      required
                      value={formData.prepTime}
                      onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
                      className="w-full px-5 py-4 bg-surface-container-high border-0 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all outline-none text-on-surface font-bold" 
                      placeholder="45" 
                      type="number"
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-on-surface-variant ml-1">Category</label>
                <div className="relative">
                  <select 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-5 py-4 bg-surface-container-high border-0 rounded-xl focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary appearance-none transition-all outline-none text-on-surface font-medium"
                  >
                    <option value="">Select a food category</option>
                    <option value="Main Course">Rice & Grains</option>
                    <option value="Native Soups">Native Soups & Swallows</option>
                    <option value="Grills">Grills & Proteins</option>
                    <option value="Snacks">Small Chops & Snacks</option>
                    <option value="Drinks">Local Beverages</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-outline h-5 w-5" />
                </div>
              </div>
            </section>

            {/* Actions */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button 
                type="submit"
                disabled={loading || uploading}
                className="flex-1 bg-primary text-on-primary py-5 rounded-full font-headline font-bold text-lg shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                <span>{loading ? "Publishing..." : "Publish Listing"}</span>
                <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                type="button"
                className="flex-1 bg-secondary-container text-on-secondary-container py-5 rounded-full font-headline font-bold text-lg active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Save as Draft</span>
                <Drafts className="h-5 w-5" />
              </button>
            </div>
            
            <p className="text-center text-[10px] text-outline font-bold uppercase tracking-widest pt-4">
              By publishing, you agree to our Culinary Quality Standards.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
