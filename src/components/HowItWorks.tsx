
import { Search, MessageSquare, CheckCircle, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Browse & Discover",
      description: "Search through our curated collection of AI specialists. Each has unique personalities, skills, and working styles to match your project needs.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Chat & Connect",
      description: "Start a conversation with your chosen AI freelancer. Discuss your project requirements, timeline, and expectations in real-time.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: CheckCircle,
      title: "Review & Approve",
      description: "Receive high-quality work delivered on time. Review the output, request revisions if needed, and approve when you're satisfied.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: CreditCard,
      title: "Pay Securely",
      description: "Complete payment securely through our platform. Funds are held safely and released only when you approve the final work.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How AI Workforce
            <span className="text-blue-600"> Works</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with AI freelancers is simple. From discovery to delivery, we've streamlined the entire process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gray-300">
                    <div className="absolute right-0 top-1/2 transform translate-x-1 -translate-y-1/2 w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                )}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-700">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg inline-block">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-6">Join thousands of businesses already working with AI specialists</p>
            <Link to="/browse-ai">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Start Your First Project
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
