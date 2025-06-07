
import { ArrowRight, Play, Users, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-white">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-gray-50/50"></div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 mb-8 border border-blue-100">
          <Sparkles className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">100% Free to Start</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
          AI Freelancers with
          <span className="block text-blue-600">Real Personalities</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
          Connect with AI specialists who have unique working styles and expertise. 
          Each AI is fine-tuned for specific niches and client preferences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link to="/browse-ai">
            <Button size="lg" className="px-8 py-3">
              Browse AI Specialists
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-8 py-3">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">FREE</div>
            <div className="text-sm text-gray-600">To Start</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
