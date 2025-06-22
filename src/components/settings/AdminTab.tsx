import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  DollarSign, 
  Clock,
  CheckCircle,
  UserPlus,
  Bot,
  Edit,
  Trash2,
  Plus,
  X,
  Mail,
  Megaphone
} from 'lucide-react';

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
  onCreateAnnouncement
}) => {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [newPortfolioItem, setNewPortfolioItem] = useState({
    title: '',
    description: '',
    category: '',
    image: '',
    tags: ''
  });

  const handleAddPortfolioItem = () => {
    if (newPortfolioItem.title && newPortfolioItem.description) {
      const portfolioItem = {
        id: Date.now(),
        ...newPortfolioItem,
        tags: newPortfolioItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      };
      setPortfolioItems([...portfolioItems, portfolioItem]);
      setNewPortfolioItem({
        title: '',
        description: '',
        category: '',
        image: '',
        tags: ''
      });
    }
  };

  const handleRemovePortfolioItem = (id) => {
    setPortfolioItems(portfolioItems.filter(item => item.id !== id));
  };

  const handleCreateSpecialistWithPortfolio = () => {
    // Include portfolio items when creating specialist
    const specialistWithPortfolio = {
      ...newSpecialist,
      portfolio: portfolioItems
    };
    onCreateSpecialist(specialistWithPortfolio);
    setPortfolioItems([]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.totalUsers}</h3>
                <p className="text-gray-600">Total Sign-ups</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.activeUsers}</h3>
                <p className="text-gray-600">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.monthlyVisitors}</h3>
                <p className="text-gray-600">Monthly Visitors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <DollarSign className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">${adminStats.monthlyRevenue}</h3>
                <p className="text-gray-600">Monthly Revenue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.pendingJobs}</h3>
                <p className="text-gray-600">Pending Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-teal-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.completedJobs}</h3>
                <p className="text-gray-600">Completed Jobs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <UserPlus className="h-8 w-8 text-indigo-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.loggedInUsers}</h3>
                <p className="text-gray-600">Logged-in Users</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Bot className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <h3 className="text-2xl font-bold">{adminStats.activeSpecialists}</h3>
                <p className="text-gray-600">Active Specialists</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="specialists">AI Specialists</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <div className="flex space-x-2 mt-2">
                        <Badge variant={user.status === 'Active' ? 'default' : 'destructive'}>
                          {user.status}
                        </Badge>
                        <Badge variant="outline">{user.role}</Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {user.status === 'Suspended' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'activate')}
                        >
                          Unsuspend
                        </Button>
                      )}
                      {user.status === 'Active' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'suspend')}
                        >
                          Suspend
                        </Button>
                      )}
                      {user.role === 'Admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'removeAdmin')}
                        >
                          Remove Admin
                        </Button>
                      )}
                      {user.role === 'User' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => onUserAction(user.id, 'makeAdmin')}
                        >
                          Make Admin
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => onDeleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="specialists">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>AI Specialist Management</CardTitle>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create New Specialist
              </Button>
            </CardHeader>
            <CardContent>
              {showCreateForm && (
                <div className="mb-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-medium mb-4">Create New AI Specialist</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={newSpecialist.name}
                        onChange={(e) => setNewSpecialist({...newSpecialist, name: e.target.value})}
                        placeholder="Enter specialist name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input
                        id="specialty"
                        value={newSpecialist.specialty}
                        onChange={(e) => setNewSpecialist({...newSpecialist, specialty: e.target.value})}
                        placeholder="e.g. Blog Writing Specialist"
                      />
                    </div>
                    <div>
                      <Label htmlFor="niche">Niche</Label>
                      <Input
                        id="niche"
                        value={newSpecialist.niche}
                        onChange={(e) => setNewSpecialist({...newSpecialist, niche: e.target.value})}
                        placeholder="e.g. Technology, Marketing"
                      />
                    </div>
                    <div>
                      <Label htmlFor="personality">Personality</Label>
                      <Input
                        id="personality"
                        value={newSpecialist.personality}
                        onChange={(e) => setNewSpecialist({...newSpecialist, personality: e.target.value})}
                        placeholder="e.g. Professional and engaging"
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Label htmlFor="skills">Skills (comma-separated)</Label>
                    <Input
                      id="skills"
                      value={newSpecialist.skills}
                      onChange={(e) => setNewSpecialist({...newSpecialist, skills: e.target.value})}
                      placeholder="e.g. Technical writing, SEO optimization"
                    />
                  </div>

                  <div className="mb-4">
                    <Label htmlFor="customPrompt">Custom AI Prompt</Label>
                    <Textarea
                      id="customPrompt"
                      value={newSpecialist.customPrompt}
                      onChange={(e) => setNewSpecialist({...newSpecialist, customPrompt: e.target.value})}
                      placeholder="Enter the custom prompt for this AI specialist..."
                      rows={4}
                    />
                  </div>

                  {/* Portfolio Management Section */}
                  <div className="mb-4">
                    <Label className="text-base font-medium">Portfolio Items</Label>
                    <div className="mt-2 space-y-4">
                      {portfolioItems.map((item) => (
                        <div key={item.id} className="p-3 border rounded bg-white flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{item.title}</h4>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <p className="text-xs text-gray-500">Category: {item.category}</p>
                            {item.tags.length > 0 && (
                              <div className="flex gap-1 mt-1">
                                {item.tags.map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRemovePortfolioItem(item.id)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      
                      <div className="p-3 border-2 border-dashed border-gray-300 rounded">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Input
                            placeholder="Portfolio title"
                            value={newPortfolioItem.title}
                            onChange={(e) => setNewPortfolioItem({...newPortfolioItem, title: e.target.value})}
                          />
                          <Input
                            placeholder="Category"
                            value={newPortfolioItem.category}
                            onChange={(e) => setNewPortfolioItem({...newPortfolioItem, category: e.target.value})}
                          />
                        </div>
                        <Textarea
                          placeholder="Portfolio description"
                          value={newPortfolioItem.description}
                          onChange={(e) => setNewPortfolioItem({...newPortfolioItem, description: e.target.value})}
                          rows={2}
                          className="mb-3"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <Input
                            placeholder="Image URL"
                            value={newPortfolioItem.image}
                            onChange={(e) => setNewPortfolioItem({...newPortfolioItem, image: e.target.value})}
                          />
                          <Input
                            placeholder="Tags (comma-separated)"
                            value={newPortfolioItem.tags}
                            onChange={(e) => setNewPortfolioItem({...newPortfolioItem, tags: e.target.value})}
                          />
                        </div>
                        <Button size="sm" onClick={handleAddPortfolioItem}>
                          <Plus className="w-4 h-4 mr-2" />
                          Add Portfolio Item
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button onClick={handleCreateSpecialistWithPortfolio}>Create Specialist</Button>
                    <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {specialists.map((specialist) => (
                  <div key={specialist.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{specialist.name}</h4>
                      <p className="text-sm text-gray-600">{specialist.specialty}</p>
                      <div className="flex space-x-2 mt-2">
                        <Badge>{specialist.status}</Badge>
                        <Badge variant="outline">{specialist.jobsCompleted} jobs</Badge>
                        <Badge variant="outline">★ {specialist.rating}</Badge>
                      </div>
                    </div>
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
                        variant="destructive"
                        onClick={() => onDeleteSpecialist(specialist.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">Here you can manage system-wide settings.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Logs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-4 border rounded-lg">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{log.timestamp}</span> - 
                      <span className="font-medium">{log.admin}</span> {log.action} "<span className="font-medium">{log.target}</span>"
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Email Campaign</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="emailSubject">Subject</Label>
                    <Input
                      id="emailSubject"
                      value={emailCampaign.subject}
                      onChange={(e) => setEmailCampaign({ ...emailCampaign, subject: e.target.value })}
                      placeholder="Enter subject"
                    />
                  </div>
                  <div>
                    <Label htmlFor="emailTarget">Target Audience</Label>
                    <select
                      id="emailTarget"
                      className="w-full border rounded-md py-2 px-3"
                      value={emailCampaign.targetAudience}
                      onChange={(e) => setEmailCampaign({ ...emailCampaign, targetAudience: e.target.value })}
                    >
                      <option value="all">All Users</option>
                      <option value="active">Active Users</option>
                      <option value="inactive">Inactive Users</option>
                    </select>
                  </div>
                </div>
                <Label htmlFor="emailContent" className="mt-2">Content</Label>
                <Textarea
                  id="emailContent"
                  value={emailCampaign.content}
                  onChange={(e) => setEmailCampaign({ ...emailCampaign, content: e.target.value })}
                  placeholder="Enter email content"
                  rows={4}
                />
                <Button className="mt-4" onClick={onSendEmailCampaign}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email Campaign
                </Button>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Site Announcement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="announcementTitle">Title</Label>
                    <Input
                      id="announcementTitle"
                      value={announcement.title}
                      onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="announcementType">Type</Label>
                    <select
                      id="announcementType"
                      className="w-full border rounded-md py-2 px-3"
                      value={announcement.type}
                      onChange={(e) => setAnnouncement({ ...announcement, type: e.target.value })}
                    >
                      <option value="info">Information</option>
                      <option value="warning">Warning</option>
                      <option value="alert">Alert</option>
                    </select>
                  </div>
                </div>
                <Label htmlFor="announcementContent" className="mt-2">Content</Label>
                <Textarea
                  id="announcementContent"
                  value={announcement.content}
                  onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                  placeholder="Enter announcement content"
                  rows={4}
                />
                <div className="flex items-center space-x-2 mt-2">
                  <Input
                    type="checkbox"
                    id="announcementActive"
                    checked={announcement.active}
                    onChange={(e) => setAnnouncement({ ...announcement, active: e.target.checked })}
                  />
                  <Label htmlFor="announcementActive">Active</Label>
                </div>
                <Button className="mt-4" onClick={onCreateAnnouncement}>
                  <Megaphone className="w-4 h-4 mr-2" />
                  Create Announcement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminTab;
