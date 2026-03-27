"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, User, ChevronLeft, MoreVertical, Paperclip, Smile } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  created_at: string;
}

interface ChatWindowProps {
  senderId: string;
  receiverId: string;
  receiverName: string;
  receiverImage?: string;
  onBack?: () => void;
}

export default function ChatWindow({ senderId, receiverId, receiverName, receiverImage, onBack }: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch initial messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .or(`and(sender_id.eq.${senderId},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${senderId})`)
        .order('created_at', { ascending: true });

      if (data) setMessages(data);
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`chat-${senderId}-${receiverId}`)
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'chat_messages',
          filter: `or(sender_id.eq.${senderId},receiver_id.eq.${senderId})`
        },
        (payload) => {
          const msg = payload.new as Message;
          // Only add if it's relevant to this chat
          if (
            (msg.sender_id === senderId && msg.receiver_id === receiverId) ||
            (msg.sender_id === receiverId && msg.receiver_id === senderId)
          ) {
            setMessages(prev => [...prev.filter(m => m.id !== msg.id), msg]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [senderId, receiverId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const tempMessage = newMessage;
    setNewMessage("");

    try {
      const { error } = await supabase
        .from('chat_messages')
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          message_text: tempMessage
        });

      if (error) throw error;
    } catch (err) {
      console.error("Send Error:", err);
      alert("Failed to send message.");
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-white rounded-2xl shadow-xl border border-stone-100 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-stone-50 z-10">
        <div className="flex items-center gap-4">
          {onBack && (
            <button onClick={onBack} className="lg:hidden p-2 -ml-2 hover:bg-stone-50 rounded-full transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          <div className="relative">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 ring-2 ring-white">
              {receiverImage ? (
                <img src={receiverImage} alt={receiverName} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                  <User className="h-5 w-5" />
                </div>
              )}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h4 className="font-bold text-sm text-on-surface">{receiverName}</h4>
            <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">Online</p>
          </div>
        </div>
        <button className="p-2 hover:bg-stone-50 rounded-full transition-colors text-stone-400">
          <MoreVertical className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-grow overflow-y-auto p-6 space-y-4 bg-stone-50/30 scroll-smooth"
      >
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg) => {
              const isMine = msg.sender_id === senderId;
              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm text-sm font-medium leading-relaxed ${
                    isMine 
                      ? 'bg-primary text-on-primary rounded-tr-none' 
                      : 'bg-white text-on-surface border border-stone-100 rounded-tl-none'
                  }`}>
                    <p>{msg.message_text}</p>
                    <div className={`mt-1 text-[9px] font-bold uppercase tracking-tighter opacity-50 ${isMine ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-stone-50">
        <form onSubmit={handleSend} className="flex items-center gap-2">
          <div className="flex-grow flex items-center bg-stone-50 rounded-full px-4 py-2 ring-1 ring-stone-100 focus-within:ring-primary/30 transition-shadow">
            <button type="button" className="p-1.5 text-stone-400 hover:text-stone-600">
              <Smile className="h-5 w-5" />
            </button>
            <input 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Write your message..."
              className="flex-grow bg-transparent border-none focus:ring-0 text-sm py-2 px-2"
            />
            <button type="button" className="p-1.5 text-stone-400 hover:text-stone-600">
              <Paperclip className="h-5 w-5" />
            </button>
          </div>
          <button 
            type="submit"
            className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:bg-primary-dim active:scale-95 transition-all shadow-lg shadow-primary/20"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
