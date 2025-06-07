
import { Zap, Shield, Smartphone, Palette, Code, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with cutting-edge technology for blazing fast load times and smooth interactions.",
      color: "from-yellow-400 to-orange-500"
    },
    {
      icon: Shield,
      title: "Secure by Default",
      description: "Enterprise-grade security with end-to-end encryption and compliance with industry standards.",
      color: "from-green-400 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Mobile First",
      description: "Responsive design that works perfectly on all devices, from mobile phones to desktop computers.",
      color: "from-purple-400 to-pink-500"
    },
    {
      icon: Palette,
      title: "Beautiful Design",
      description: "Carefully crafted user interface with modern aesthetics and intuitive user experience.",
      color: "from-pink-400 to-red-500"
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "Clean, well-documented code with modern development practices and extensive customization options.",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built-in collaboration tools for teams to work together efficiently and stay synchronized.",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for
            <span className="gradient-text"> Modern Development</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to build, deploy, and scale your applications with confidence.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="hover-lift border-0 shadow-lg bg-white group cursor-pointer">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center p-8 bg-white rounded-2xl shadow-xl">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Ready to get started?</h3>
              <p className="text-gray-600 mb-4">Join thousands of developers building amazing apps</p>
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                Start Building Today
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
