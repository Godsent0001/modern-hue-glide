
import { useState } from 'react';
import { MessageSquare, Users, TrendingUp, Clock, ThumbsUp, MessageCircle, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const discussions = [
    {
      id: 1,
      title: "Best practices for AI content creation",
      author: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      category: "Content Creation",
      replies: 24,
      likes: 56,
      timeAgo: "2 hours ago",
      isHot: true,
      preview: "I've been working with AI content creators and wanted to share some insights..."
    },
    {
      id: 2,
      title: "How to effectively brief AI developers",
      author: "Marcus Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      category: "Development",
      replies: 18,
      likes: 42,
      timeAgo: "4 hours ago",
      isHot: false,
      preview: "Clear communication is key when working with AI specialists. Here's what I've learned..."
    },
    {
      id: 3,
      title: "AI vs Human designers: My experience",
      author: "Elena Vasquez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      category: "Design",
      replies: 31,
      likes: 78,
      timeAgo: "6 hours ago",
      isHot: true,
      preview: "After working with both, here's my honest comparison and when to use each..."
    },
    {
      id: 4,
      title: "Pricing strategies for AI consultants",
      author: "David Kim",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      category: "Business",
      replies: 15,
      likes: 33,
      timeAgo: "8 hours ago",
      isHot: false,
      preview: "Understanding fair pricing for AI services can be tricky. Let's discuss..."
    },
    {
      id: 5,
      title: "Future of AI in marketing automation",
      author: "Lisa Thompson",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face",
      category: "Marketing",
      replies: 27,
      likes: 65,
      timeAgo: "12 hours ago",
      isHot: true,
      preview: "The landscape is changing rapidly. Here are the trends I'm seeing..."
    }
  ];

  const categories = [
    { name: "All", count: 156 },
    { name: "Development", count: 45 },
    { name: "Design", count: 38 },
    { name: "Marketing", count: 29 },
    { name: "Content Creation", count: 25 },
    { name: "Business", count: 19 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Community Discussions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with fellow users, share experiences, and learn from the AI workforce community
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 py-3 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
              <Button variant="outline" className="px-6 py-3">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <Button size="lg" className="px-8 py-3 text-lg bg-blue-600 hover:bg-blue-700">
              <MessageSquare className="w-5 h-5 mr-2" />
              Start New Discussion
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors text-left"
                    >
                      <span className="font-medium">{category.name}</span>
                      <span className="text-sm text-gray-500">{category.count}</span>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="text-sm">Active Members</span>
                      </div>
                      <span className="font-semibold">2,847</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="w-5 h-5 text-green-600 mr-2" />
                        <span className="text-sm">Total Discussions</span>
                      </div>
                      <span className="font-semibold">156</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                        <span className="text-sm">This Week</span>
                      </div>
                      <span className="font-semibold">23</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="recent" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="hot">Hot</TabsTrigger>
                  <TabsTrigger value="top">Top</TabsTrigger>
                </TabsList>
                
                <TabsContent value="recent" className="space-y-6">
                  {discussions.map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <img
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                {discussion.title}
                              </h3>
                              {discussion.isHot && (
                                <Badge variant="destructive" className="text-xs">
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{discussion.preview}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>by {discussion.author}</span>
                                <Badge variant="outline">{discussion.category}</Badge>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {discussion.timeAgo}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  {discussion.likes}
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {discussion.replies}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="hot" className="space-y-6">
                  {discussions.filter(d => d.isHot).map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        {/* Same content structure as recent */}
                        <div className="flex items-start space-x-4">
                          <img
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                {discussion.title}
                              </h3>
                              <Badge variant="destructive" className="text-xs">
                                Hot
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3">{discussion.preview}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>by {discussion.author}</span>
                                <Badge variant="outline">{discussion.category}</Badge>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {discussion.timeAgo}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  {discussion.likes}
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {discussion.replies}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="top" className="space-y-6">
                  {discussions.sort((a, b) => b.likes - a.likes).map((discussion) => (
                    <Card key={discussion.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6">
                        {/* Same content structure */}
                        <div className="flex items-start space-x-4">
                          <img
                            src={discussion.avatar}
                            alt={discussion.author}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                                {discussion.title}
                              </h3>
                              {discussion.isHot && (
                                <Badge variant="destructive" className="text-xs">
                                  Hot
                                </Badge>
                              )}
                            </div>
                            <p className="text-gray-600 mb-3">{discussion.preview}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>by {discussion.author}</span>
                                <Badge variant="outline">{discussion.category}</Badge>
                                <div className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {discussion.timeAgo}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <div className="flex items-center">
                                  <ThumbsUp className="w-4 h-4 mr-1" />
                                  {discussion.likes}
                                </div>
                                <div className="flex items-center">
                                  <MessageCircle className="w-4 h-4 mr-1" />
                                  {discussion.replies}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Community;
