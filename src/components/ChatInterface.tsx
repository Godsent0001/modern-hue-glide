
import { useState } from 'react';
import { Send, X, Upload, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  file?: string;
}

interface ChatInterfaceProps {
  freelancer: {
    id: number;
    name: string;
    specialty: string;
    avatar: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const ChatInterface = ({ freelancer, isOpen, onClose }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      content: `Hi! I'm ${freelancer.name}. I'd love to help you with your ${freelancer.specialty.toLowerCase()} needs. What project are you working on?`,
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [availableTokens] = useState(250000); // Mock available tokens

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        content: "That sounds like an interesting project! I have experience with similar work. Let me know more details about your requirements and timeline.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        file: file.name
      };
      setMessages(prev => [...prev, fileMessage]);
    }
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}K`;
    }
    return tokens.toString();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-[90vh] sm:h-96 flex flex-col max-h-screen">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b">
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-sm sm:text-base truncate">{freelancer.name}</h3>
              <p className="text-xs sm:text-sm text-gray-600 truncate">{freelancer.specialty}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <div className="flex items-center space-x-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              <Coins className="w-3 h-3" />
              <span className="hidden sm:inline">{formatTokens(availableTokens)}</span>
              <span className="sm:hidden">{formatTokens(availableTokens).replace('tokens', '')}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1 sm:p-2">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-xs px-3 py-2 rounded-lg text-sm sm:text-base ${
                  message.sender === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.file && (
                  <div className="text-xs opacity-75 mb-1">📎 {message.file}</div>
                )}
                <div className="break-words">{message.content}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-3 sm:p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            <label htmlFor="file-upload">
              <Button type="button" variant="outline" size="sm" className="px-2 flex-shrink-0">
                <Upload className="w-4 h-4" />
              </Button>
            </label>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-w-0"
            />
            <Button type="submit" size="sm" className="flex-shrink-0">
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
