
import { Card, CardContent } from '@/components/ui/card';
import { Users, DollarSign, MessageSquare, TrendingUp, Activity, Eye, UserCheck, Calendar } from 'lucide-react';
import { AdminStats } from './types';

interface AdminStatsSectionProps {
  adminStats: AdminStats;
}

const AdminStatsSection = ({ adminStats }: AdminStatsSectionProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Users className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.totalUsers}</p>
              <p className="text-sm text-gray-600">Total Sign-ups</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Activity className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Eye className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.monthlyVisitors}</p>
              <p className="text-sm text-gray-600">Monthly Visitors</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <UserCheck className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.loggedInUsers}</p>
              <p className="text-sm text-gray-600">Currently Online</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <MessageSquare className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.activeSpecialists}</p>
              <p className="text-sm text-gray-600">AI Specialists</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-2xl font-bold">${adminStats.monthlyRevenue}</p>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Calendar className="w-8 h-8 text-red-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.pendingJobs}</p>
              <p className="text-sm text-gray-600">Pending Jobs</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-2xl font-bold">{adminStats.completedJobs}</p>
              <p className="text-sm text-gray-600">Completed Jobs</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStatsSection;
