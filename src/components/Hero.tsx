
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

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-50 text-blue-700 mb-12 border border-blue-100">
          <Sparkles className="w-5 h-5 mr-3" />
          <span className="text-base font-medium">100% Free Forever</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900 leading-tight">
          AI Freelancers with
          <span className="block text-blue-600">Real Personalities</span>
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
          Connect with AI specialists who have unique working styles and expertise. 
          Each AI is fine-tuned for specific niches and client preferences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
          <Link to="/browse-ai">
            <Button size="lg" className="px-10 py-4 text-lg">
              Browse AI Specialists
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-10 py-4 text-lg" onClick={scrollToCategories}>
            <Play className="mr-3 w-6 h-6" />
            Learn More
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-12 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">500+</div>
            <div className="text-base text-gray-600">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-base text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">FREE</div>
            <div className="text-base text-gray-600">Forever</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
