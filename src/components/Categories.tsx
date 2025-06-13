
import { Code, Palette, PenTool, Camera, Megaphone, BarChart3, Video, Music, FileText, Users, Briefcase, GraduationCap, Newspaper, Building, Sparkles, Edit, BookOpen, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    {
      icon: PenTool,
      title: "Content Writing",
      count: "85+ specialists",
      description: "Blog posts, website content, landing pages, articles, SEO content",
      subcategories: [
        "Blog Posts",
        "Website Content", 
        "Landing Pages",
        "Articles",
        "SEO Content",
        "Category Descriptions"
      ]
    },
    {
      icon: Megaphone,
      title: "Copywriting",
      count: "70+ specialists",
      description: "Persuasive writing aimed at conversion, sales pages, ad copy",
      subcategories: [
        "Sales Pages",
        "Ad Copy",
        "Email Marketing Campaigns",
        "Product Launch Copy",
        "Slogans and Taglines",
        "Video Scripts for Ads",
        "Social Media Copy",
        "Influencer and Brand Pitch Writing"
      ]
    },
    {
      icon: Briefcase,
      title: "Business Writing",
      count: "60+ specialists",
      description: "Business proposals, reports, presentations, executive summaries",
      subcategories: [
        "Business Proposals",
        "Reports",
        "Presentations",
        "Executive Summaries",
        "Policies and Procedures",
        "Corporate Emails",
        "Stakeholder Letters",
        "Press Releases"
      ]
    },
    {
      icon: Users,
      title: "Ghost Writing",
      count: "45+ specialists",
      description: "Books, ebooks, blog posts, autobiographies, whitepapers",
      subcategories: [
        "Fiction Books",
        "Non-Fiction Books",
        "Ebooks",
        "Blog Posts",
        "Autobiographies",
        "Whitepapers",
        "LinkedIn Posts",
        "YouTube/Podcast Scripts"
      ]
    },
    {
      icon: GraduationCap,
      title: "Academic Writing",
      count: "55+ specialists",
      description: "Educational and research writing, research papers, essays",
      subcategories: [
        "Research Papers",
        "Essays",
        "Literature Reviews",
        "Case Study Analysis",
        "Academic Editing",
        "Homework Assistance",
        "Lesson Plans",
        "Educational Materials"
      ]
    },
    {
      icon: Newspaper,
      title: "Journalism and Editorial",
      count: "35+ specialists",
      description: "Professional reporting and editorial content, news articles",
      subcategories: [
        "News Articles",
        "Editorial Content",
        "Feature Stories",
        "Investigative Reports"
      ]
    },
    {
      icon: FileText,
      title: "Resume and Career Writing",
      count: "40+ specialists",
      description: "Resumes, cover letters, LinkedIn optimization, executive bios",
      subcategories: [
        "Resumes",
        "Cover Letters",
        "LinkedIn Profile Optimization",
        "Executive Bios",
        "Academic CVs",
        "International CVs"
      ]
    },
    {
      icon: Building,
      title: "Legal and Financial Writing",
      count: "25+ specialists",
      description: "Case briefs, contract summaries, investment reports",
      subcategories: [
        "Case Briefs",
        "Contract Summaries",
        "Investment Reports",
        "Financial Analysis",
        "Compliance Documentation",
        "Policy Drafting"
      ]
    },
    {
      icon: BookOpen,
      title: "Creative Writing",
      count: "65+ specialists",
      description: "Short stories, poetry, scripts, novels, screenplays",
      subcategories: [
        "Short Stories",
        "Poetry",
        "Film Scripts",
        "TV Scripts",
        "Theater Scripts",
        "Novels",
        "Screenplays",
        "Video Game Narratives",
        "Comic Scripts",
        "Audio Drama Scripts"
      ]
    },
    {
      icon: Edit,
      title: "Editing and Proofreading",
      count: "50+ specialists",
      description: "Developmental editing, copyediting, proofreading, line editing",
      subcategories: [
        "Developmental Editing",
        "Copyediting",
        "Proofreading",
        "Line Editing",
        "Fact-Checking",
        "Formatting for Publication",
        "Sensitivity Reading"
      ]
    },
    {
      icon: BarChart3,
      title: "Marketing Content Creation",
      count: "75+ specialists",
      description: "Brochures, infographics, case studies, testimonials",
      subcategories: [
        "Brochures",
        "Infographic Copy",
        "Case Studies",
        "One-Pagers",
        "Client Testimonials",
        "Quora/Reddit Content",
        "YouTube Descriptions",
        "Podcast Show Notes",
        "Webinar Content",
        "Slide Decks"
      ]
    },
    {
      icon: Lightbulb,
      title: "Emerging Writings",
      count: "30+ specialists",
      description: "AI prompt writing, UX writing, avatar scripting",
      subcategories: [
        "AI Prompt Writing",
        "UX Writing",
        "Avatar Scripting",
        "Chatbot Content",
        "Voice Interface Content"
      ]
    }
  ];

  const handleCategoryClick = (category: any) => {
    navigate(`/browse-ai?category=${encodeURIComponent(category.title)}`, {
      state: { subcategories: category.subcategories }
    });
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:shadow-xl transition-all duration-300 cursor-pointer border-gray-200 h-full hover:scale-105"
              onClick={() => handleCategoryClick(category)}
            >
              <CardHeader className="pb-4">
                <div className="w-16 h-16 rounded-xl bg-blue-100 flex items-center justify-center mb-6">
                  <category.icon className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </CardTitle>
                <p className="text-sm text-blue-600 font-medium mb-2">
                  {category.count}
                </p>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                <div className="text-xs text-gray-500">
                  Click to view subcategories →
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
