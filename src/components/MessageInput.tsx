
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MessageInputProps {
  onSendMessage: (text: string) => Promise<void>;
  isLoading?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading = false }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputText.trim()) return;
    
    try {
      await onSendMessage(inputText.trim());
      setInputText('');
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message here..."
          className="w-full min-h-[100px] p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          disabled={isLoading}
        />
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <Send size={18} />
          <span>{isLoading ? 'Sending...' : 'Send'}</span>
        </Button>
      </div>
    </form>
  );
};

export default MessageInput;
