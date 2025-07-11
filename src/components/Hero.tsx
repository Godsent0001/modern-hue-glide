
import { ArrowRight, Play, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  const scrollToCategories = () => {
    const element = document.querySelector('#categories');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-50/50"></div>

      <div className="relative z-10 text-center compact-p-3 sm:compact-p-4 lg:compact-p-6 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center compact-p-3 rounded-full bg-blue-50 text-blue-700 compact-m-8 border border-blue-100">
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="compact-text-sm font-medium">100% Free Forever</span>
        </div>

        {/* Main heading */}
        <h1 className="compact-text-4xl md:compact-text-6xl font-bold compact-m-6 text-gray-900 leading-tight">
          AI Freelancers with
          <span className="block text-blue-600">Real Personalities</span>
        </h1>

        {/* Subtitle */}
        <p className="compact-text-lg text-gray-600 max-w-2xl mx-auto compact-m-8 leading-relaxed">
          Connect with AI specialists who have unique working styles and expertise. 
          Each AI is fine-tuned for specific niches and client preferences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row compact-gap-4 justify-center items-center compact-m-12">
          <Link to="/browse-ai">
            <Button size="sm" className="compact-p-6 compact-text-base">
              Browse AI Specialists
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          <Link to="/learn-more">
            <Button size="sm" variant="outline" className="compact-p-6 compact-text-base">
              <Play className="mr-2 w-4 h-4" />
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 compact-gap-8 max-w-sm mx-auto">
          <div className="text-center">
            <div className="compact-text-2xl font-bold text-gray-900 compact-m-1">500+</div>
            <div className="compact-text-sm text-gray-600">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="compact-text-2xl font-bold text-gray-900 compact-m-1">24/7</div>
            <div className="compact-text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="compact-text-2xl font-bold text-green-600 compact-m-1">FREE</div>
            <div className="compact-text-sm text-gray-600">Forever</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
