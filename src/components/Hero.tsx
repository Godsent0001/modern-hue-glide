
import { ArrowRight, Play, Star, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 mb-8 fade-in-up">
          <Star className="w-4 h-4 mr-2" />
          <span className="text-sm font-medium">Next-Gen AI Freelancing Platform</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up text-gray-900" style={{ animationDelay: '0.1s' }}>
          Hire AI Freelancers
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            With Real Personalities
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 text-gray-600 max-w-4xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
          Connect with AI specialists that have unique personalities, expertise, and working styles. 
          Each AI is fine-tuned for specific niches and preferences.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8 py-3 text-lg font-semibold">
            Browse AI Freelancers
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="px-8 py-3 text-lg border-gray-300">
            <Play className="mr-2 w-5 h-5" />
            See How It Works
          </Button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-2xl mx-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="w-6 h-6 text-blue-600 mr-2" />
              <div className="text-3xl font-bold text-gray-900">500+</div>
            </div>
            <div className="text-gray-600">AI Specialists</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-6 h-6 text-purple-600 mr-2" />
              <div className="text-3xl font-bold text-gray-900">24/7</div>
            </div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1">
            <div className="flex items-center justify-center mb-2">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <div className="text-3xl font-bold text-gray-900">4.9</div>
            </div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
