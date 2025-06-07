
import { ArrowRight, Play, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg animate-gradient"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl floating" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full glass-effect mb-8 fade-in-up">
          <Star className="w-4 h-4 mr-2 text-yellow-300" />
          <span className="text-sm font-medium">New Features Available</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
          Build Amazing
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
            Modern Apps
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl mb-8 text-white/80 max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.2s' }}>
          Create beautiful, responsive web applications with cutting-edge technology. 
          Fast, reliable, and designed for the future.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up" style={{ animationDelay: '0.3s' }}>
          <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90 px-8 py-3 text-lg font-semibold">
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
            <Play className="mr-2 w-5 h-5" />
            Watch Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">10K+</div>
            <div className="text-white/70">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-white/70">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-white/70">Features</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-white/70">Support</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
