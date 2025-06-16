import React from 'react';
import { Message } from '@/lib/supabase';

interface MessageListProps {
  messages: Message[];
  isLoading?: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isLoading = false }) => {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg p-4">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">💬</div>
        <p className="text-gray-500">No messages yet. Be the first to send one!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={message.id}
          className="bg-blue-50 rounded-lg p-4 border border-blue-100 animate-fade-in transition-all duration-300 hover:shadow-md"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <p className="text-gray-700 mb-2 whitespace-pre-wrap">{message.text}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>🕒</span>
            <span className="ml-1">{formatTimestamp(message.timestamp)}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
