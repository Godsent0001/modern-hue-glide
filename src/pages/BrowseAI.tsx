import { useState, useEffect } from 'react';
import { Search, Filter, Star, Clock, MessageSquare, Users, Heart, Reply, Send, X, ArrowLeft, ChevronRight, MessageCircle } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import CreateDiscussionModal from '@/components/CreateDiscussionModal';

const BrowseAI = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');
  const [selectedFreelancer, setSelectedFreelancer] = useState<any>(null);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const [showCreateDiscussion, setShowCreateDiscussion] = useState(false);
  const [communitySearchTerm, setCommunitySearchTerm] = useState('');
  const [showReplies, setShowReplies] = useState<{[key: number]: boolean}>({});
  const [showReplyForm, setShowReplyForm] = useState<{[key: number]: boolean}>({});
  const [replyText, setReplyText] = useState<{[key: number]: string}>({});
  const [replies, setReplies] = useState<{[key: number]: any[]}>({});

  const subcategories = location.state?.subcategories || [];

  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (searchParams.get('search')) {
      setSearchTerm(searchParams.get('search') || '');
    }
    if (searchParams.get('category')) {
      setSelectedCategory(searchParams.get('category') || 'all');
      if (searchParams.get('category') !== 'all') {
        setShowSubcategories(true);
      }
    }

    // Initialize sample replies
    setReplies({
      1: [
        {
          id: 1,
          author: "Sarah Wilson",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=50&h=50&fit=crop&crop=face",
          content: "Great tips! I especially found the part about setting clear expectations helpful.",
          time: "1 hour ago"
        },
        {
          id: 2,
          author: "Mark Johnson",
          avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
          content: "Thanks for sharing this. Do you have any specific examples of prompts that work well?",
          time: "30 minutes ago"
        }
      ],
      2: [
        {
          id: 3,
          author: "Emma Davis",
          avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face",
          content: "I'd recommend checking out Content AI Pro - they have great e-commerce specialists.",
          time: "3 hours ago"
        }
      ]
    });
  }, [searchParams]);

  const aiFreelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Content Writing",
      subSpecialty: "Blog Posts",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 127,
      responseTime: "< 1 hour",
      skills: ["Blog Posts", "SEO Content", "Social Media"],
      description: "I create engaging blog content that drives traffic and converts readers into customers",
      online: true
    },
    {
      id: 2,
      name: "Michael Torres",
      specialty: "Content Writing",
      subSpecialty: "Website Content",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedProjects: 89,
      responseTime: "< 2 hours",
      skills: ["Website Copy", "Landing Pages", "Product Descriptions"],
      description: "Specializing in website content that enhances user experience and boosts conversions",
      online: true
    },
    {
      id: 3,
      name: "Jessica Park",
      specialty: "Content Writing",
      subSpecialty: "Articles",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 156,
      responseTime: "< 1 hour",
      skills: ["Research Articles", "Industry News", "Thought Leadership"],
      description: "Creating well-researched articles that establish authority and engage audiences",
      online: false
    },
    {
      id: 4,
      name: "Marcus Rodriguez",
      specialty: "Copywriting",
      subSpecialty: "Sales Pages",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedProjects: 203,
      responseTime: "< 30 min",
      skills: ["Sales Copy", "Conversion Optimization", "Psychology"],
      description: "High-converting sales pages that turn visitors into paying customers",
      online: true
    },
    {
      id: 5,
      name: "Amanda Foster",
      specialty: "Copywriting",
      subSpecialty: "Ad Copy",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedProjects: 134,
      responseTime: "< 1 hour",
      skills: ["Facebook Ads", "Google Ads", "Social Media"],
      description: "Crafting compelling ad copy that maximizes click-through rates and ROI",
      online: true
    },
    {
      id: 6,
      name: "David Kim",
      specialty: "Copywriting",
      subSpecialty: "Email Marketing Campaigns",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 167,
      responseTime: "< 2 hours",
      skills: ["Email Sequences", "Newsletter", "Automation"],
      description: "Email campaigns that nurture leads and drive consistent sales",
      online: false
    },
    {
      id: 7,
      name: "Lisa Wang",
      specialty: "Business Writing",
      subSpecialty: "Business Proposals",
      avatar: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedProjects: 92,
      responseTime: "< 3 hours",
      skills: ["Proposals", "RFP Responses", "Executive Summaries"],
      description: "Professional business proposals that win contracts and secure partnerships",
      online: true
    },
    {
      id: 8,
      name: "Robert Chen",
      specialty: "Business Writing",
      subSpecialty: "Reports",
      avatar: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedProjects: 78,
      responseTime: "< 4 hours",
      skills: ["Financial Reports", "Market Analysis", "Performance Reviews"],
      description: "Comprehensive business reports that inform strategic decision-making",
      online: true
    },
    {
      id: 9,
      name: "Emily Davis",
      specialty: "Business Writing",
      subSpecialty: "Presentations",
      avatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 114,
      responseTime: "< 2 hours",
      skills: ["PowerPoint", "Keynote", "Sales Presentations"],
      description: "Compelling presentations that captivate audiences and drive action",
      online: true
    },
    {
      id: 10,
      name: "Alex Morgan",
      specialty: "Creative Writing",
      subSpecialty: "Short Stories",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedProjects: 85,
      responseTime: "< 1 day",
      skills: ["Fiction", "Character Development", "Plot Structure"],
      description: "Captivating short stories that entertain and engage readers",
      online: false
    },
    {
      id: 11,
      name: "Sofia Martinez",
      specialty: "Creative Writing",
      subSpecialty: "Poetry",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedProjects: 67,
      responseTime: "< 6 hours",
      skills: ["Modern Poetry", "Classical Forms", "Spoken Word"],
      description: "Beautiful poetry that touches hearts and expresses deep emotions",
      online: true
    },
    {
      id: 12,
      name: "James Wilson",
      specialty: "Creative Writing",
      subSpecialty: "Screenplays",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedProjects: 43,
      responseTime: "< 1 day",
      skills: ["Film Scripts", "TV Scripts", "Dialogue"],
      description: "Professional screenplays that bring stories to life on screen",
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

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '4.5+', label: '4.5+ Stars' },
    { value: '4.0+', label: '4.0+ Stars' },
    { value: '3.5+', label: '3.5+ Stars' }
  ];

  const filteredFreelancers = aiFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.subSpecialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || freelancer.specialty === selectedCategory;
    const matchesSubcategory = selectedSubcategory === 'all' || freelancer.subSpecialty === selectedSubcategory;
    
    let matchesRating = true;
    if (selectedRating !== 'all') {
      const minRating = parseFloat(selectedRating.replace('+', ''));
      matchesRating = freelancer.rating >= minRating;
    }
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesRating;
  });

  const filteredCommunityPosts = communityPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(communitySearchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(communitySearchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(communitySearchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(communitySearchTerm.toLowerCase());
    return matchesSearch;
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
    navigate(`/chat/${freelancer.id}`, { state: { freelancer } });
  };

  const handleViewProfile = (freelancer: any) => {
    navigate(`/ai-specialist/${freelancer.id}`, { state: { freelancer } });
  };

  const handleBackToHome = () => {
    navigate('/');
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

  const handleCreateDiscussion = (discussion: { title: string; content: string; category: string }) => {
    console.log('New discussion created:', discussion);
    // In a real app, this would be sent to the backend
  };

  const toggleReplies = (postId: number) => {
    setShowReplies(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const toggleReplyForm = (postId: number) => {
    setShowReplyForm(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleReplySubmit = (postId: number) => {
    const replyContent = replyText[postId]?.trim();
    if (!replyContent) return;

    const newReply = {
      id: Date.now(),
      author: "You",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop&crop=face",
      content: replyContent,
      time: "Just now"
    };

    setReplies(prev => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newReply]
    }));

    setReplyText(prev => ({
      ...prev,
      [postId]: ''
    }));

    setShowReplyForm(prev => ({
      ...prev,
      [postId]: false
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {showSubcategories && selectedCategory !== 'all' && (
            <div className="flex items-center mb-6 text-sm text-gray-600">
              <button 
                onClick={handleBackToHome}
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Home
              </button>
              <ChevronRight className="w-4 h-4 mx-2" />
              <button 
                onClick={handleBackToCategories}
                className="hover:text-blue-600 transition-colors"
              >
                All Categories
              </button>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-900 font-medium">{selectedCategory}</span>
            </div>
          )}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {showSubcategories && selectedCategory !== 'all' 
                ? `${selectedCategory} Specialists` 
                : 'AI Specialists'
              }
            </h1>
            <p className="text-gray-600">Connect with AI professionals tailored to your needs</p>
          </div>

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
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col gap-4">
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
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                      <Filter className="text-gray-500 w-5 h-5 flex-shrink-0" />
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                        {!showSubcategories && (
                          <select
                            value={selectedCategory}
                            onChange={(e) => {
                              setSelectedCategory(e.target.value);
                              if (e.target.value !== 'all') {
                                // Simulate getting subcategories for the selected category
                                const categorySubcategories = {
                                  'Content Writing': ['Blog Posts', 'Website Content', 'Articles', 'SEO Content'],
                                  'Copywriting': ['Sales Pages', 'Ad Copy', 'Email Marketing Campaigns'],
                                  'Business Writing': ['Business Proposals', 'Reports', 'Presentations']
                                };
                                const subs = categorySubcategories[e.target.value as keyof typeof categorySubcategories] || [];
                                setShowSubcategories(true);
                                // Update URL to include subcategories
                                navigate(`/browse-ai?category=${encodeURIComponent(e.target.value)}`, {
                                  state: { subcategories: subs }
                                });
                              }
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          >
                            {categories.map(category => (
                              <option key={category} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                              </option>
                            ))}
                          </select>
                        )}
                        <select
                          value={selectedRating}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        >
                          {ratingOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Specialists Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFreelancers.map((freelancer) => (
                  <Card key={freelancer.id} className="hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <div className="relative flex-shrink-0">
                            <img
                              src={freelancer.avatar}
                              alt={freelancer.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${freelancer.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          </div>
                          <div className="min-w-0 flex-1">
                            <CardTitle className="text-lg truncate">{freelancer.name}</CardTitle>
                            <p className="text-sm text-blue-600 truncate">{freelancer.specialty}</p>
                            <p className="text-xs text-gray-500 truncate">{freelancer.subSpecialty}</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-600 flex-shrink-0 ml-2">
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
                        <Button 
                          variant="outline" 
                          className="flex-1" 
                          size="sm"
                          onClick={() => handleViewProfile(freelancer)}
                        >
                          View Profile
                        </Button>
                        <Button 
                          className="flex-1" 
                          size="sm"
                          onClick={() => handleHire(freelancer)}
                        >
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
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
                    <Button onClick={() => setShowCreateDiscussion(true)}>
                      Start Discussion
                    </Button>
                  </div>
                  
                  {/* Search Bar for Community */}
                  <div className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="text"
                        placeholder="Search discussions..."
                        value={communitySearchTerm}
                        onChange={(e) => setCommunitySearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
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
                {filteredCommunityPosts.map((post) => (
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
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <button className="flex items-center hover:text-red-600 transition-colors">
                              <Heart className="w-4 h-4 mr-1" />
                              <span>{post.likes}</span>
                            </button>
                            <button 
                              className="flex items-center hover:text-blue-600 transition-colors"
                              onClick={() => toggleReplies(post.id)}
                            >
                              <MessageSquare className="w-4 h-4 mr-1" />
                              <span>{replies[post.id]?.length || 0} replies</span>
                            </button>
                            <button 
                              className="flex items-center hover:text-green-600 transition-colors"
                              onClick={() => toggleReplyForm(post.id)}
                            >
                              <Reply className="w-4 h-4 mr-1" />
                              <span>Reply</span>
                            </button>
                          </div>

                          {/* Reply Form */}
                          {showReplyForm[post.id] && (
                            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                              <Textarea
                                placeholder="Write your reply..."
                                value={replyText[post.id] || ''}
                                onChange={(e) => setReplyText(prev => ({
                                  ...prev,
                                  [post.id]: e.target.value
                                }))}
                                className="mb-3"
                                rows={3}
                              />
                              <div className="flex space-x-2">
                                <Button 
                                  size="sm"
                                  onClick={() => handleReplySubmit(post.id)}
                                  disabled={!replyText[post.id]?.trim()}
                                >
                                  <Send className="w-4 h-4 mr-1" />
                                  Post Reply
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => toggleReplyForm(post.id)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}

                          {/* Replies Section */}
                          {showReplies[post.id] && replies[post.id] && (
                            <div className="mt-4 space-y-3">
                              <div className="border-t pt-3">
                                <h4 className="text-sm font-medium text-gray-700 mb-3">Replies</h4>
                                {replies[post.id].map((reply) => (
                                  <div key={reply.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                                    <img
                                      src={reply.avatar}
                                      alt={reply.author}
                                      className="w-8 h-8 rounded-full object-cover"
                                    />
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 text-sm">
                                        <span className="font-medium text-gray-900">{reply.author}</span>
                                        <span className="text-gray-500">•</span>
                                        <span className="text-gray-500">{reply.time}</span>
                                      </div>
                                      <p className="text-gray-700 text-sm mt-1">{reply.content}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
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

      <CreateDiscussionModal
        isOpen={showCreateDiscussion}
        onClose={() => setShowCreateDiscussion(false)}
        onSubmit={handleCreateDiscussion}
      />

      <Footer />
    </div>
  );
};

export default BrowseAI;
