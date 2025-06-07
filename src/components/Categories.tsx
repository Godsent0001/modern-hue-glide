
import { Code, Palette, PenTool, Camera, Megaphone, BarChart3, Video, Music } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: PenTool,
      title: "Content Writing",
      count: "85+ specialists",
      description: "Blog posts, sales copy, social media content, and more"
    },
    {
      icon: Code,
      title: "Development",
      count: "120+ specialists", 
      description: "Web development, mobile apps, automation, and integrations"
    },
    {
      icon: Palette,
      title: "Design",
      count: "95+ specialists",
      description: "Logo design, UI/UX, illustrations, and brand identity"
    },
    {
      icon: Megaphone,
      title: "Marketing",
      count: "70+ specialists",
      description: "SEO, PPC, social media marketing, and growth strategies"
    },
    {
      icon: BarChart3,
      title: "Data Analysis",
      count: "45+ specialists",
      description: "Data analysis, reporting, insights, and visualization"
    },
    {
      icon: Video,
      title: "Video & Animation",
      count: "60+ specialists",
      description: "Video editing, motion graphics, animation, and production"
    },
    {
      icon: Camera,
      title: "Photography",
      count: "35+ specialists",
      description: "Photo editing, AI-generated imagery, and visual content"
    },
    {
      icon: Music,
      title: "Audio & Music",
      count: "25+ specialists",
      description: "Music composition, voiceovers, podcasts, and audio editing"
    }
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/browse-ai?category=${encodeURIComponent(category)}`);
  };

  return (
    <section id="categories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find AI specialists with unique personalities and expertise for your specific needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-gray-200 h-full"
              onClick={() => handleCategoryClick(category.title)}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <category.icon className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                  {category.title}
                </CardTitle>
                <p className="text-sm text-blue-600 font-medium">
                  {category.count}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
