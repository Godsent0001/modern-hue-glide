
import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const ChatPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Get freelancer data from location state or create default
  const freelancer = location.state?.freelancer || {
    id: parseInt(id || '1'),
    name: 'AI Specialist',
    specialty: 'Content Writing',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    responseTime: '< 1 hour',
    description: 'Professional AI specialist ready to help with your project.'
  };

  useEffect(() => {
    // Initialize chat with welcome message
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
    if (!newMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate AI response
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6">
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
                <div className="flex items-center space-x-4">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900">{freelancer.name}</h1>
                    <p className="text-blue-600 font-medium">{freelancer.specialty}</p>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>{freelancer.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{freelancer.responseTime}</span>
                      </div>
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Chat Interface */}
          <Card className="h-96 flex flex-col">
            <CardHeader className="pb-4">
              <h2 className="text-lg font-semibold">Chat with {freelancer.name}</h2>
            </CardHeader>
            
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button type="submit">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
