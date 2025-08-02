import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import CreateDiscussionModal from '@/components/CreateDiscussionModal';
import BrowseNavigation from '@/components/browse/BrowseNavigation';
import BrowseFilters from '@/components/browse/BrowseFilters';
import AISpecialistGrid from '@/components/browse/AISpecialistGrid';
import CommunitySection from '@/components/browse/CommunitySection';
import SubcategoriesCard from '@/components/browse/SubcategoriesCard';

const BrowseAI = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedSubcategory, setSelectedSubcategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [activeTab, setActiveTab] = useState('browse');
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

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'all') {
      const categorySubcategories = {
        'Content Writing': ['Blog Posts', 'Website Content', 'Articles', 'SEO Content'],
        'Copywriting': ['Sales Pages', 'Ad Copy', 'Email Marketing Campaigns'],
        'Business Writing': ['Business Proposals', 'Reports', 'Presentations']
      };
      const subs = categorySubcategories[category as keyof typeof categorySubcategories] || [];
      setShowSubcategories(true);
      navigate(`/browse-ai?category=${encodeURIComponent(category)}`, {
        state: { subcategories: subs }
      });
    }
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

  const handleCreateDiscussion = (discussion: { title: string; content: string; category: string }) => {
    console.log('New discussion created:', discussion);
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

  const handleReplyTextChange = (postId: number, text: string) => {
    setReplyText(prev => ({
      ...prev,
      [postId]: text
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
          <BrowseNavigation
            showSubcategories={showSubcategories}
            selectedCategory={selectedCategory}
            onBackToHome={handleBackToHome}
            onBackToCategories={handleBackToCategories}
          />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {showSubcategories && selectedCategory !== 'all' 
                ? `${selectedCategory} Specialists` 
                : 'AI Specialists'
              }
            </h1>
            <p className="text-gray-600">Connect with AI professionals tailored to your needs</p>
          </div>

          <SubcategoriesCard
            selectedCategory={selectedCategory}
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategorySelect={handleSubcategorySelect}
          />

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
              <BrowseFilters
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                showSubcategories={showSubcategories}
                categories={categories}
                ratingOptions={ratingOptions}
                onCategoryChange={handleCategoryChange}
              />

              <AISpecialistGrid
                specialists={filteredFreelancers}
                onViewProfile={handleViewProfile}
                onHire={handleHire}
              />
            </>
          )}

          {activeTab === 'community' && (
            <CommunitySection
              posts={filteredCommunityPosts}
              searchTerm={communitySearchTerm}
              onSearchChange={setCommunitySearchTerm}
              onCreateDiscussion={() => setShowCreateDiscussion(true)}
              showReplies={showReplies}
              showReplyForm={showReplyForm}
              replyText={replyText}
              replies={replies}
              onToggleReplies={toggleReplies}
              onToggleReplyForm={toggleReplyForm}
              onReplyTextChange={handleReplyTextChange}
              onReplySubmit={handleReplySubmit}
            />
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
