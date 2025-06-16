
import React, { useState, useEffect } from 'react';
import { fetchMessages, sendMessage } from '@/services/api';
import { Message } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import MessageInput from '@/components/MessageInput';
import MessageList from '@/components/MessageList';

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      const fetchedMessages = await fetchMessages();
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Failed to fetch messages:', error);
      toast({
        title: "Connection Error",
        description: "Unable to connect to the server. Please check if the backend is running.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    try {
      setIsSending(true);
      await sendMessage(text);
      
      // Refresh the message list
      await loadMessages();
      
      toast({
        title: "Message sent!",
        description: "Your message has been posted successfully.",
      });
    } catch (error) {
      console.error('Failed to send message:', error);
      toast({
        title: "Failed to send",
        description: "Could not send your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💬 Message Board</h1>
          <p className="text-gray-600">Share your thoughts with the community</p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-8 space-y-8">
          {/* Message Input Section */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Send a Message</h2>
            <MessageInput onSendMessage={handleSendMessage} isLoading={isSending} />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200"></div>

          {/* Messages Display Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-700">Messages</h2>
              <button
                onClick={loadMessages}
                disabled={isLoading}
                className="text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50 transition-colors duration-200"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
            </div>
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Connect your backend server to start messaging!</p>
          <p className="mt-1">Backend URL: {import.meta.env.VITE_API_URL || 'http://localhost:5000'}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
