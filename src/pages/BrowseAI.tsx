import { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, MessageSquare, Users, Heart, Reply, Send, X, ArrowLeft, ChevronRight } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';

const BrowseAI = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSubcategories, setShowSubcategories] = useState(false);

  // Get subcategories from navigation state
  const subcategories = location.state?.subcategories || [];

  useEffect(() => {
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search') || '');
    }
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category') || 'all');
      if (searchParams.get('category') !== 'all') {
        setShowSubcategories(true);
      }
    }
  }, [searchParams]);

  const aiFreelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Content Writing",
      subSpecialty: "Blog Posts",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 127,
      responseTime: "< 1 hour",
      skills: ["Blog Posts", "SEO Content", "Social Media"],
      description: "Specialized in creating engaging content that drives results",
      online: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      specialty: "Copywriting",
      subSpecialty: "Sales Pages",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedProjects: 89,
      responseTime: "< 30 min",
      skills: ["Sales Copy", "Ad Copy", "Email Marketing"],
      description: "Creating persuasive copy that converts visitors into customers",
      online: true
    },
    {
      id: 3,
      name: "Emily Watson",
      specialty: "Creative Writing",
      subSpecialty: "Short Stories",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 156,
      responseTime: "< 2 hours",
      skills: ["Fiction", "Poetry", "Screenplays"],
      description: "Bringing stories to life with compelling narratives",
      online: false
    },
    {
      id: 4,
      name: "David Kim",
      specialty: "Business Writing",
      subSpecialty: "Business Proposals",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedProjects: 203,
      responseTime: "< 1 hour",
      skills: ["Proposals", "Reports", "Presentations"],
      description: "Professional business communications that get results",
      online: true
    }
  ];

  const communityPosts = [
    {
      id: 1,
      author: "Alex Thompson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop&crop=face",
      title: "How to effectively communicate with AI copywriters?",
      content: "I've been working with AI writers and want to share some tips on getting the best results...",
      likes: 24,
      replies: 8,
      time: "2 hours ago",
      category: "Tips & Tricks"
    },
    {
      id: 2,
      author: "Jessica Lee",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
      title: "Best AI specialists for e-commerce projects?",
      content: "Looking for recommendations for AI specialists who understand e-commerce well...",
      likes: 18,
      replies: 12,
      time: "5 hours ago",
      category: "Recommendations"
    },
    {
      id: 3,
      author: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
      title: "AI vs Traditional Freelancers - My Experience",
      content: "After 6 months of using both, here's what I've learned about the differences...",
      likes: 42,
      replies: 15,
      time: "1 day ago",
      category: "Discussion"
    }
  ];

  const categories = [
    "all", "Content Writing", "Copywriting", "Business Writing", "Ghost Writing",
    "Academic Writing", "Journalism and Editorial", "Resume and Career Writing",
    "Legal and Financial Writing", "Creative Writing", "Editing and Proofreading",
    "Marketing Content Creation", "Emerging Writings"
  ];

  const filteredFreelancers = aiFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.subSpecialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || freelancer.specialty === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || freelancer.subSpecialty === selectedSubcategory;
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  const handleBackToCategories = () => {
    setSelectedCategory('all');
    setSelectedSubcategory('all');
    setShowSubcategories(false);
    navigate('/browse-ai');
  };

  const handleSubcategorySelect = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
  };

  const handleHire = (freelancer: any) => {
    setSelectedFreelancer(freelancer);
    setShowChat(true);
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: `Hi! I'm ${freelancer.name}. I'd love to help you with your ${freelancer.specialty.toLowerCase()} needs. What project are you working on?`,
        timestamp: new Date()
      }
    ]);
  };

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
      const aiResponse = {
        id: messages.length + 2,
        sender: 'ai',
        content: "That sounds like an interesting project! I have experience with similar work. Let me know more details about your requirements and timeline.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          {showSubcategories && selectedCategory !== 'all' && (
            <div className="flex items-center mb-6 text-sm text-gray-600">
              <button 
                onClick={handleBackToCategories}
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                All Categories
              </button>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">{selectedCategory}</span>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {showSubcategories && selectedCategory !== 'all' 
                ? `${selectedCategory} Specialists` 
                : 'AI Specialists'
              }
            </h1>
            <p className="text-gray-600">Connect with AI professionals tailored to your needs</p>
          </div>

          {/* Subcategories */}
          {showSubcategories && subcategories.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">Subcategories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleSubcategorySelect('all')}
                  >
                    All {selectedCategory}
                  </Button>
                  {subcategories.map((subcategory: string, index: number) => (
                    <Button
                      key={index}
                      variant={selectedSubcategory === subcategory ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => handleSubcategorySelect(subcategory)}
                    >
                      {subcategory}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('browse')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'browse'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Browse Specialists
                </button>
                <button
                  onClick={() => setActiveTab('community')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'community'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Community
                </button>
              </nav>
            </div>
          </div>

          {activeTab === 'browse' && (
            <>
              {/* Search and Filters */}
              <Card className="mb-8">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search specialists..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {!showSubcategories && (
                      <div className="flex items-center gap-4">
                        <Filter className="text-gray-500 w-5 h-5" />
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>
                              {category === 'all' ? 'All Categories' : category}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AI Specialists Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map((freelancer) => (
                  <Card key={freelancer.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <img
                              src={freelancer.avatar}
                              alt={freelancer.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${freelancer.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{freelancer.name}</CardTitle>
                            <p className="text-sm text-blue-600">{freelancer.specialty}</p>
                            <p className="text-xs text-gray-500">{freelancer.subSpecialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Star className="w-4 h-4 text-yellow-500 mr-1" />
                          <span>{freelancer.rating}</span>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      <p className="text-gray-600 text-sm">{freelancer.description}</p>

                      <div className="flex flex-wrap gap-2">
                        {freelancer.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{freelancer.responseTime}</span>
                        </div>
                        <span className="font-medium text-green-600">FREE</span>
                      </div>

                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" className="flex-1" size="sm">
                          View Profile
                        </Button>
                        <Button 
                          className="flex-1" 
                          size="sm"
                          onClick={() => handleHire(freelancer)}
                        >
                          Hire Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}

          {activeTab === 'community' && (
            <div className="space-y-6">
              {/* Community Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-semibold">Community Discussions</h2>
                      <p className="text-gray-600">Connect with other users and share experiences</p>
                    </div>
                    <Button>Start Discussion</Button>
                  </div>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      <span>2,847 members</span>
                    </div>
                    <div className="flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>156 discussions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Posts */}
              <div className="space-y-4">
                {communityPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <h3 className="font-medium text-gray-900">{post.title}</h3>
                              <div className="flex items-center space-x-2 text-sm text-gray-600">
                                <span>{post.author}</span>
                                <span>•</span>
                                <span>{post.time}</span>
                                <span>•</span>
                                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">
                                  {post.category}
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{post.content}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <button className="flex items-center hover:text-red-600 transition-colors">
                              <Heart className="w-4 h-4 mr-1" />
                              <span>{post.likes}</span>
                            </button>
                            <button className="flex items-center hover:text-blue-600 transition-colors">
                              <Reply className="w-4 h-4 mr-1" />
                              <span>{post.replies} replies</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showChat && selectedFreelancer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md h-96 flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedFreelancer.avatar}
                  alt={selectedFreelancer.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium">{selectedFreelancer.name}</h3>
                  <p className="text-sm text-gray-600">{selectedFreelancer.specialty}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
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
            <form onSubmit={handleSendMessage} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Button type="submit" size="sm">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BrowseAI;
