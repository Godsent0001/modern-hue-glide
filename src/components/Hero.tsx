
import { ArrowRight, Play, Star, Users, Zap, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Enhanced background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-10 right-10 w-48 h-48 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full blur-3xl floating" style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        {/* Enhanced Badge */}
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 mb-8 fade-in-up shadow-lg border border-blue-200">
          <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
          <span className="text-sm font-semibold">🚀 The Future of Freelancing is Here - 100% FREE to Start!</span>
        </div>

        {/* Enhanced Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 fade-in-up text-gray-900" style={{ animationDelay: '0.1s' }}>
          Hire AI Freelancers
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient">
            With Real Personalities
          </span>
        </h1>

        {/* Enhanced Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-700 max-w-5xl mx-auto fade-in-up font-medium leading-relaxed" style={{ animationDelay: '0.2s' }}>
          🎭 Meet AI specialists with <span className="text-purple-600 font-bold">unique personalities</span>, 
          <span className="text-blue-600 font-bold"> expert skills</span>, and 
          <span className="text-pink-600 font-bold"> human-like working styles</span>. 
          <br />
          Each AI is fine-tuned for specific niches and client preferences.
        </p>

        {/* Enhanced CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/browse-ai">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <Sparkles className="mr-3 w-6 h-6" />
              Browse 500+ AI Specialists FREE
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="px-12 py-4 text-xl border-2 border-purple-300 hover:bg-purple-50 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
            <Play className="mr-3 w-6 h-6" />
            Watch Demo (2 min)
          </Button>
        </div>

        {/* Enhanced Quick stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">500+</div>
            </div>
            <div className="text-gray-700 font-semibold">AI Specialists</div>
            <div className="text-sm text-gray-600">All with unique personalities</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-purple-600 mr-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">24/7</div>
            </div>
            <div className="text-gray-700 font-semibold">Always Available</div>
            <div className="text-sm text-gray-600">Instant responses</div>
          </div>
          <div className="text-center col-span-2 md:col-span-1 bg-white/20 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-center mb-3">
              <Star className="w-8 h-8 text-yellow-500 mr-3" />
              <div className="text-4xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">FREE</div>
            </div>
            <div className="text-gray-700 font-semibold">To Get Started</div>
            <div className="text-sm text-gray-600">No credit card required</div>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-gray-600 mb-4 font-medium">Trusted by 10,000+ businesses worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">TechCorp</div>
            <div className="text-2xl font-bold text-gray-400">StartupXYZ</div>
            <div className="text-2xl font-bold text-gray-400">InnovateCo</div>
            <div className="text-2xl font-bold text-gray-400">FutureInc</div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-500 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
