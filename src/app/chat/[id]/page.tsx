"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWindow from "@/components/ChatWindow";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

export default function ChatPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const [receiver, setReceiver] = useState<any>(null);
  
  // Decide sender based on query param for demo purposes
  // In real app, this is the authenticated user.
  const isSeller = searchParams.get('role') === 'seller';
  const senderId = isSeller 
    ? '00000000-0000-0000-0000-000000000001' // Chef Lola
    : '00000000-0000-0000-0000-000000000002'; // Test Buyer

  useEffect(() => {
    const fetchReceiver = async () => {
      // Check if receiver is a seller
      const { data: seller } = await supabase
        .from('sellers')
        .select('*')
        .eq('id', params.id)
        .maybeSingle();
      
      if (seller) {
        setReceiver({
          id: seller.id,
          name: seller.business_name,
          image: seller.image_url
        });
      } else {
        // Find in users table
        const { data: user } = await supabase
          .from('users')
          .select('*')
          .eq('id', params.id)
          .maybeSingle();
          
        if (user) {
          setReceiver({
            id: user.id,
            name: user.full_name,
            image: user.avatar_url
          });
        }
      }
    };
    fetchReceiver();
  }, [params.id]);

  if (!receiver) {
    return (
      <div className="flex flex-col min-h-screen bg-surface items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-stone-50/50">
      <Navbar />
      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto w-full">
        <ChatWindow 
          senderId={senderId} 
          receiverId={receiver.id} 
          receiverName={receiver.name}
          receiverImage={receiver.image}
        />
      </main>
      <Footer />
    </div>
  );
}
