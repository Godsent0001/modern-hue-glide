
import { useState, useEffect, useRef } from 'react';
import { Send, X, Upload, Coins, Check, CheckCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Message {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: Date;
  file?: string;
  status?: 'sending' | 'sent' | 'delivered' | 'read';
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
      timestamp: new Date(),
      status: 'read'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [availableTokens] = useState(250000);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'sending':
        return <div className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin" />;
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
      ));
    }, 500);

    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === userMessage.id ? { ...msg, status: 'read' } : msg
      ));

      const aiResponse: Message = {
        id: messages.length + 2,
        sender: 'ai',
        content: "That sounds like an interesting project! I have experience with similar work. Let me know more details about your requirements and timeline.",
        timestamp: new Date(),
        status: 'read'
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fileMessage: Message = {
        id: messages.length + 1,
        sender: 'user',
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        file: file.name,
        status: 'sent'
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
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md flex flex-col" style={{ height: '85vh', maxHeight: '600px' }}>
        {/* Chat Header - Fixed */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b flex-shrink-0">
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
            <div className="flex items-center space-x-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full whitespace-nowrap">
              <Coins className="w-3 h-3 flex-shrink-0" />
              <span>{formatTokens(availableTokens)}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="p-1 sm:p-2 flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 min-h-0">
          {messages.map((message, index) => {
            const showDateSeparator = index === 0 || 
              formatDate(message.timestamp) !== formatDate(messages[index - 1].timestamp);
            
            return (
              <div key={message.id}>
                {showDateSeparator && (
                  <div className="flex justify-center my-4">
                    <span className="bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {formatDate(message.timestamp)}
                    </span>
                  </div>
                )}
                <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="flex flex-col max-w-[85%] sm:max-w-xs">
                    <div
                      className={`px-3 py-2 rounded-lg text-sm sm:text-base ${
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
                    <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}>
                      <span>{formatTime(message.timestamp)}</span>
                      {message.sender === 'user' && getStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input - Fixed */}
        <div className="p-3 sm:p-4 border-t flex-shrink-0">
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
