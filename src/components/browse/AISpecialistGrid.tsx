
import { Star, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface AISpecialist {
  id: number;
  name: string;
  specialty: string;
  subSpecialty: string;
  avatar: string;
  rating: number;
  completedProjects: number;
  responseTime: string;
  skills: string[];
  description: string;
  online: boolean;
}

interface AISpecialistGridProps {
  specialists: AISpecialist[];
  onViewProfile: (specialist: AISpecialist) => void;
  onHire: (specialist: AISpecialist) => void;
}

const AISpecialistGrid = ({
  specialists,
  onViewProfile,
  onHire
}: AISpecialistGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {specialists.map((freelancer) => (
        <Card key={freelancer.id} className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <img
                    src={freelancer.avatar}
                    alt={freelancer.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${freelancer.online ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                </div>
                <div className="min-w-0 flex-1">
                  <CardTitle className="text-lg truncate">{freelancer.name}</CardTitle>
                  <p className="text-sm text-blue-600 truncate">{freelancer.specialty}</p>
                  <p className="text-xs text-gray-500 truncate">{freelancer.subSpecialty}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-600 flex-shrink-0 ml-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1" />
                <span>{freelancer.rating}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-gray-600 text-sm">{freelancer.description}</p>

            <div className="flex flex-wrap gap-2">
              {freelancer.skills.map((skill, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{freelancer.responseTime}</span>
              </div>
              <span className="font-medium text-green-600">FREE</span>
            </div>

            <div className="flex space-x-2 pt-2">
              <Button 
                variant="outline" 
                className="flex-1" 
                size="sm"
                onClick={() => onViewProfile(freelancer)}
              >
                View Profile
              </Button>
              <Button 
                className="flex-1" 
                size="sm"
                onClick={() => onHire(freelancer)}
              >
                <MessageCircle className="w-4 h-4 mr-1" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AISpecialistGrid;
