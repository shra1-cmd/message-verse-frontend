
import { supabase, Message } from '@/lib/supabase';

export interface Message {
  id: string;
  text: string;
  timestamp: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
  const { data, error } = await supabase
    .from('messages')
    .select('*')
    .order('timestamp', { ascending: true });

  if (error) {
    console.error('Error fetching messages:', error);
    throw new Error('Failed to fetch messages');
  }

  return data || [];
};

export const sendMessage = async (text: string): Promise<Message> => {
  const message = {
    text,
    timestamp: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('messages')
    .insert([message])
    .select()
    .single();

  if (error) {
    console.error('Error sending message:', error);
    throw new Error('Failed to send message');
  }

  return data;
};
