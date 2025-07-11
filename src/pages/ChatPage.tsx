import { useState, useEffect, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Star, Clock, Upload, Coins, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import RatingModal from '@/components/RatingModal';

const ChatPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [status, setStatus] = useState('active');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [availableTokens] = useState(250000);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const freelancer = location.state?.freelancer || {
    id: parseInt(id || '1'),
    name: 'AI Specialist',
    specialty: 'Content Writing',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    responseTime: '< 1 hour',
    description: 'Professional AI specialist ready to help with your project.'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const statuses = ['active', 'pending', 'delivered'];
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % statuses.length;
      setStatus(statuses[currentIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: `Hi! I'm ${freelancer.name}. I'd love to help you with your ${freelancer.specialty.toLowerCase()} needs. What project are you working on?`,
        timestamp: new Date()
      }
    ]);
  }, [freelancer.name, freelancer.specialty]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() && uploadedFiles.length === 0) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage || (uploadedFiles.length > 0 ? 'Uploaded files' : ''),
      timestamp: new Date(),
      files: uploadedFiles.map(file => ({
        name: file.name,
        size: file.size,
        type: file.type
      }))
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setUploadedFiles([]);

    setTimeout(() => {
      const responses = [
        "That sounds like an interesting project! I have experience with similar work. Let me know more details about your requirements and timeline.",
        "I'd be happy to help you with that. Could you provide more specific details about what you're looking for?",
        "Great! I specialize in exactly that type of work. What's your target audience and preferred tone?",
        "Perfect! I can definitely assist you with that. What's your budget and timeline for this project?",
        "Excellent choice! I've worked on many similar projects. Do you have any specific requirements or preferences?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        content: randomResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleRating = (rating: number, review: string) => {
    console.log('Rating submitted:', { rating, review, freelancer: freelancer.id });
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}K`;
    }
    return tokens.toString();
  };

  const getStatusColor = () => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'active': return 'Active';
      case 'pending': return 'Pending';
      case 'delivered': return 'Delivered';
      default: return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-2 sm:px-4 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <img
                      src={freelancer.avatar}
                      alt={freelancer.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">{freelancer.name}</h1>
                      <p className="text-blue-600 font-medium text-sm sm:text-base truncate">{freelancer.specialty}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 mr-1" />
                          <span>{freelancer.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                          <span className="hidden sm:inline">{freelancer.responseTime}</span>
                          <span className="sm:hidden">{'< 1h'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 ${getStatusColor()} rounded-full`}></div>
                          <span>{getStatusText()}</span>
                          {status === 'delivered' && (
                            <Button 
                              size="sm" 
                              onClick={() => setShowRatingModal(true)}
                              className="ml-2 bg-blue-600 hover:bg-blue-700 text-xs px-2 py-1"
                            >
                              Rate
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 sm:px-3 py-1 rounded-full flex-shrink-0 self-start sm:self-center whitespace-nowrap">
                    <Coins className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span>{formatTokens(availableTokens)} tokens</span>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="flex flex-col" style={{ height: '70vh', maxHeight: '600px' }}>
            <CardHeader className="pb-4 flex-shrink-0">
              <h2 className="text-base sm:text-lg font-semibold">Chat with {freelancer.name}</h2>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col p-3 sm:p-6 min-h-0">
              {/* Messages - Scrollable */}
              <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-4 min-h-0">
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
                        <div className="flex flex-col max-w-[85%] sm:max-w-xs lg:max-w-md">
                          <div
                            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
                              message.sender === 'user'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {message.files && message.files.length > 0 && (
                              <div className="mb-2">
                                {message.files.map((file: any, index: number) => (
                                  <div key={index} className="text-xs opacity-75 mb-1">
                                    📎 {file.name} ({(file.size / 1024).toFixed(1)} KB)
                                  </div>
                                ))}
                              </div>
                            )}
                            <div className="break-words">{message.content}</div>
                          </div>
                          <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${
                            message.sender === 'user' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span>{formatTime(message.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* File Upload Preview */}
              {uploadedFiles.length > 0 && (
                <div className="mb-4 p-2 sm:p-3 bg-gray-50 rounded-lg flex-shrink-0">
                  <div className="text-xs sm:text-sm text-gray-600 mb-2">Files to upload:</div>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-2 rounded border text-xs sm:text-sm">
                        <div className="flex items-center space-x-2 min-w-0 flex-1">
                          <span className="text-xs">📎</span>
                          <span className="truncate">{file.name}</span>
                          <span className="text-xs text-gray-500 flex-shrink-0">({(file.size / 1024).toFixed(1)} KB)</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="p-1 flex-shrink-0"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Input - Fixed */}
              <form onSubmit={handleSendMessage} className="flex space-x-2 flex-shrink-0">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileSelect}
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  className="px-2 flex-shrink-0"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4" />
                </Button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base min-w-0"
                />
                <Button type="submit" className="flex-shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <RatingModal
        freelancer={freelancer}
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onSubmitRating={handleRating}
      />
    </div>
  );
};

export default ChatPage;
