
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, DollarSign, MessageSquare, TrendingUp, Ban, UserCheck, Mail, Megaphone, FileText, Activity, Eye, Calendar, AlertTriangle, Plus, Edit, Trash2, UserMinus } from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  monthlyVisitors: number;
  loggedInUsers: number;
  activeSpecialists: number;
  monthlyRevenue: number;
  pendingJobs: number;
  completedJobs: number;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
}

interface Specialist {
  id: number;
  name: string;
  specialty: string;
  status: string;
  jobsCompleted: number;
  rating: number;
  created: string;
  niche: string;
  customPrompt: string;
  personality: string;
  skills: string;
}

interface AdminTabProps {
  adminStats: AdminStats;
  users: User[];
  specialists: Specialist[];
  onUserAction: (userId: number, action: string) => void;
  onDeleteUser: (userId: number) => void;
  onCreateSpecialist: () => void;
  onEditSpecialist: (specialist: Specialist) => void;
  onUpdateSpecialist: () => void;
  onDeleteSpecialist: (id: number) => void;
  newSpecialist: any;
  setNewSpecialist: (specialist: any) => void;
  showCreateForm: boolean;
  setShowCreateForm: (show: boolean) => void;
  showEditForm: boolean;
  setShowEditForm: (show: boolean) => void;
  editingSpecialist: Specialist | null;
  setEditingSpecialist: (specialist: Specialist | null) => void;
  auditLogs: any[];
  emailCampaign: any;
  setEmailCampaign: (campaign: any) => void;
  onSendEmailCampaign: () => void;
  announcement: any;
  setAnnouncement: (announcement: any) => void;
  onCreateAnnouncement: () => void;
  faqItems: any[];
  newFaq: any;
  setNewFaq: (faq: any) => void;
  onAddFaq: () => void;
  onDeleteFaq: (id: number) => void;
}

