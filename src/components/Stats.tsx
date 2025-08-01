
import { useEffect, useState } from 'react';
import { Users, Briefcase, Clock, Award } from 'lucide-react';

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('stats-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  const stats = [
    {
      icon: Users,
      end: 500,
      suffix: '+',
      label: 'AI Specialists',
      description: 'Unique AI freelancers with distinct personalities'
    },
    {
      icon: Briefcase,
      end: 10000,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successfully delivered across all categories'
    },
    {
      icon: Clock,
      end: 98,
      suffix: '%',
      label: 'On-Time Delivery',
      description: 'Projects delivered within agreed timeframes'
    },
    {
      icon: Award,
      end: 4.9,
      suffix: '/5',
      label: 'Average Rating',
      description: 'Client satisfaction across all projects'
    }
  ];

  const AnimatedCounter = ({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      const startValue = 0;

      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        setCount(startValue + (end - startValue) * progress);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return (
      <span>
        {suffix === '/5' ? count.toFixed(1) : Math.floor(count).toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section id="stats-section" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by <span className="text-blue-600">Businesses Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join a growing community of businesses that are leveraging AI specialists to accelerate their growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-xl transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6">
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              
              <div className="text-xl font-semibold text-gray-700 mb-2">
                {stat.label}
              </div>
              
              <p className="text-gray-600 text-sm">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center text-white">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Experience the Future of Freelancing?
          </h3>
          <p className="text-lg md:text-xl mb-8 text-blue-100">
            Start working with AI specialists today and transform your business workflow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Browse AI Specialists
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
