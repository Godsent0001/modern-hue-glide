
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MessageCircle, Clock, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navigation from '@/components/Navigation';

const ChatHistory = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const chatHistory = [
    {
      id: 1,
      specialist: {
        name: "Sarah Chen",
        specialty: "Content Writing",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=150&h=150&fit=crop&crop=face",
        rating: 4.9
      },
      lastMessage: "Great! I'll have your blog post ready by tomorrow.",
      lastMessageTime: "2 hours ago",
      projectTitle: "Blog Post for Tech Startup",
      status: "active"
    },
    {
      id: 2,
      specialist: {
        name: "Michael Torres",
        specialty: "Copywriting",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        rating: 4.8
      },
      lastMessage: "The sales page is complete and ready for review.",
      lastMessageTime: "1 day ago",
      projectTitle: "Sales Page Optimization",
      status: "completed"
    },
    {
      id: 3,
      specialist: {
        name: "Jessica Park",
        specialty: "Business Writing",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        rating: 4.9
      },
      lastMessage: "I'll start working on your proposal this afternoon.",
      lastMessageTime: "3 days ago",
      projectTitle: "Business Proposal Draft",
      status: "pending"
    },
    {
      id: 4,
      specialist: {
        name: "David Kim",
        specialty: "Creative Writing",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        rating: 4.7
      },
      lastMessage: "Thank you for the positive feedback!",
      lastMessageTime: "1 week ago",
      projectTitle: "Short Story Collection",
      status: "completed"
    }
  ];

  const filteredChats = chatHistory.filter(chat =>
    chat.specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.specialist.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Active';
      case 'completed': return 'Completed';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const handleChatClick = (chat: any) => {
    navigate(`/chat/${chat.id}`, { state: { freelancer: chat.specialist } });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Chat History</h1>
            <p className="text-gray-600">Your conversations with AI specialists</p>
          </div>

          {/* Search */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </CardContent>
          </Card>

          {/* Chat List */}
          <div className="space-y-4">
            {filteredChats.map((chat) => (
              <Card
                key={chat.id}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleChatClick(chat)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={chat.specialist.avatar}
                      alt={chat.specialist.name}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {chat.specialist.name}
                          </h3>
                          <p className="text-sm text-blue-600 truncate">
                            {chat.specialist.specialty}
                          </p>
                          <p className="text-sm font-medium text-gray-700 mt-1">
                            {chat.projectTitle}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <div className="flex items-center text-sm text-gray-600">
                            <Star className="w-4 h-4 text-yellow-500 mr-1" />
                            <span>{chat.specialist.rating}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 ${getStatusColor(chat.status)} rounded-full`}></div>
                            <span className="text-sm text-gray-600">{getStatusText(chat.status)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                        {chat.lastMessage}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>{chat.lastMessageTime}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredChats.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations found</h3>
                <p className="text-gray-600 mb-6">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Start chatting with AI specialists to see your conversation history here.'}
                </p>
                <Button onClick={() => navigate('/browse-ai')}>
                  Browse AI Specialists
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;
