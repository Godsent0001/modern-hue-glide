import { useState } from "react";
import Navigation from "@/components/Navigation";
import AISpecialistCard from "@/components/AISpecialistCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Users, 
  TrendingUp,
  MessageCircle, 
  ThumbsUp,
  Eye,
  Clock,
  Send
} from "lucide-react";

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: string;
  replies: Reply[];
  likes: number;
  views: number;
  timestamp: string;
}

interface Reply {
  id: number;
  content: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  likes: number;
}

const BrowseAI = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [discussionSearchTerm, setDiscussionSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("specialists");
  const [selectedDiscussion, setSelectedDiscussion] = useState<number | null>(null);
  const [newReply, setNewReply] = useState("");

  // Mock data for AI specialists
  const specialists = [
    {
      id: 1,
      name: "Alex Chen",
      title: "AI Content Writer",
      rating: 4.9,
      reviews: 127,
      hourlyRate: 45,
      skills: ["Content Writing", "SEO", "Blog Posts"],
      avatar: "/placeholder.svg",
      isOnline: true
    },
    {
      id: 2,
      name: "Sarah Johnson",
      title: "Digital Marketing Strategist",
      rating: 4.8,
      reviews: 89,
      hourlyRate: 55,
      skills: ["Social Media", "PPC", "Analytics"],
      avatar: "/placeholder.svg",
      isOnline: false
    },
    {
      id: 3,
      name: "Mike Rodriguez",
      title: "Graphic Designer",
      rating: 4.9,
      reviews: 156,
      hourlyRate: 40,
      skills: ["Logo Design", "Branding", "UI/UX"],
      avatar: "/placeholder.svg",
      isOnline: true
    },
    {
      id: 4,
      name: "Emily Davis",
      title: "Web Developer",
      rating: 4.7,
      reviews: 203,
      hourlyRate: 65,
      skills: ["React", "Node.js", "Full Stack"],
      avatar: "/placeholder.svg",
      isOnline: true
    },
    {
      id: 5,
      name: "David Wilson",
      title: "Data Analyst",
      rating: 4.8,
      reviews: 94,
      hourlyRate: 50,
      skills: ["Python", "SQL", "Visualization"],
      avatar: "/placeholder.svg",
      isOnline: false
    },
    {
      id: 6,
      name: "Lisa Park",
      title: "Video Editor",
      rating: 4.9,
      reviews: 78,
      hourlyRate: 45,
      skills: ["After Effects", "Premiere", "Motion Graphics"],
      avatar: "/placeholder.svg",
      isOnline: true
    }
  ];

  // Mock data for community discussions
  const discussions: Discussion[] = [
    {
      id: 1,
      title: "Best practices for AI-powered content creation",
      content: "I've been experimenting with different AI tools for content creation. What are your best practices?",
      author: "Sarah Johnson",
      category: "Content Writing",
      replies: [
        {
          id: 1,
          content: "I always start with a clear brief and iterate on the output. Works great!",
          author: "Mike Davis",
          timestamp: "2 hours ago",
          likes: 5
        },
        {
          id: 2,
          content: "Using prompt engineering techniques has improved my results significantly.",
          author: "Emily Chen",
          timestamp: "1 hour ago",
          likes: 8
        }
      ],
      likes: 23,
      views: 156,
      timestamp: "4 hours ago"
    },
    {
      id: 2,
      title: "How to optimize AI prompts for better results",
      content: "Looking for tips on writing effective prompts that get consistent, high-quality outputs.",
      author: "David Wilson",
      category: "AI & Technology",
      replies: [
        {
          id: 3,
          content: "Be specific with context and examples. It makes a huge difference!",
          author: "Lisa Park",
          timestamp: "3 hours ago",
          likes: 12
        }
      ],
      likes: 34,
      views: 289,
      timestamp: "6 hours ago"
    }
  ];

  const categories = ["all", "Content Writing", "AI & Technology", "Digital Marketing", "Graphic Design"];

  const filteredSpecialists = specialists.filter(specialist =>
    specialist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    specialist.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = 
      discussion.title.toLowerCase().includes(discussionSearchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(discussionSearchTerm.toLowerCase()) ||
      discussion.author.toLowerCase().includes(discussionSearchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || discussion.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleReplySubmit = (discussionId: number) => {
    if (newReply.trim()) {
      // In a real app, this would make an API call
      console.log(`Replying to discussion ${discussionId}: ${newReply}`);
      setNewReply("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse AI Specialists</h1>
            <p className="text-gray-600">Find the perfect AI specialist for your project</p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md">
              <TabsTrigger value="specialists">AI Specialists</TabsTrigger>
              <TabsTrigger value="discussions">Community Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="specialists" className="space-y-6">
              {/* Search and Filter */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search specialists, skills, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Specialists Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpecialists.map((specialist) => (
                  <AISpecialistCard key={specialist.id} specialist={specialist} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="discussions" className="space-y-6">
              {/* Community Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <MessageSquare className="w-8 h-8 text-blue-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">1,247</p>
                        <p className="text-gray-600">Discussions</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <Users className="w-8 h-8 text-green-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">3,892</p>
                        <p className="text-gray-600">Members</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center">
                      <TrendingUp className="w-8 h-8 text-purple-600 mr-3" />
                      <div>
                        <p className="text-2xl font-bold text-gray-900">892</p>
                        <p className="text-gray-600">Active Today</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Search and Filter for Discussions */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search discussions, topics, authors..."
                    value={discussionSearchTerm}
                    onChange={(e) => setDiscussionSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === "all" ? "All Categories" : category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Discussions List */}
              <div className="space-y-6">
                {filteredDiscussions.length > 0 ? (
                  filteredDiscussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={discussion.authorAvatar} />
                              <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">{discussion.author}</p>
                              <div className="flex items-center space-x-2 text-sm text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>{discussion.timestamp}</span>
                              </div>
                            </div>
                          </div>
                          <Badge variant="secondary">{discussion.category}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardTitle className="text-lg mb-3">{discussion.title}</CardTitle>
                        <p className="text-gray-700 mb-4">{discussion.content}</p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {discussion.replies.length}
                            </div>
                            <div className="flex items-center">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {discussion.likes}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {discussion.views}
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedDiscussion(selectedDiscussion === discussion.id ? null : discussion.id)}
                          >
                            {selectedDiscussion === discussion.id ? 'Hide Replies' : 'View Replies'}
                          </Button>
                        </div>

                        {/* Replies Section */}
                        {selectedDiscussion === discussion.id && (
                          <div className="border-t pt-4 space-y-4">
                            {/* Existing Replies */}
                            {discussion.replies.map((reply) => (
                              <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                                <div className="flex items-start space-x-3">
                                  <Avatar className="w-8 h-8">
                                    <AvatarImage src={reply.authorAvatar} />
                                    <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                      <p className="font-medium text-sm text-gray-900">{reply.author}</p>
                                      <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">{reply.content}</p>
                                    <Button variant="ghost" size="sm" className="text-xs">
                                      <ThumbsUp className="w-3 h-3 mr-1" />
                                      {reply.likes}
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Reply Form */}
                            <div className="flex space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>You</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex space-x-2">
                                <Input
                                  type="text"
                                  placeholder="Write a reply..."
                                  value={newReply}
                                  onChange={(e) => setNewReply(e.target.value)}
                                  className="flex-1"
                                />
                                <Button 
                                  size="sm"
                                  onClick={() => handleReplySubmit(discussion.id)}
                                  disabled={!newReply.trim()}
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
                    <p className="text-gray-500">Try adjusting your search terms or category filter</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default BrowseAI;
