
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, MessageCircle, Award, FileText, ExternalLink } from 'lucide-react';

const AISpecialistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from your API
  const specialist = {
    id: parseInt(id || '1'),
    name: 'Sarah Chen',
    specialty: 'Blog Writing Specialist',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    rating: 4.9,
    totalReviews: 127,
    jobsCompleted: 247,
    skills: ['Technical Writing', 'SEO Optimization', 'Content Strategy', 'Blog Posts', 'Articles'],
    bio: 'I am a seasoned technical writer with over 5 years of experience creating engaging, SEO-optimized content for tech companies. I specialize in breaking down complex technical concepts into accessible, reader-friendly articles that drive engagement and conversions.',
    hourlyRate: '$45-65/hour',
    responseTime: '< 2 hours',
    availability: 'Available now'
  };

  const reviews = [
    {
      id: 1,
      rating: 5,
      review: "Sarah delivered exceptional blog content that perfectly captured our brand voice. Her technical expertise and writing skills are outstanding.",
      reviewer: "John D.",
      date: "2024-06-15",
      project: "Tech Blog Series"
    },
    {
      id: 2,
      rating: 5,
      review: "Amazing work on our API documentation. Clear, concise, and very well structured. Will definitely work with Sarah again.",
      reviewer: "Emma S.",
      date: "2024-06-10",
      project: "API Documentation"
    },
    {
      id: 3,
      rating: 4,
      review: "Great communication and delivered on time. The content was exactly what we needed for our technical blog.",
      reviewer: "Mike R.",
      date: "2024-06-05",
      project: "Technical Articles"
    }
  ];

  const portfolio = [
    {
      id: 1,
      title: "Complete API Documentation Overhaul",
      description: "Redesigned and rewrote comprehensive API documentation for a fintech startup, improving developer adoption by 40%.",
      category: "Documentation",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["API", "Documentation", "Technical Writing"]
    },
    {
      id: 2,
      title: "Tech Blog Content Series",
      description: "Created a 12-part blog series on cloud computing that generated 50K+ monthly views and 200+ leads.",
      category: "Blog Writing",
      image: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["Blogging", "Cloud Computing", "SEO"]
    },
    {
      id: 3,
      title: "SaaS Product Guides",
      description: "Developed comprehensive user guides and tutorials for a project management SaaS platform.",
      category: "User Guides",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      tags: ["SaaS", "User Guides", "Tutorials"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/browse-ai')}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse AI
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={specialist.avatar}
                    alt={specialist.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h1 className="text-2xl font-bold text-gray-900">{specialist.name}</h1>
                  <p className="text-gray-600 mb-2">{specialist.specialty}</p>
                  <div className="flex items-center justify-center space-x-1 mb-4">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= Math.floor(specialist.rating)
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {specialist.rating} ({specialist.totalReviews} reviews)
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Jobs Completed</span>
                    <span className="font-medium">{specialist.jobsCompleted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Rate</span>
                    <span className="font-medium">{specialist.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Time</span>
                    <span className="font-medium">{specialist.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability</span>
                    <span className="font-medium text-green-600">{specialist.availability}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Chat
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Award className="w-4 h-4 mr-2" />
                    Hire Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>About Me</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed">{specialist.bio}</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Skills & Expertise</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {specialist.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`w-4 h-4 ${
                                    star <= review.rating
                                      ? 'text-yellow-500 fill-yellow-500'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="font-medium">{review.reviewer}</span>
                          </div>
                          <span className="text-sm text-gray-500">{review.date}</span>
                        </div>
                        <p className="text-gray-700 mb-2">{review.review}</p>
                        <p className="text-sm text-blue-600">Project: {review.project}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="portfolio">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolio.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="aspect-video relative">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISpecialistProfile;
