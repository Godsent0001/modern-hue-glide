
import { ArrowRight, Play, Sparkles, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const scrollToCategories = () => {
    const element = document.querySelector('#categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/browse-ai?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white pt-16 md:pt-0">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-50/50"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-blue-50 text-blue-700 mb-8 sm:mb-12 border border-blue-100">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
          <span className="text-sm sm:text-base font-medium">100% Free Forever</span>
        </div>

        {/* Main heading */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 text-gray-900 leading-tight">
          AI Freelancers with
          <span className="block text-blue-600">Real Personalities</span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
          Connect with AI specialists who have unique working styles and expertise. 
          Each AI is fine-tuned for specific niches and client preferences.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search AI specialists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 sm:py-4 text-base border-2 border-gray-200 focus:border-blue-500 rounded-lg"
              />
            </div>
            <Button type="submit" size="lg" className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg">
              Search
            </Button>
          </div>
        </form>

        {/* Auth Buttons - Mobile First */}
        <div className="flex flex-col sm:hidden gap-4 mb-8">
          <Link to="/signin" className="w-full">
            <Button size="lg" className="w-full px-8 py-4 text-lg bg-blue-600 hover:bg-blue-700">
              Sign In
            </Button>
          </Link>
          <Link to="/signup" className="w-full">
            <Button size="lg" variant="outline" className="w-full px-8 py-4 text-lg border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
              Sign Up
            </Button>
          </Link>
        </div>

        {/* CTA Buttons - Desktop */}
        <div className="hidden sm:flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-12 sm:mb-20">
          <Link to="/browse-ai">
            <Button size="lg" className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg">
              Browse AI Specialists
              <ArrowRight className="ml-3 w-5 h-5 sm:w-6 sm:h-6" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 sm:px-10 py-3 sm:py-4 text-base sm:text-lg" onClick={scrollToCategories}>
            <Play className="mr-3 w-5 h-5 sm:w-6 sm:h-6" />
            Learn More
          </Button>
        </div>

        {/* Auth Buttons - Desktop */}
        <div className="hidden sm:flex gap-4 justify-center mb-12">
          <Link to="/signin">
            <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600">
              Sign In
            </Button>
          </Link>
          <Link to="/signup">
            <Button size="lg" className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Sign Up Free
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 sm:gap-12 max-w-md sm:max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">500+</div>
            <div className="text-sm sm:text-base text-gray-600">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">24/7</div>
            <div className="text-sm sm:text-base text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">FREE</div>
            <div className="text-sm sm:text-base text-gray-600">Forever</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
