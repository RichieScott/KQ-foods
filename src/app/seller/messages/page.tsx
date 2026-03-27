"use client";

import React, { useState, useEffect } from "react";
import ChatWindow from "@/components/ChatWindow";
import { supabase } from "@/lib/supabase";
import { User, Search, MessageSquare } from "lucide-react";

export default function SellerMessagesPage() {
  const [chats, setChats] = useState<any[]>([]);
  const [selectedReceiverId, setSelectedReceiverId] = useState<string | null>(null);
  const [selectedReceiverName, setSelectedReceiverName] = useState("");
  const [selectedReceiverImage, setSelectedReceiverImage] = useState<string | undefined>(undefined);
  const sellerId = '00000000-0000-0000-0000-000000000001'; // Chef Lola

  useEffect(() => {
    const fetchChats = async () => {
      // Find all unique users this seller has messaged or received from
      const { data, error } = await supabase
        .from('chat_messages')
        .select('sender_id, receiver_id')
        .or(`sender_id.eq.${sellerId},receiver_id.eq.${sellerId}`);

      if (data) {
        const userIds = new Set<string>();
        data.forEach(msg => {
          if (msg.sender_id !== sellerId) userIds.add(msg.sender_id);
          if (msg.receiver_id !== sellerId) userIds.add(msg.receiver_id);
        });

        if (userIds.size > 0) {
          const { data: usersInfo } = await supabase
            .from('users')
            .select('*')
            .in('id', Array.from(userIds));
          
          if (usersInfo) setChats(usersInfo);
        }
      }
    };
    fetchChats();
  }, [sellerId]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-140px)] gap-6 p-6">
      {/* Sidebar: Chat List */}
      <div className={`w-full lg:w-80 bg-white rounded-2xl border border-stone-100 flex flex-col overflow-hidden ${selectedReceiverId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 border-b border-stone-50">
           <h3 className="font-headline font-bold text-lg mb-4">Customer Messages</h3>
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
              <input className="w-full pl-10 pr-4 py-2 bg-stone-50 border-none rounded-lg text-sm outline-none focus:ring-1 focus:ring-primary/20 transition-all" placeholder="Search customers..." />
           </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {chats.map(chat => (
            <button 
              key={chat.id}
              onClick={() => {
                setSelectedReceiverId(chat.id);
                setSelectedReceiverName(chat.full_name);
                setSelectedReceiverImage(chat.avatar_url);
              }}
              className={`w-full flex items-center gap-4 p-4 hover:bg-stone-50 transition-colors border-b border-stone-50/50 ${selectedReceiverId === chat.id ? 'bg-orange-50/50 border-r-4 border-r-primary' : ''}`}
            >
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-100">
                <img src={chat.avatar_url} alt={chat.full_name} className="w-full h-full object-cover" />
              </div>
              <div className="text-left flex-grow">
                <p className="font-bold text-sm text-on-surface">{chat.full_name}</p>
                <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">Verified Buyer</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </button>
          ))}
          {chats.length === 0 && (
             <div className="py-20 text-center px-4">
                <MessageSquare className="h-10 w-10 mx-auto mb-4 text-stone-300 opacity-20" />
                <p className="text-sm font-bold text-stone-400">No active conversations yet.</p>
             </div>
          )}
        </div>
      </div>

      {/* Main Content: Chat Window */}
      <div className={`flex-grow bg-white rounded-2xl border border-stone-100 items-center justify-center relative overflow-hidden ${selectedReceiverId ? 'flex' : 'hidden lg:flex'}`}>
        {selectedReceiverId ? (
          <div className="w-full h-full">
            <ChatWindow 
              senderId={sellerId} 
              receiverId={selectedReceiverId} 
              receiverName={selectedReceiverName} 
              receiverImage={selectedReceiverImage}
              onBack={() => setSelectedReceiverId(null)}
            />
          </div>
        ) : (
          <div className="text-center opacity-40">
             <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="h-10 w-10 text-stone-300" />
             </div>
             <p className="text-lg font-bold text-on-surface">Select a customer</p>
             <p className="text-sm">Start a conversation to fulfill special requests.</p>
          </div>
        )}
      </div>
    </div>
  );
}
