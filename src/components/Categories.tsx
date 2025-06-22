
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Edit, Briefcase, PenTool, GraduationCap, Newspaper, Users, Scale, Lightbulb, CheckSquare, Megaphone, Zap } from 'lucide-react';

interface CategoriesProps {
  onCategorySelect: (category: string, subcategories: string[]) => void;
}

const Categories = ({ onCategorySelect }: CategoriesProps) => {
  const categories = [
    {
      name: 'Content Writing',
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Blog posts, articles, and web content',
      subcategories: ['Blog Posts', 'Website Content', 'Articles', 'Product Descriptions', 'Social Media Content']
    },
    {
      name: 'Copywriting',
      icon: Edit,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Sales copy, ads, and marketing content',
      subcategories: ['Sales Pages', 'Ad Copy', 'Email Marketing Campaigns', 'Landing Pages', 'Product Copy']
    },
    {
      name: 'Business Writing',
      icon: Briefcase,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Professional documents and communications',
      subcategories: ['Business Proposals', 'Reports', 'Presentations', 'Business Plans', 'White Papers']
    },
    {
      name: 'Ghost Writing',
      icon: PenTool,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      description: 'Books, eBooks, and long-form content',
      subcategories: ['Books', 'eBooks', 'Memoirs', 'Speeches', 'Thought Leadership']
    },
    {
      name: 'Academic Writing',
      icon: GraduationCap,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      description: 'Research papers, essays, and academic content',
      subcategories: ['Research Papers', 'Essays', 'Dissertations', 'Literature Reviews', 'Case Studies']
    },
    {
      name: 'Journalism and Editorial',
      icon: Newspaper,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      description: 'News articles, interviews, and editorial content',
      subcategories: ['News Articles', 'Interviews', 'Editorial Content', 'Press Releases', 'Feature Stories']
    },
    {
      name: 'Resume and Career Writing',
      icon: Users,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50',
      description: 'CVs, cover letters, and career documents',
      subcategories: ['Resumes', 'Cover Letters', 'LinkedIn Profiles', 'Career Coaching', 'Job Applications']
    },
    {
      name: 'Legal and Financial Writing',
      icon: Scale,
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'Legal documents and financial content',
      subcategories: ['Legal Documents', 'Financial Reports', 'Compliance Writing', 'Terms & Conditions', 'Privacy Policies']
    },
    {
      name: 'Creative Writing',
      icon: Lightbulb,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      description: 'Stories, scripts, and creative content',
      subcategories: ['Short Stories', 'Poetry', 'Screenplays', 'Creative Fiction', 'Song Lyrics']
    },
    {
      name: 'Editing and Proofreading',
      icon: CheckSquare,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50',
      description: 'Content review, editing, and proofreading',
      subcategories: ['Copy Editing', 'Proofreading', 'Line Editing', 'Content Review', 'Style Guide Creation']
    },
    {
      name: 'Marketing Content Creation',
      icon: Megaphone,
      color: 'text-cyan-600',
      bgColor: 'bg-cyan-50',
      description: 'Marketing materials and brand content',
      subcategories: ['Brand Content', 'Marketing Campaigns', 'Brochures', 'Case Studies', 'Testimonials']
    },
    {
      name: 'Emerging Writings',
      icon: Zap,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      description: 'AI prompts, chatbot scripts, and modern content',
      subcategories: ['AI Prompts', 'Chatbot Scripts', 'Voice Search Content', 'Interactive Content', 'Micro-Content']
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Writing Categories</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive range of AI writing specialists across various domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.name} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => onCategorySelect(category.name, category.subcategories)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-8 h-8 ${category.color}`} />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => onCategorySelect('Browse AI', [])}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold"
          >
            Browse All AI Specialists
          </button>
        </div>
      </div>
    </section>
  );
};

export default Categories;
