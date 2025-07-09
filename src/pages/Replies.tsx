
import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, ThumbsUp, Clock, ArrowLeft } from "lucide-react";

interface Reply {
  id: number;
  originalPost: string;
  originalAuthor: string;
  content: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  likes: number;
  category: string;
}

const Replies = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for replies
  const replies: Reply[] = [
    {
      id: 1,
      originalPost: "How to improve AI prompt engineering?",
      originalAuthor: "TechEnthusiast",
      content: "I've found that being more specific with context and examples really helps. Try breaking down complex prompts into smaller, more focused ones.",
      author: "AIExpert2024",
      timestamp: "2 hours ago",
      likes: 15,
      category: "AI & Technology"
    },
    {
      id: 2,
      originalPost: "Best practices for content writing in 2024",
      originalAuthor: "ContentCreator",
      content: "Great question! I recommend focusing on E-A-T (Expertise, Authoritativeness, Trustworthiness) and incorporating user intent into your writing strategy.",
      author: "WritingPro",
      timestamp: "4 hours ago",
      likes: 23,
      category: "Content Writing"
    },
    {
      id: 3,
      originalPost: "How to scale a digital marketing agency?",
      originalAuthor: "StartupFounder",
      content: "From my experience, focusing on automation tools and building strong client relationships has been key. Also, don't forget to invest in your team's skills.",
      author: "MarketingGuru",
      timestamp: "6 hours ago",
      likes: 31,
      category: "Digital Marketing"
    },
    {
      id: 4,
      originalPost: "Tips for better graphic design workflow",
      originalAuthor: "DesignNewbie",
      content: "I use a design system with reusable components and always start with wireframes. Tools like Figma's auto-layout have been game changers for me.",
      author: "CreativeDesigner",
      timestamp: "8 hours ago",
      likes: 18,
      category: "Graphic Design"
    }
  ];

  const filteredReplies = replies.filter(reply =>
    reply.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reply.originalPost.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reply.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reply.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Link to="/community">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Community
                </Button>
              </Link>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">All Replies</h1>
            <p className="text-gray-600">View all replies from community discussions</p>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search replies, posts, authors, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full"
              />
            </div>
          </div>

          {/* Replies List */}
          <div className="space-y-6">
            {filteredReplies.length > 0 ? (
              filteredReplies.map((reply) => (
                <Card key={reply.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-10 h-10">
                          <AvatarImage src={reply.authorAvatar} />
                          <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold text-gray-900">{reply.author}</p>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>{reply.timestamp}</span>
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">{reply.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Original Post Reference */}
                    <div className="bg-gray-50 p-3 rounded-lg mb-4 border-l-4 border-blue-500">
                      <p className="text-sm text-gray-600 mb-1">Replying to:</p>
                      <p className="font-medium text-gray-800">"{reply.originalPost}"</p>
                      <p className="text-sm text-gray-500 mt-1">by {reply.originalAuthor}</p>
                    </div>
                    
                    {/* Reply Content */}
                    <p className="text-gray-700 mb-4">{reply.content}</p>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {reply.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-600">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Reply
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No replies found</h3>
                <p className="text-gray-500">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Replies;