const AdminTab = ({ 
  adminStats, 
  users, 
  specialists, 
  onUserAction, 
  onDeleteUser, 
  onCreateSpecialist,
  onEditSpecialist,
  onUpdateSpecialist,
  onDeleteSpecialist,
  newSpecialist,
  setNewSpecialist,
  showCreateForm,
  setShowCreateForm,
  showEditForm,
  setShowEditForm,
  editingSpecialist,
  setEditingSpecialist,
  auditLogs,
  emailCampaign,
  setEmailCampaign,
  onSendEmailCampaign,
  announcement,
  setAnnouncement,
  onCreateAnnouncement,
  faqItems,
  newFaq,
  setNewFaq,
  onAddFaq,
  onDeleteFaq
}: AdminTabProps) => {
  return (
    <div className="space-y-6">
      {/* Enhanced Admin Stats */}
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

      {/* User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'Admin' 
                        ? 'bg-purple-100 text-purple-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : user.status === 'Suspended'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      {user.role !== 'Admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'makeAdmin')}
                          title="Make Admin"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      )}
                      {user.role === 'Admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'removeAdmin')}
                          title="Remove Admin"
                          className="text-orange-600 hover:text-orange-700"
                        >
                          <UserMinus className="w-4 h-4" />
                        </Button>
                      )}
                      {user.status === 'Active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'suspend')}
                          title="Suspend User"
                          className="text-yellow-600 hover:text-yellow-700"
                        >
                          <Ban className="w-4 h-4" />
                        </Button>
                      )}
                      {user.status === 'Suspended' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'activate')}
                          title="Unsuspend User"
                          className="text-green-600 hover:text-green-700"
                        >
                          <UserCheck className="w-4 h-4" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDeleteUser(user.id)}
                        title="Delete User"
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* AI Specialists Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>AI Specialists Management</CardTitle>
          <Button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Specialist
          </Button>
        </CardHeader>
        <CardContent>
          {(showCreateForm || showEditForm) && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold">
                {showEditForm ? `Edit ${editingSpecialist?.name}` : 'Create New AI Specialist'}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <Input
                    value={newSpecialist.name}
                    onChange={(e) => setNewSpecialist({...newSpecialist, name: e.target.value})}
                    placeholder="e.g., Dr. Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialty
                  </label>
                  <Input
                    value={newSpecialist.specialty}
                    onChange={(e) => setNewSpecialist({...newSpecialist, specialty: e.target.value})}
                    placeholder="e.g., Technical Writing Expert"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Niche
                  </label>
                  <Input
                    value={newSpecialist.niche}
                    onChange={(e) => setNewSpecialist({...newSpecialist, niche: e.target.value})}
                    placeholder="e.g., Software Documentation"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Personality
                  </label>
                  <Input
                    value={newSpecialist.personality}
                    onChange={(e) => setNewSpecialist({...newSpecialist, personality: e.target.value})}
                    placeholder="e.g., Professional and detail-oriented"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills (comma-separated)
                </label>
                <Input
                  value={newSpecialist.skills}
                  onChange={(e) => setNewSpecialist({...newSpecialist, skills: e.target.value})}
                  placeholder="e.g., API Documentation, User Guides, Technical Tutorials"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom System Prompt
                </label>
                <Textarea
                  value={newSpecialist.customPrompt}
                  onChange={(e) => setNewSpecialist({...newSpecialist, customPrompt: e.target.value})}
                  placeholder="Enter the system prompt that defines how this AI specialist should behave, respond, and approach tasks..."
                  rows={4}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar URL (optional)
                </label>
                <Input
                  value={newSpecialist.avatar}
                  onChange={(e) => setNewSpecialist({...newSpecialist, avatar: e.target.value})}
                  placeholder="https://example.com/avatar.jpg"
                />
              </div>
              <div className="flex space-x-4">
                <Button
                  onClick={showEditForm ? onUpdateSpecialist : onCreateSpecialist}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {showEditForm ? 'Update Specialist' : 'Create Specialist'}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowCreateForm(false);
                    setShowEditForm(false);
                    setEditingSpecialist(null);
                    setNewSpecialist({
                      name: '',
                      specialty: '',
                      niche: '',
                      customPrompt: '',
                      personality: '',
                      skills: '',
                      avatar: ''
                    });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Jobs</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {specialists.map((specialist) => (
                <TableRow key={specialist.id}>
                  <TableCell className="font-medium">{specialist.name}</TableCell>
                  <TableCell>{specialist.specialty}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      specialist.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {specialist.status}
                    </span>
                  </TableCell>
                  <TableCell>{specialist.jobsCompleted}</TableCell>
                  <TableCell>{specialist.rating > 0 ? specialist.rating : 'N/A'}</TableCell>
                  <TableCell>{specialist.created}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onEditSpecialist(specialist)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onDeleteSpecialist(specialist.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Marketing Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="w-5 h-5" />
              <span>Email Campaigns</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <Input
                value={emailCampaign.subject}
                onChange={(e) => setEmailCampaign({...emailCampaign, subject: e.target.value})}
                placeholder="Campaign subject..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Target Audience
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={emailCampaign.targetAudience}
                onChange={(e) => setEmailCampaign({...emailCampaign, targetAudience: e.target.value})}
              >
                <option value="all">All Users</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Textarea
                value={emailCampaign.content}
                onChange={(e) => setEmailCampaign({...emailCampaign, content: e.target.value})}
                placeholder="Campaign content..."
                rows={3}
              />
            </div>
            <Button 
              onClick={onSendEmailCampaign}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Send Campaign
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Megaphone className="w-5 h-5" />
              <span>Announcements</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <Input
                value={announcement.title}
                onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                placeholder="Announcement title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type
              </label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={announcement.type}
                onChange={(e) => setAnnouncement({...announcement, type: e.target.value})}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <Textarea
                value={announcement.content}
                onChange={(e) => setAnnouncement({...announcement, content: e.target.value})}
                placeholder="Announcement content..."
                rows={3}
              />
            </div>
            <Button 
              onClick={onCreateAnnouncement}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Create Announcement
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5" />
            <span>FAQ Management</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <Input
              placeholder="Question..."
              value={newFaq.question}
              onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
            />
            <Input
              placeholder="Category..."
              value={newFaq.category}
              onChange={(e) => setNewFaq({...newFaq, category: e.target.value})}
            />
            <Button onClick={onAddFaq} className="bg-green-600 hover:bg-green-700">
              Add FAQ
            </Button>
          </div>
          <div>
            <Textarea
              placeholder="Answer..."
              value={newFaq.answer}
              onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
              rows={2}
            />
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Question</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Answer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {faqItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.question}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="max-w-xs truncate">{item.answer}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDeleteFaq(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5" />
            <span>Audit Log</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.admin}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell>{log.timestamp}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* System Settings */}
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Global System Message
            </label>
            <Textarea
              placeholder="Enter global instructions that apply to all AI specialists..."
              rows={3}
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Save System Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTab;
