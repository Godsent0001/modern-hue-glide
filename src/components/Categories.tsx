
import { Code, Palette, PenTool, Camera, Megaphone, BarChart3, Video, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Categories = () => {
  const categories = [
    {
      icon: PenTool,
      title: "Copywriting & Content",
      count: "85+ AI Specialists",
      description: "Blog posts, sales copy, social media content",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: Code,
      title: "Programming & Tech",
      count: "120+ AI Specialists", 
      description: "Web development, mobile apps, automation",
      color: "from-green-500 to-green-600"
    },
    {
      icon: Palette,
      title: "Design & Creative",
      count: "95+ AI Specialists",
      description: "Logo design, UI/UX, illustrations",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      count: "70+ AI Specialists",
      description: "SEO, PPC, social media marketing",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: BarChart3,
      title: "Data & Analytics",
      count: "45+ AI Specialists",
      description: "Data analysis, reporting, insights",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Video,
      title: "Video & Animation",
      count: "60+ AI Specialists",
      description: "Video editing, motion graphics, animation",
      color: "from-red-500 to-red-600"
    },
    {
      icon: Camera,
      title: "Photography",
      count: "35+ AI Specialists",
      description: "Photo editing, AI-generated imagery",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: Music,
      title: "Audio & Music",
      count: "25+ AI Specialists",
      description: "Music composition, voiceovers, podcasts",
      color: "from-teal-500 to-teal-600"
    }
  ];

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Browse AI Specialists by
            <span className="text-blue-600"> Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect AI freelancer for your project. Each category features multiple AI specialists with unique personalities and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card key={index} className="hover-lift border-0 shadow-md bg-white group cursor-pointer transition-all duration-300 hover:shadow-xl">
              <CardHeader className="pb-3">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {category.title}
                </CardTitle>
                <p className="text-sm font-medium text-blue-600">
                  {category.count}
                </p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            View All Categories
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
