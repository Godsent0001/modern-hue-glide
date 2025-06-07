
import { Check, Star, Zap } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: 0,
      period: "forever",
      description: "Perfect for trying out AI freelancers",
      features: [
        "5 free AI conversations per month",
        "Access to 50+ AI specialists",
        "Basic project templates",
        "Community support",
        "Standard response time"
      ],
      popular: false,
      gradient: "from-gray-400 to-gray-600"
    },
    {
      name: "Professional",
      price: 29,
      period: "month",
      description: "Best for growing businesses",
      features: [
        "Unlimited AI conversations",
        "Access to 500+ premium AI specialists",
        "Priority support & faster responses",
        "Advanced project templates",
        "Team collaboration tools",
        "Custom AI personality requests",
        "Analytics dashboard"
      ],
      popular: true,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      name: "Enterprise",
      price: 99,
      period: "month",
      description: "For large teams and organizations",
      features: [
        "Everything in Professional",
        "Dedicated AI specialists",
        "Custom AI training & fine-tuning",
        "White-label solutions",
        "24/7 premium support",
        "Advanced security features",
        "Custom integrations",
        "Dedicated account manager"
      ],
      popular: false,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navigation />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Transparent Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the perfect plan for your needs. Start free, upgrade when you're ready to scale.
            </p>
            
            {/* Pricing Toggle */}
            <div className="inline-flex items-center bg-white rounded-full p-1 shadow-lg">
              <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium">
                Monthly
              </button>
              <button className="px-6 py-2 text-gray-600 font-medium">
                Annual (Save 20%)
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div key={index} className={`relative bg-white rounded-2xl shadow-lg overflow-hidden ${plan.popular ? 'ring-4 ring-blue-500 scale-105 z-10' : ''} hover:shadow-xl transition-all duration-300`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 font-medium">
                    <Star className="w-4 h-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      <span className="text-gray-600">/{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${plan.popular ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90` : 'border border-gray-300 text-gray-700 hover:bg-gray-50'}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === 0 ? 'Get Started Free' : 'Start Free Trial'}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How does the free plan work?</h3>
                <p className="text-gray-600">Get started with 5 free AI conversations per month. Perfect for testing our platform and experiencing the quality of our AI specialists.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I change plans anytime?</h3>
                <p className="text-gray-600">Yes! You can upgrade, downgrade, or cancel your subscription at any time. Changes take effect at your next billing cycle.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What makes AI specialists different?</h3>
                <p className="text-gray-600">Each AI specialist has been fine-tuned with unique personalities, expertise areas, and working styles to provide diverse, high-quality results.</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a setup fee?</h3>
                <p className="text-gray-600">No setup fees, no hidden costs. You only pay for your chosen plan, and you can start with our free tier to test everything out.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
