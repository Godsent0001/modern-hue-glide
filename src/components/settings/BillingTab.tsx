
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price: number;
  tokens: number;
  features: string[];
  current: boolean;
}

interface BillingTabProps {
  availableTokens: number;
  plans: Plan[];
  onPayNow: (planId: string) => void;
  formatTokens: (tokens: number) => string;
}

const BillingTab = ({ availableTokens, plans, onPayNow, formatTokens }: BillingTabProps) => {
  const updatedPlans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      tokens: 5000,
      features: ['5,000 tokens per day', 'Access to all AI models', 'Basic support', 'Community access'],
      current: false,
      priceDisplay: 'Free'
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 1500,
      tokens: 100000,
      features: ['100,000 tokens', 'Access to all AI models', 'Priority support', 'Custom templates', 'Advanced analytics'],
      current: false,
      priceDisplay: '₦1,500',
      approximateUSD: '≈ $0.99'
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 6500,
      tokens: 500000,
      features: ['500,000 tokens', 'Access to all AI models', '24/7 premium support', 'Custom integrations', 'Team collaboration', 'White-label solutions'],
      current: false,
      priceDisplay: '₦6,500',
      approximateUSD: '≈ $4.30'
    },
    {
      id: 'gold',
      name: 'Gold Member',
      price: 24000,
      tokens: 2000000,
      features: ['2,000,000 tokens', 'Access to all AI models', '24/7 VIP support', 'Priority processing', 'Custom AI training', 'Enterprise features', 'Dedicated account manager'],
      current: false,
      priceDisplay: '₦24,000',
      approximateUSD: '≈ $15.99'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Available Tokens Display */}
      <Card>
        <CardHeader>
          <CardTitle>Available Tokens</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-bold text-blue-600">
              {formatTokens(availableTokens)}
            </div>
            <div className="text-gray-600">
              tokens remaining
            </div>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(availableTokens / 10000000) * 100}%` }}
            ></div>
          </div>
        </CardContent>
      </Card>

      {/* Pricing Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {updatedPlans.map((plan) => (
          <Card key={plan.id} className={`relative ${plan.current ? 'ring-2 ring-blue-500' : ''} ${plan.id === 'gold' ? 'border-2 border-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}`}>
            {plan.current && plan.id !== 'free' && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap">
                  Current Plan
                </span>
              </div>
            )}
            {plan.id === 'gold' && (
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap inline-flex items-center">
                  <span className="mr-1">⭐</span>
                  Gold Member
                </span>
              </div>
            )}
            <CardHeader className="text-center pt-6">
              <CardTitle className={`text-xl ${plan.id === 'gold' ? 'text-yellow-700' : ''}`}>{plan.name}</CardTitle>
              <div className={`text-3xl font-bold ${plan.id === 'gold' ? 'text-yellow-600' : ''}`}>
                {plan.priceDisplay}
              </div>
              {plan.approximateUSD && (
                <div className="text-sm text-gray-500">
                  {plan.approximateUSD}
                </div>
              )}
              <p className="text-gray-600">
                {plan.id === 'free' ? '5K tokens/day' : formatTokens(plan.tokens) + ' tokens'}
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              {plan.id !== 'free' && (
                <Button 
                  className={`w-full ${plan.id === 'gold' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white' : 'bg-blue-600 hover:bg-blue-700'}`}
                  onClick={() => onPayNow(plan.id)}
                >
                  Pay Now
                </Button>
              )}
              {plan.current && plan.id !== 'free' && (
                <div className="text-center text-sm text-gray-600">
                  Your current plan
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BillingTab;
