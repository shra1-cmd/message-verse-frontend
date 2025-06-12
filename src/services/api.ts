
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Message {
  id: string;
  text: string;
  timestamp: string;
}

export const fetchMessages = async (): Promise<Message[]> => {
  const response = await api.get('/messages');
  return response.data;
};

export const sendMessage = async (text: string): Promise<Message> => {
  const response = await api.post('/messages', { text });
  return response.data;
};

export default api;
