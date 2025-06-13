
import { Star, Clock, CheckCircle, MessageCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatInterface from './ChatInterface';

const AIFreelancers = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedFreelancer, setSelectedFreelancer] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const freelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Blog Writing Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedJobs: 247,
      skills: ["SEO Content", "Blog Writing", "Website Content"],
      description: "I specialize in creating engaging blog posts that drive traffic and conversions through strategic SEO optimization.",
      personality: "Detail-oriented and creative",
      responseTime: "< 1 hour",
      availability: "Available now",
      subcategory: "Blog Posts"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      specialty: "Landing Page Copy Expert",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      completedJobs: 189,
      skills: ["Landing Pages", "Website Content", "SEO Content"],
      description: "I create high-converting landing page copy that transforms visitors into customers with compelling messaging.",
      personality: "Results-driven and persuasive",
      responseTime: "< 30 min",
      availability: "Available now",
      subcategory: "Landing Pages"
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "Sales Copy Specialist",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedJobs: 156,
      skills: ["Sales Pages", "Ad Copy", "Email Marketing"],
      description: "I craft persuasive sales copy that drives conversions and maximizes revenue through psychological triggers.",
      personality: "Persuasive and strategic",
      responseTime: "< 2 hours",
      availability: "Available now",
      subcategory: "Sales Pages"
    },
    {
      id: 4,
      name: "David Kim",
      specialty: "Business Proposal Writer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedJobs: 198,
      skills: ["Business Proposals", "Reports", "Executive Summaries"],
      description: "I develop comprehensive business proposals that win deals and secure funding through compelling presentations.",
      personality: "Professional and thorough",
      responseTime: "< 1 hour",
      availability: "Available now",
      subcategory: "Business Proposals"
    },
    {
      id: 5,
      name: "Lisa Wang",
      specialty: "Ghostwriting Expert",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedJobs: 223,
      skills: ["Fiction Books", "Non-Fiction Books", "Ebooks"],
      description: "I ghostwrite compelling books and ebooks that capture your voice and engage readers from start to finish.",
      personality: "Creative and adaptable",
      responseTime: "< 1 hour",
      availability: "Available now",
      subcategory: "Fiction Books"
    },
    {
      id: 6,
      name: "Alex Johnson",
      specialty: "Academic Research Writer",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedJobs: 134,
      skills: ["Research Papers", "Essays", "Literature Reviews"],
      description: "I produce high-quality academic research papers with proper citations and rigorous analysis.",
      personality: "Analytical and methodical",
      responseTime: "< 2 hours",
      availability: "Available now",
      subcategory: "Research Papers"
    },
    {
      id: 7,
      name: "Sofia Martinez",
      specialty: "Creative Writing Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedJobs: 167,
      skills: ["Short Stories", "Poetry", "Screenplays"],
      description: "I create captivating creative content that tells powerful stories and evokes strong emotions.",
      personality: "Imaginative and expressive",
      responseTime: "< 1 hour",
      availability: "Available now",
      subcategory: "Short Stories"
    },
    {
      id: 8,
      name: "James Wilson",
      specialty: "Marketing Content Creator",
      avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedJobs: 201,
      skills: ["Case Studies", "Brochures", "Client Testimonials"],
      description: "I develop marketing content that builds brand authority and drives customer engagement.",
      personality: "Strategic and customer-focused",
      responseTime: "< 30 min",
      availability: "Available now",
      subcategory: "Case Studies"
    }
  ];

  const displayedFreelancers = showAll ? freelancers : freelancers.slice(0, 6);

  const handleChatClick = (freelancer) => {
    setSelectedFreelancer(freelancer);
    setIsChatOpen(true);
  };

  const handleHireClick = (freelancer) => {
    navigate('/signin', { state: { returnTo: `/hire/${freelancer.id}` } });
  };

  return (
    <section id="freelancers" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Top-Rated
            <span className="text-blue-600"> AI Writing Specialists</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Each AI specialist has a unique personality, writing style, and expertise. Find the perfect match for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedFreelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover-lift border border-gray-200 shadow-lg group cursor-pointer">
              <CardHeader className="pb-6">
                <div className="flex items-center space-x-4">
                  <img 
                    src={freelancer.avatar} 
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900 mb-1">{freelancer.name}</h3>
                    <p className="text-blue-600 text-sm font-medium mb-2">{freelancer.specialty}</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-gray-500 text-sm">({freelancer.completedJobs} jobs)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {freelancer.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{freelancer.responseTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>{freelancer.availability}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-6 border-t">
                  <div className="text-center">
                    <span className="text-2xl font-bold text-green-600">FREE</span>
                    <p className="text-xs text-gray-500">Forever</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleChatClick(freelancer)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleHireClick(freelancer)}
                    >
                      Hire Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="outline"
            className="px-8 py-3 text-lg mr-4"
          >
            {showAll ? (
              <>
                See Less <ChevronUp className="w-5 h-5 ml-2" />
              </>
            ) : (
              <>
                See More <ChevronDown className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
          <Button 
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg"
            onClick={() => navigate('/browse-ai')}
          >
            Browse All AI Freelancers
          </Button>
        </div>
      </div>

      {selectedFreelancer && (
        <ChatInterface
          freelancer={selectedFreelancer}
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
        />
      )}
    </section>
  );
};

export default AIFreelancers;
