import { useState } from 'react';
import { Star, MapPin, Clock, MessageSquare, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

const aiFreelancers = [
  {
    id: 1,
    name: 'Alice Johnson',
    title: 'AI Content Writer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b2933e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'New York, USA',
    rating: 4.8,
    reviews: 125,
    description:
      'Experienced AI content writer specializing in blog posts, articles, and website copy. I leverage AI tools to create engaging and informative content that drives results.',
    skills: ['Content Creation', 'SEO Writing', 'AI Tools', 'Copywriting', 'Editing', 'Proofreading'],
    responseTime: 'Within 2 hours',
    hourlyRate: 35,
  },
  {
    id: 2,
    name: 'Bob Williams',
    title: 'AI Developer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00d0cb31f074?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'London, UK',
    rating: 4.9,
    reviews: 98,
    description:
      'AI developer with expertise in machine learning, natural language processing, and computer vision. I build custom AI solutions for businesses of all sizes.',
    skills: ['Machine Learning', 'NLP', 'Computer Vision', 'Python', 'TensorFlow', 'Keras'],
    responseTime: 'Within 4 hours',
    hourlyRate: 50,
  },
  {
    id: 3,
    name: 'Charlie Brown',
    title: 'AI Designer',
    avatar: 'https://images.unsplash.com/photo-1534528741702-a0cfae562c9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80',
    location: 'Paris, France',
    rating: 4.7,
    reviews: 76,
    description:
      'AI designer specializing in creating visually appealing and user-friendly interfaces for AI-powered applications. I combine my design skills with my knowledge of AI to create innovative solutions.',
    skills: ['UI Design', 'UX Design', 'AI Design', 'Figma', 'Sketch', 'Adobe XD'],
    responseTime: 'Within 6 hours',
    hourlyRate: 40,
  },
  {
    id: 4,
    name: 'Diana Miller',
    title: 'AI Marketing Consultant',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286498?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80',
    location: 'Sydney, Australia',
    rating: 4.6,
    reviews: 54,
    description:
      'AI marketing consultant helping businesses leverage AI to improve their marketing campaigns. I provide data-driven insights and recommendations to optimize marketing performance.',
    skills: ['AI Marketing', 'Data Analysis', 'Marketing Automation', 'Google Ads', 'Facebook Ads', 'SEO'],
    responseTime: 'Within 8 hours',
    hourlyRate: 45,
  },
  {
    id: 5,
    name: 'Ethan Davis',
    title: 'AI Project Manager',
    avatar: 'https://images.unsplash.com/photo-1506794775853-04461d48ead2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'Toronto, Canada',
    rating: 4.5,
    reviews: 32,
    description:
      'AI project manager with experience in leading and managing AI projects from start to finish. I ensure that projects are delivered on time and within budget.',
    skills: ['Project Management', 'AI Planning', 'Team Leadership', 'Agile', 'Scrum', 'Kanban'],
    responseTime: 'Within 10 hours',
    hourlyRate: 55,
  },
  {
    id: 6,
    name: 'Fiona Wilson',
    title: 'AI Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936e79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'Berlin, Germany',
    rating: 4.4,
    reviews: 10,
    description:
      'AI data scientist with expertise in data mining, data analysis, and data visualization. I help businesses make data-driven decisions by providing insights from their data.',
    skills: ['Data Science', 'Data Mining', 'Data Analysis', 'Data Visualization', 'R', 'Tableau'],
    responseTime: 'Within 12 hours',
    hourlyRate: 60,
  },
  {
    id: 7,
    name: 'George Smith',
    title: 'AI Security Expert',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'Tokyo, Japan',
    rating: 4.3,
    reviews: 65,
    description:
      'AI security expert specializing in protecting AI systems from cyberattacks. I help businesses secure their AI systems and data.',
    skills: ['AI Security', 'Cybersecurity', 'Penetration Testing', 'Vulnerability Assessment', 'Ethical Hacking', 'Security Auditing'],
    responseTime: 'Within 14 hours',
    hourlyRate: 65,
  },
  {
    id: 8,
    name: 'Hannah Lee',
    title: 'AI Ethicist',
    avatar: 'https://images.unsplash.com/photo-1541647376583-028984a24cfa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'Seoul, South Korea',
    rating: 4.2,
    reviews: 43,
    description:
      'AI ethicist helping businesses develop and deploy AI systems in a responsible and ethical manner. I provide guidance on AI ethics, bias, and fairness.',
    skills: ['AI Ethics', 'Bias Detection', 'Fairness', 'Transparency', 'Accountability', 'Governance'],
    responseTime: 'Within 16 hours',
    hourlyRate: 70,
  },
  {
    id: 9,
    name: 'Isaac Kim',
    title: 'AI Trainer',
    avatar: 'https://images.unsplash.com/photo-1542909168-82c3e727ca5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'Singapore',
    rating: 4.1,
    reviews: 21,
    description:
      'AI trainer helping businesses train their employees on how to use AI tools and technologies. I provide training on AI concepts, tools, and best practices.',
    skills: ['AI Training', 'Curriculum Development', 'Instructional Design', 'E-Learning', 'Workshop Facilitation', 'Coaching'],
    responseTime: 'Within 18 hours',
    hourlyRate: 75,
  },
  {
    id: 10,
    name: 'Jack Chen',
    title: 'AI Consultant',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    location: 'Shanghai, China',
    rating: 4.0,
    reviews: 87,
    description:
      'AI consultant helping businesses develop and implement AI strategies. I provide guidance on AI technologies, use cases, and best practices.',
    skills: ['AI Consulting', 'Strategy Development', 'Technology Assessment', 'Use Case Identification', 'Roadmap Planning', 'Implementation Support'],
    responseTime: 'Within 20 hours',
    hourlyRate: 80,
  },
];

const AIFreelancers = () => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();
  
  const displayedFreelancers = showAll ? aiFreelancers : aiFreelancers.slice(0, 6);

  const handleHireNow = () => {
    navigate('/signin');
  };

  const handleStartChat = () => {
    // For now, navigate to browse-ai page where chat functionality exists
    navigate('/browse-ai');
  };

  return (
    <section className="py-12 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Top Rated AI Specialists
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our most skilled AI freelancers across various specialties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedFreelancers.map((freelancer, index) => (
            <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-6">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{freelancer.name}</h3>
                    <p className="text-blue-600 font-medium mb-2">{freelancer.title}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      {freelancer.location}
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(freelancer.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-900">
                        {freelancer.rating}
                      </span>
                      <span className="ml-1 text-sm text-gray-500">
                        ({freelancer.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3">{freelancer.description}</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {freelancer.skills.slice(0, 3).map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {freelancer.skills.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{freelancer.skills.length - 3} more
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {freelancer.responseTime}
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-gray-900">
                      ${freelancer.hourlyRate}
                    </span>
                    <span className="text-sm text-gray-500">/hour</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    onClick={handleHireNow}
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Hire Now
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleStartChat}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            {showAll ? 'See Less' : 'See More'}
          </Button>
          
          {/* Mobile spacing fix */}
          <div className="block sm:hidden h-4"></div>
          
          <div>
            <Button
              size="lg"
              onClick={() => navigate('/browse-ai')}
              className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Browse All AI Freelancers
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIFreelancers;
