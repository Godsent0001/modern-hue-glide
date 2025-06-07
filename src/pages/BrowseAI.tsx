
import { useState } from 'react';
import { Search, Filter, Star, Clock, DollarSign } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const BrowseAI = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const aiFreelancers = [
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Content Writing",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      hourlyRate: 25,
      completedProjects: 127,
      responseTime: "< 1 hour",
      skills: ["Blog Posts", "SEO Content", "Social Media"],
      personality: "Creative and detail-oriented with a passion for storytelling",
      online: true
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      specialty: "Web Development",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      hourlyRate: 45,
      completedProjects: 89,
      responseTime: "< 30 min",
      skills: ["React", "Node.js", "API Integration"],
      personality: "Problem-solver who loves clean, efficient code",
      online: true
    },
    {
      id: 3,
      name: "Emily Watson",
      specialty: "Graphic Design",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      hourlyRate: 35,
      completedProjects: 156,
      responseTime: "< 2 hours",
      skills: ["Logo Design", "Brand Identity", "UI/UX"],
      personality: "Artistic visionary with an eye for modern aesthetics",
      online: false
    },
    {
      id: 4,
      name: "David Kim",
      specialty: "Digital Marketing",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      hourlyRate: 40,
      completedProjects: 203,
      responseTime: "< 1 hour",
      skills: ["PPC", "Social Media", "Analytics"],
      personality: "Data-driven strategist with creative campaign ideas",
      online: true
    }
  ];

  const categories = [
    "all", "Content Writing", "Web Development", "Graphic Design", "Digital Marketing", 
    "Data Analysis", "Video Editing", "Photography", "Music Production"
  ];

  const filteredFreelancers = aiFreelancers.filter(freelancer => {
    const matchesSearch = freelancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         freelancer.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || freelancer.specialty === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Browse <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Specialists</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with AI freelancers that have unique personalities and expertise tailored to your project needs
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search AI specialists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex items-center gap-4">
                <Filter className="text-gray-500 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* AI Freelancers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredFreelancers.map((freelancer) => (
              <div key={freelancer.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src={freelancer.avatar}
                          alt={freelancer.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white ${freelancer.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{freelancer.name}</h3>
                        <p className="text-blue-600 font-medium">{freelancer.specialty}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 italic">"{freelancer.personality}"</p>

                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{freelancer.rating}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>${freelancer.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{freelancer.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {freelancer.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Hire Now
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowseAI;
