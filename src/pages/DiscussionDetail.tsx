
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  ThumbsUp, 
  MessageCircle, 
  Eye, 
  Clock, 
  Send,
  Search
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

interface Reply {
  id: number;
  content: string;
  author: string;
  authorAvatar?: string;
  timestamp: string;
  likes: number;
}

const DiscussionDetail = () => {
  const { id } = useParams();
  const [newReply, setNewReply] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for the discussion
  const discussion: Discussion = {
    id: 1,
    title: "How to improve AI prompt engineering?",
    content: "I'm looking for tips and best practices to write better prompts for AI models. What strategies have worked for you? I've been experimenting with different approaches but would love to hear from the community about what has been most effective in your experience.",
    author: "TechEnthusiast",
    category: "AI & Technology",
    replies: 15,
    likes: 32,
    views: 128,
    timestamp: "2 hours ago"
  };

  // Mock data for replies
  const [replies, setReplies] = useState<Reply[]>([
    {
      id: 1,
      content: "I've found that being more specific with context and examples really helps. Try breaking down complex prompts into smaller, more focused ones. Also, using the format 'Context + Task + Format' has been very effective for me.",
      author: "AIExpert2024",
      timestamp: "1 hour ago",
      likes: 12
    },
    {
      id: 2,
      content: "Great question! I recommend focusing on clarity and providing clear instructions. Use numbered lists for complex tasks and always specify the desired output format. Temperature settings also matter a lot!",
      author: "PromptMaster",
      timestamp: "45 minutes ago",
      likes: 8
    },
    {
      id: 3,
      content: "One technique that works well is the 'few-shot' approach - providing 2-3 examples of the desired output before asking for the actual task. This helps the AI understand the pattern you want.",
      author: "DataScientist",
      timestamp: "30 minutes ago",
      likes: 15
    }
  ]);

  const handleSubmitReply = () => {
    if (newReply.trim()) {
      const reply: Reply = {
        id: replies.length + 1,
        content: newReply,
        author: "CurrentUser",
        timestamp: "Just now",
        likes: 0
      };
      setReplies([...replies, reply]);
      setNewReply("");
    }
  };

  const filteredReplies = replies.filter(reply =>
    reply.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reply.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/community">
              <Button variant="outline" size="sm" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Community
              </Button>
            </Link>
          </div>

          {/* Discussion Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12">
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
              <CardTitle className="text-xl mb-4">{discussion.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6 leading-relaxed">{discussion.content}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 border-t pt-4">
                <div className="flex items-center">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  {discussion.replies} replies
                </div>
                <div className="flex items-center">
                  <ThumbsUp className="w-4 h-4 mr-1" />
                  {discussion.likes} likes
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {discussion.views} views
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search Replies */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search replies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
            </div>
          </div>

          {/* Reply Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Write a Reply</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts, experiences, or ask follow-up questions..."
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleSubmitReply} disabled={!newReply.trim()}>
                    <Send className="w-4 h-4 mr-2" />
                    Post Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Replies ({filteredReplies.length})
            </h2>
            
            {filteredReplies.length > 0 ? (
              filteredReplies.map((reply) => (
                <Card key={reply.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={reply.authorAvatar} />
                        <AvatarFallback>{reply.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <p className="font-semibold text-gray-900">{reply.author}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{reply.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 border-t pt-4">
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
                <p className="text-gray-500">
                  {searchTerm ? "Try adjusting your search terms" : "Be the first to reply to this discussion!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DiscussionDetail;
