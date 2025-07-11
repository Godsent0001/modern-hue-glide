
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
        <CardContent className="compact-p-4">
          <div className="flex items-start compact-gap-3">
            <img
              src={freelancer.avatar}
              alt={freelancer.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="compact-text-base font-semibold text-gray-900">{freelancer.name}</h3>
              <p className="text-blue-600 font-medium compact-text-sm">{freelancer.specialty}</p>
              <div className="flex items-center compact-gap-3 mt-1 compact-text-xs text-gray-600">
                <div className="flex items-center">
                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                  <span>{freelancer.rating}</span>
                </div>
                <span>{freelancer.completedJobs} jobs</span>
                <span>{freelancer.hourlyRate}</span>
              </div>
              <p className="text-gray-700 compact-text-xs mt-1 line-clamp-2">
                {freelancer.description}
              </p>
              <div className="flex compact-gap-2 mt-3">
                <Button
                  size="sm"
                  onClick={() => setIsChatOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 compact-text-xs compact-p-2"
                >
                  <MessageCircle className="w-3 h-3 mr-1" />
                  Chat
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleViewProfile}
                  className="compact-text-xs compact-p-2"
                >
                  <Eye className="w-3 h-3 mr-1" />
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
