import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, DollarSign, MessageSquare, TrendingUp, Ban, UserCheck, Mail, Megaphone, FileText, Activity, Eye, Calendar, AlertTriangle, Plus, Edit, Trash2, UserMinus, Briefcase, Code, FileCode, Search, Upload, Shield, Settings as SettingsIcon, Image } from 'lucide-react';

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

interface Admin {
  id: number;
  name: string;
  email: string;
  status: string;
  permissions: string[];
  createdAt: string;
  lastActive: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  subcategories: string[];
  createdAt: string;
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
  codeName?: string;
  promptTemplate?: string;
  avatar?: string;
  portfolios?: Array<{
    id: number;
    title: string;
    description: string;
    url?: string;
    type: 'project' | 'sample' | 'testimonial';
  }>;
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
  // Admin Management State
  const [admins, setAdmins] = useState<Admin[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      permissions: ["stats", "userManagement", "adminManagement", "aiSpecialist", "emailCampaigns", "announcements", "faqManagement", "auditLogs", "systemSettings"],
      createdAt: "2024-01-01",
      lastActive: "2024-06-21"
    }
  ]);

  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    permissions: [] as string[]
  });

  const [showCreateAdminForm, setShowCreateAdminForm] = useState(false);
  const [adminSearchTerm, setAdminSearchTerm] = useState('');
  const [userSearchTerm, setUserSearchTerm] = useState('');

  // Category Management State
  const [categories, setCategories] = useState<Category[]>([
    {
      id: 1,
      name: "Technology",
      description: "Tech-related AI specialists",
      icon: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop",
      subcategories: ["Web Development", "Mobile Apps", "AI/ML"],
      createdAt: "2024-01-01"
    }
  ]);

  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '',
    subcategories: ['']
  });

  const [showCreateCategoryForm, setShowCreateCategoryForm] = useState(false);

  // Announcement Modal State
  const [showAnnouncementPreview, setShowAnnouncementPreview] = useState(false);
  const [announcementEndDate, setAnnouncementEndDate] = useState('');

  // Portfolio and File Upload State
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    description: '',
    url: '',
    type: 'project' as 'project' | 'sample' | 'testimonial'
  });
  const [showPortfolioForm, setShowPortfolioForm] = useState<number | null>(null);

  const adminPermissions = [
    { id: 'stats', label: 'Stats Section' },
    { id: 'userManagement', label: 'User Management' },
    { id: 'adminManagement', label: 'Admin Management' },
    { id: 'aiSpecialist', label: 'AI Specialist Management' },
    { id: 'emailCampaigns', label: 'Email Campaigns' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'faqManagement', label: 'FAQ Management' },
    { id: 'auditLogs', label: 'Audit Logs' },
    { id: 'systemSettings', label: 'System Settings' }
  ];

  // Handler Functions
  const handleCreateAdmin = () => {
    const id = admins.length + 1;
    const admin: Admin = {
      id,
      name: newAdmin.name,
      email: newAdmin.email,
      status: "Active",
      permissions: newAdmin.permissions,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: "Never"
    };
    setAdmins([...admins, admin]);
    setNewAdmin({ name: '', email: '', password: '', permissions: [] });
    setShowCreateAdminForm(false);
    console.log('Created admin with permissions:', newAdmin.permissions);
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setNewAdmin(prev => ({
        ...prev,
        permissions: [...prev.permissions, permission]
      }));
    } else {
      setNewAdmin(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permission)
      }));
    }
  };

  const handleCreateCategory = () => {
    const id = categories.length + 1;
    const category: Category = {
      id,
      name: newCategory.name,
      description: newCategory.description,
      icon: newCategory.icon,
      subcategories: newCategory.subcategories.filter(sub => sub.trim() !== ''),
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCategories([...categories, category]);
    setNewCategory({ name: '', description: '', icon: '', subcategories: [''] });
    setShowCreateCategoryForm(false);
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const newSubs = [...newCategory.subcategories];
    newSubs[index] = value;
    setNewCategory({ ...newCategory, subcategories: newSubs });
  };

  const addSubcategoryField = () => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, '']
    }));
  };

  const removeSubcategoryField = (index: number) => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (file: File, type: 'avatar' | 'categoryIcon') => {
    // Simulate file upload - in real app, this would upload to a service
    const fakeUrl = `https://example.com/uploads/${file.name}`;
    
    if (type === 'avatar') {
      setNewSpecialist(prev => ({ ...prev, avatar: fakeUrl }));
    } else if (type === 'categoryIcon') {
      setNewCategory(prev => ({ ...prev, icon: fakeUrl }));
    }
    
    console.log(`Uploaded ${type}:`, fakeUrl);
  };

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(adminSearchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(userSearchTerm.toLowerCase())
  );

  const handleAnnouncementPreview = () => {
    setShowAnnouncementPreview(true);
  };

  const handleSendAnnouncement = () => {
    console.log('Sending announcement:', { ...announcement, endDate: announcementEndDate });
    alert('Announcement sent successfully!');
    setShowAnnouncementPreview(false);
    setAnnouncement({ title: '', content: '', type: 'info', active: false });
    setAnnouncementEndDate('');
  };

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

      {/* Admin Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Admin Management</span>
          </CardTitle>
          <Button
            onClick={() => setShowCreateAdminForm(!showCreateAdminForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Admin
          </Button>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search admins..."
                value={adminSearchTerm}
                onChange={(e) => setAdminSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {showCreateAdminForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold">Create New Admin</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <Input
                    value={newAdmin.name}
                    onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                    placeholder="Admin name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <Input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    placeholder="admin@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <Input
                  type="password"
                  value={newAdmin.password}
                  onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                  placeholder="Enter password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-3 gap-4">
                  {adminPermissions.map((permission) => (
                    <label key={permission.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newAdmin.permissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm">{permission.label}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleCreateAdmin} className="bg-green-600 hover:bg-green-700">
                  Create Admin
                </Button>
                <Button variant="outline" onClick={() => setShowCreateAdminForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Permissions</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdmins.map((admin) => (
                <TableRow key={admin.id}>
                  <TableCell className="font-medium">{admin.name}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      admin.status === 'Active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {admin.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {admin.permissions.slice(0, 3).map((perm) => (
                        <span key={perm} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {adminPermissions.find(p => p.id === perm)?.label.split(' ')[0]}
                        </span>
                      ))}
                      {admin.permissions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                          +{admin.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{admin.createdAt}</TableCell>
                  <TableCell>{admin.lastActive}</TableCell>
                  <TableCell>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDeleteAdmin(admin.id)}
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

      {/* Enhanced User Management */}
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search users..."
                value={userSearchTerm}
                onChange={(e) => setUserSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

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
              {filteredUsers.map((user) => (
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

      {/* Category Management */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Image className="w-5 h-5" />
            <span>Category Management</span>
          </CardTitle>
          <Button
            onClick={() => setShowCreateCategoryForm(!showCreateCategoryForm)}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Category
          </Button>
        </CardHeader>
        <CardContent>
          {showCreateCategoryForm && (
            <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold">Create New Category</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                  <Input
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    placeholder="e.g., Technology"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Icon</label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={newCategory.icon}
                      onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                      placeholder="Icon URL"
                      className="flex-1"
                    />
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, 'categoryIcon');
                        }}
                        className="hidden"
                      />
                      <Button type="button" variant="outline" size="sm">
                        <Upload className="w-4 h-4" />
                      </Button>
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={newCategory.description}
                  onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                  placeholder="Category description..."
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
                {newCategory.subcategories.map((subcategory, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={subcategory}
                      onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                      placeholder={`Subcategory ${index + 1}`}
                      className="flex-1"
                    />
                    {newCategory.subcategories.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSubcategoryField(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addSubcategoryField}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Subcategory
                </Button>
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleCreateCategory} className="bg-green-600 hover:bg-green-700">
                  Create Category
                </Button>
                <Button variant="outline" onClick={() => setShowCreateCategoryForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Subcategories</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <img src={category.icon} alt={category.name} className="w-8 h-8 rounded object-cover" />
                  </TableCell>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 2).map((sub, index) => (
                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                          {sub}
                        </span>
                      ))}
                      {category.subcategories.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                          +{category.subcategories.length - 2} more
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{category.createdAt}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
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

      {/* AI Specialists Management with File Upload */}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <Input
                    value={newSpecialist.name}
                    onChange={(e) => setNewSpecialist({...newSpecialist, name: e.target.value})}
                    placeholder="e.g., Dr. Sarah Johnson"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Code Name</label>
                  <Input
                    value={newSpecialist.codeName || ''}
                    onChange={(e) => setNewSpecialist({...newSpecialist, codeName: e.target.value})}
                    placeholder="e.g., TECH_WRITER_01"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                  <Input
                    value={newSpecialist.specialty}
                    onChange={(e) => setNewSpecialist({...newSpecialist, specialty: e.target.value})}
                    placeholder="e.g., Technical Writing Expert"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                  <Input
                    value={newSpecialist.niche}
                    onChange={(e) => setNewSpecialist({...newSpecialist, niche: e.target.value})}
                    placeholder="e.g., Software Documentation"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Personality</label>
                  <Input
                    value={newSpecialist.personality}
                    onChange={(e) => setNewSpecialist({...newSpecialist, personality: e.target.value})}
                    placeholder="e.g., Professional and detail-oriented"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                  <Input
                    value={newSpecialist.skills}
                    onChange={(e) => setNewSpecialist({...newSpecialist, skills: e.target.value})}
                    placeholder="e.g., API Documentation, User Guides, Technical Tutorials"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Custom System Prompt</label>
                <Textarea
                  value={newSpecialist.customPrompt}
                  onChange={(e) => setNewSpecialist({...newSpecialist, customPrompt: e.target.value})}
                  placeholder="Enter the system prompt that defines how this AI specialist should behave, respond, and approach tasks..."
                  rows={4}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Prompt Template (Tone & Writing Style)</label>
                <Textarea
                  value={newSpecialist.promptTemplate || ''}
                  onChange={(e) => setNewSpecialist({...newSpecialist, promptTemplate: e.target.value})}
                  placeholder="Define the specific tone, writing style, and formatting preferences this AI specialist should follow..."
                  rows={3}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newSpecialist.avatar || ''}
                    onChange={(e) => setNewSpecialist({...newSpecialist, avatar: e.target.value})}
                    placeholder="Avatar URL"
                    className="flex-1"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'avatar');
                      }}
                      className="hidden"
                    />
                    <Button type="button" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Avatar
                    </Button>
                  </label>
                </div>
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
                      avatar: '',
                      codeName: '',
                      promptTemplate: ''
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
                <TableHead>Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Code Name</TableHead>
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
                  <TableCell>
                    <img 
                      src={specialist.avatar || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=40&h=40&fit=crop&crop=face'} 
                      alt={specialist.name} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                  </TableCell>
                  <TableCell className="font-medium">{specialist.name}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-mono">
                      {specialist.codeName || 'N/A'}
                    </span>
                  </TableCell>
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

      {/* Enhanced Marketing Tools */}
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <Input
                value={emailCampaign.subject}
                onChange={(e) => setEmailCampaign({...emailCampaign, subject: e.target.value})}
                placeholder="Campaign subject..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={emailCampaign.targetAudience}
                onChange={(e) => setEmailCampaign({...emailCampaign, targetAudience: e.target.value})}
              >
                <option value="all">All Users</option>
                <option value="active">Active Users</option>
                <option value="inactive">Inactive Users</option>
                <option value="newSignups">New Signups (Last 7 days)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <Input
                value={announcement.title}
                onChange={(e) => setAnnouncement({...announcement, title: e.target.value})}
                placeholder="Announcement title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={announcement.type}
                onChange={(e) => setAnnouncement({...announcement, type: e.target.value})}
              >
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="success">Success</option>
                <option value="error">Error</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
              <Input
                type="datetime-local"
                value={announcementEndDate}
                onChange={(e) => setAnnouncementEndDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <Textarea
                value={announcement.content}
                onChange={(e) => setAnnouncement({...announcement, content: e.target.value})}
                placeholder="Announcement content..."
                rows={3}
              />
            </div>
            <Button 
              onClick={handleAnnouncementPreview}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Preview & Create Announcement
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Announcement Preview Dialog */}
      <Dialog open={showAnnouncementPreview} onOpenChange={setShowAnnouncementPreview}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Announcement Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border-l-4 ${
              announcement.type === 'info' ? 'bg-blue-50 border-blue-500' :
              announcement.type === 'warning' ? 'bg-yellow-50 border-yellow-500' :
              announcement.type === 'success' ? 'bg-green-50 border-green-500' :
              'bg-red-50 border-red-500'
            }`}>
              <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
              <p className="text-gray-700">{announcement.content}</p>
              {announcementEndDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Ends: {new Date(announcementEndDate).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSendAnnouncement} className="flex-1 bg-green-600 hover:bg-green-700">
                Send Announcement
              </Button>
              <Button variant="outline" onClick={() => setShowAnnouncementPreview(false)} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
          <CardTitle className="flex items-center space-x-2">
            <SettingsIcon className="w-5 h-5" />
            <span>System Settings</span>
          </CardTitle>
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
