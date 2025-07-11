
import { useState, useEffect } from 'react';
import { Search, MessageCircle, ThumbsUp, Clock, User, Plus, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import Navigation from '@/components/Navigation';

interface Reply {
  id: number;
  author: string;
  content: string;
  timestamp: Date;
  likes: number;
}

interface Discussion {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  timestamp: Date;
  replies: Reply[];
  likes: number;
  views: number;
}

const Community = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 1,
      title: "Best practices for AI content writing",
      content: "I'm looking for tips on how to create engaging content using AI tools. What are your best practices?",
      author: "Sarah Johnson",
      category: "Content Writing",
      timestamp: new Date(2024, 0, 15),
      replies: [
        {
          id: 1,
          author: "Mike Chen",
          content: "Always review and edit AI-generated content. It's a great starting point but needs human touch.",
          timestamp: new Date(2024, 0, 15, 14, 30),
          likes: 5
        },
        {
          id: 2,
          author: "Emma Wilson",
          content: "I use AI for research and outlining, then write the actual content myself. Works great!",
          timestamp: new Date(2024, 0, 15, 16, 45),
          likes: 3
        }
      ],
      likes: 12,
      views: 156
    },
    {
      id: 2,
      title: "AI tools for graphic design - recommendations?",
      content: "Looking for AI-powered design tools that can help with creating professional graphics.",
      author: "Alex Rivera",
      category: "Graphic Design",
      timestamp: new Date(2024, 0, 14),
      replies: [
        {
          id: 3,
          author: "Lisa Park",
          content: "Midjourney and DALL-E are excellent for creative work. Canva's AI features are also quite useful.",
          timestamp: new Date(2024, 0, 14, 10, 15),
          likes: 8
        }
      ],
      likes: 18,
      views: 203
    },
    {
      id: 3,
      title: "How to price AI-assisted services?",
      content: "I'm struggling with pricing my services when using AI tools. Should I charge less since AI helps with efficiency?",
      author: "David Kim",
      category: "Business",
      timestamp: new Date(2024, 0, 13),
      replies: [],
      likes: 7,
      views: 89
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredDiscussions, setFilteredDiscussions] = useState<Discussion[]>(discussions);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newReply, setNewReply] = useState('');

  const categories = ['All', 'Content Writing', 'Graphic Design', 'Business', 'Development', 'Marketing'];

  useEffect(() => {
    let filtered = discussions;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(discussion =>
        discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        discussion.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(discussion => discussion.category === selectedCategory);
    }

    setFilteredDiscussions(filtered);
  }, [searchQuery, selectedCategory, discussions]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}h ago`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)}d ago`;
    }
  };

  const handleAddReply = (discussionId: number) => {
    if (!newReply.trim()) return;

    const reply: Reply = {
      id: Date.now(),
      author: "Current User",
      content: newReply,
      timestamp: new Date(),
      likes: 0
    };

    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, replies: [...discussion.replies, reply] }
        : discussion
    ));

    setNewReply('');
  };

  const handleLikeReply = (discussionId: number, replyId: number) => {
    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? {
            ...discussion,
            replies: discussion.replies.map(reply =>
              reply.id === replyId
                ? { ...reply, likes: reply.likes + 1 }
                : reply
            )
          }
        : discussion
    ));
  };

  const handleLikeDiscussion = (discussionId: number) => {
    setDiscussions(prev => prev.map(discussion => 
      discussion.id === discussionId 
        ? { ...discussion, likes: discussion.likes + 1 }
        : discussion
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Community Discussions</h1>
            
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search discussions, topics, or users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className="whitespace-nowrap"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {selectedDiscussion ? (
            /* Discussion Detail View */
            <div className="space-y-6">
              <Button 
                variant="ghost" 
                onClick={() => setSelectedDiscussion(null)}
                className="mb-4"
              >
                ← Back to Discussions
              </Button>
              
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{selectedDiscussion.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{selectedDiscussion.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{formatTime(selectedDiscussion.timestamp)}</span>
                        </div>
                        <Badge variant="secondary">{selectedDiscussion.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{selectedDiscussion.content}</p>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleLikeDiscussion(selectedDiscussion.id)}
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <ThumbsUp className="w-4 h-4 mr-1" />
                      {selectedDiscussion.likes}
                    </Button>
                    <span className="text-sm text-gray-600">
                      {selectedDiscussion.views} views
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Replies Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Replies ({selectedDiscussion.replies.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedDiscussion.replies.map(reply => (
                    <div key={reply.id} className="border-l-2 border-gray-200 pl-4 py-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span className="font-medium">{reply.author}</span>
                          <span>•</span>
                          <span>{formatTime(reply.timestamp)}</span>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLikeReply(selectedDiscussion.id, reply.id)}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <ThumbsUp className="w-3 h-3 mr-1" />
                          {reply.likes}
                        </Button>
                      </div>
                      <p className="text-gray-700">{reply.content}</p>
                    </div>
                  ))}

                  {/* Add Reply Form */}
                  <div className="border-t pt-4 mt-6">
                    <h4 className="font-medium mb-3">Add a Reply</h4>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Share your thoughts..."
                        value={newReply}
                        onChange={(e) => setNewReply(e.target.value)}
                        rows={3}
                      />
                      <Button 
                        onClick={() => handleAddReply(selectedDiscussion.id)}
                        disabled={!newReply.trim()}
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Post Reply
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            /* Discussions List View */
            <div className="grid gap-6">
              {filteredDiscussions.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-gray-600">No discussions found matching your search.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredDiscussions.map(discussion => (
                  <Card 
                    key={discussion.id} 
                    className="cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2 hover:text-blue-600">
                            {discussion.title}
                          </CardTitle>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {discussion.content}
                          </p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <div className="flex items-center space-x-1">
                              <User className="w-4 h-4" />
                              <span>{discussion.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(discussion.timestamp)}</span>
                            </div>
                            <Badge variant="secondary">{discussion.category}</Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MessageCircle className="w-4 h-4" />
                            <span>{discussion.replies.length}</span>
                          </div>
                        </div>
                        <span>{discussion.views} views</span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
