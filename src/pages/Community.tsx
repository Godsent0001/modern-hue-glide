
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  MessageSquare, 
  Users, 
  TrendingUp, 
  Plus, 
  MessageCircle, 
  ThumbsUp,
  Eye,
  Clock,
  Reply
} from "lucide-react";

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  category: string;
  replies: number;
  likes: number;
  views: number;
  timestamp: string;
}

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for discussions
  const discussions: Discussion[] = [
    {
      id: 1,
      title: "How to improve AI prompt engineering?",
      content: "I'm looking for tips and best practices to write better prompts for AI models. What strategies have worked for you?",
      author: "TechEnthusiast",
      category: "AI & Technology",
      replies: 15,
      likes: 32,
      views: 128,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      title: "Best practices for content writing in 2024",
      content: "With all the changes in SEO and AI tools, what are the current best practices for content writing?",
      author: "ContentCreator",
      category: "Content Writing",
      replies: 23,
      likes: 45,
      views: 201,
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      title: "How to scale a digital marketing agency?",
      content: "Looking for advice on scaling from a solo freelancer to a full agency. What were your biggest challenges?",
      author: "StartupFounder",
      category: "Digital Marketing",
      replies: 31,
      likes: 67,
      views: 312,
      timestamp: "6 hours ago"
    },
    {
      id: 4,
      title: "Tips for better graphic design workflow",
      content: "I'm spending too much time on revisions. How can I streamline my design workflow and communicate better with clients?",
      author: "DesignNewbie",
      category: "Graphic Design",
      replies: 18,
      likes: 29,
      views: 156,
      timestamp: "8 hours ago"
    }
  ];

  const categories = ["All", "AI & Technology", "Content Writing", "Digital Marketing", "Graphic Design", "Business", "Programming"];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = 
      discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      discussion.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = activeTab === "all" || discussion.category === activeTab;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
                <p className="text-gray-600">Connect, share, and learn with fellow professionals</p>
              </div>
              <div className="flex gap-3">
                <Link to="/replies">
                  <Button variant="outline">
                    <Reply className="w-4 h-4 mr-2" />
                    View All Replies
                  </Button>
                </Link>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Discussion
                </Button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search discussions, topics, authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full max-w-md"
              />
            </div>

            {/* Stats */}
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
          </div>

          {/* Category Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 w-full">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category} 
                  value={category === "All" ? "all" : category}
                  className="text-xs sm:text-sm"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Discussions */}
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
                    <Link to={`/discussion/${discussion.id}`}>
                      <CardTitle className="text-lg mb-3 hover:text-blue-600 cursor-pointer">
                        {discussion.title}
                      </CardTitle>
                    </Link>
                    <p className="text-gray-700 mb-4 line-clamp-2">{discussion.content}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          {discussion.replies}
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
                      <Link to={`/discussion/${discussion.id}`}>
                        <Button variant="ghost" size="sm">
                          Join Discussion
                        </Button>
                      </Link>
                    </div>
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
        </div>
      </main>
    </div>
  );
};

export default Community;
