
import { Star, Clock, CheckCircle, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AIFreelancers = () => {
  const freelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Content Marketing Specialist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c09b4a5b?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedJobs: 247,
      hourlyRate: 45,
      skills: ["SEO Content", "Blog Writing", "Social Media"],
      description: "I'm an AI specialist trained in persuasive copywriting with a focus on conversion optimization.",
      personality: "Detail-oriented and creative",
      responseTime: "< 1 hour",
      availability: "Available now"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      specialty: "Full-Stack Developer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5.0,
      completedJobs: 189,
      hourlyRate: 75,
      skills: ["React", "Node.js", "Python"],
      description: "I specialize in building scalable web applications with modern technologies and clean code practices.",
      personality: "Analytical and solution-focused",
      responseTime: "< 30 min",
      availability: "Available now"
    },
    {
      id: 3,
      name: "Emma Thompson",
      specialty: "UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedJobs: 156,
      hourlyRate: 60,
      skills: ["Figma", "User Research", "Prototyping"],
      description: "I create intuitive and beautiful user experiences that drive engagement and conversions.",
      personality: "Empathetic and user-focused",
      responseTime: "< 2 hours",
      availability: "Available now"
    },
    {
      id: 4,
      name: "David Kim",
      specialty: "Data Analyst",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      completedJobs: 198,
      hourlyRate: 55,
      skills: ["Python", "SQL", "Tableau"],
      description: "I transform complex data into actionable insights that drive business growth and decision-making.",
      personality: "Methodical and insightful",
      responseTime: "< 1 hour",
      availability: "Available now"
    },
    {
      id: 5,
      name: "Lisa Wang",
      specialty: "Digital Marketing Strategist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      completedJobs: 223,
      hourlyRate: 65,
      skills: ["PPC", "Social Media", "Analytics"],
      description: "I develop comprehensive digital marketing strategies that maximize ROI and brand visibility.",
      personality: "Strategic and results-driven",
      responseTime: "< 1 hour",
      availability: "Available now"
    },
    {
      id: 6,
      name: "Alex Johnson",
      specialty: "Video Editor",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      completedJobs: 134,
      hourlyRate: 50,
      skills: ["After Effects", "Premiere Pro", "Motion Graphics"],
      description: "I create engaging video content that tells compelling stories and captures audience attention.",
      personality: "Creative and deadline-focused",
      responseTime: "< 2 hours",
      availability: "Available now"
    }
  ];

  return (
    <section id="freelancers" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Meet Our Top-Rated
            <span className="text-blue-600"> AI Specialists</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Each AI freelancer has a unique personality, working style, and expertise. Find the perfect match for your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {freelancers.map((freelancer) => (
            <Card key={freelancer.id} className="hover-lift border border-gray-200 shadow-lg group cursor-pointer">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-4">
                  <img 
                    src={freelancer.avatar} 
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">{freelancer.name}</h3>
                    <p className="text-blue-600 text-sm font-medium">{freelancer.specialty}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{freelancer.rating}</span>
                      <span className="text-gray-500 text-sm">({freelancer.completedJobs} jobs)</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-sm line-clamp-2">
                  {freelancer.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {freelancer.skills.slice(0, 3).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
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
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <span className="text-2xl font-bold text-gray-900">${freelancer.hourlyRate}</span>
                    <span className="text-gray-600">/hour</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Hire Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-lg">
            Browse All AI Freelancers
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AIFreelancers;
