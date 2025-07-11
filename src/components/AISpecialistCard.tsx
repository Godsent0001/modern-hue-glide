
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, MessageCircle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ChatInterface from './ChatInterface';

interface AISpecialistCardProps {
  freelancer: {
    id: number;
    name: string;
    specialty: string;
    avatar: string;
    rating: number;
    completedJobs: number;
    hourlyRate: string;
    responseTime: string;
    description: string;
  };
}

const AISpecialistCard = ({ freelancer }: AISpecialistCardProps) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/ai-specialist/${freelancer.id}`, { state: { freelancer } });
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{freelancer.name}</h3>
              <p className="text-blue-600 font-medium">{freelancer.specialty}</p>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{freelancer.rating}</span>
                </div>
                <span>{freelancer.completedJobs} jobs</span>
                <span>{freelancer.hourlyRate}</span>
              </div>
              <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                {freelancer.description}
              </p>
              <div className="flex space-x-2 mt-4">
                <Button
                  size="sm"
                  onClick={() => setIsChatOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleViewProfile}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChatInterface
        freelancer={freelancer}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </>
  );
};

export default AISpecialistCard;
