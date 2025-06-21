import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { User, Bell, Shield, CreditCard, ArrowLeft, Check, Settings as SettingsIcon, Plus, Edit, Trash2, Users, DollarSign, MessageSquare, TrendingUp, Ban, UserCheck, Mail, Megaphone, FileText, Activity, Eye, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const navigate = useNavigate();
  
  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Looking for quality AI writing specialists for my business.'
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: false,
    marketingEmails: false
  });

  // Mock available tokens - in a real app this would come from your backend
  const [availableTokens] = useState(250000);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      tokens: 100000,
      features: ['100,000 tokens', 'Basic AI models', 'Standard support'],
      current: true
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 0.99,
      tokens: 500000,
      features: ['500,000 tokens', 'Advanced AI models', 'Priority support', 'Custom templates'],
      current: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 1.99,
      tokens: 1000000,
      features: ['1,000,000 tokens', 'All AI models', '24/7 premium support', 'Custom integrations', 'Team collaboration'],
      current: false
    }
  ];

  // Enhanced Admin dashboard state
  const [adminStats] = useState({
    totalUsers: 1247,
    activeUsers: 856,
    monthlyVisitors: 4523,
    loggedInUsers: 342,
    activeSpecialists: 8,
    monthlyRevenue: 15420,
    pendingJobs: 124,
    completedJobs: 1892
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "User",
      status: "Active",
      joinDate: "2024-01-15",
      lastActive: "2024-06-20"
    },
    {
      id: 2,  
      name: "Bob Smith",
      email: "bob@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-02-03",
      lastActive: "2024-06-21"
    }
  ]);

  const [specialists, setSpecialists] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      specialty: "Blog Writing Specialist",
      status: "Active",
      jobsCompleted: 247,
      rating: 4.9,
      created: "2024-01-15",
      niche: "Technology",
      customPrompt: "You are a technology blog writing specialist...",
      personality: "Professional and engaging",
      skills: "Technical writing, SEO optimization, Content strategy"
    },
    {
      id: 2,
      name: "Marcus Rodriguez", 
      specialty: "Landing Page Copy Expert",
      status: "Active",
      jobsCompleted: 189,
      rating: 5.0,
      created: "2024-02-03",
      niche: "Marketing",
      customPrompt: "You are a conversion-focused copywriter...",
      personality: "Persuasive and results-driven",
      skills: "Copywriting, Conversion optimization, A/B testing"
    }
  ]);

  const [newSpecialist, setNewSpecialist] = useState({
    name: '',
    specialty: '',
    niche: '',
    customPrompt: '',
    personality: '',
    skills: '',
    avatar: ''
  });

  const [editingSpecialist, setEditingSpecialist] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [auditLogs] = useState([
    { id: 1, admin: "John Doe", action: "Created AI Specialist", target: "Sarah Chen", timestamp: "2024-06-21 10:30" },
    { id: 2, admin: "John Doe", action: "Suspended User", target: "alice@example.com", timestamp: "2024-06-21 09:15" },
    { id: 3, admin: "John Doe", action: "Updated System Settings", target: "Token Allocation", timestamp: "2024-06-20 16:45" }
  ]);

  const [emailCampaign, setEmailCampaign] = useState({
    subject: '',
    content: '',
    targetAudience: 'all'
  });

  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    type: 'info',
    active: false
  });

  const [faqItems, setFaqItems] = useState([
    { id: 1, question: "How do I get started?", answer: "Simply sign up and browse our AI specialists.", category: "Getting Started" },
    { id: 2, question: "How does billing work?", answer: "We use a token-based system. Purchase tokens and use them as needed.", category: "Billing" }
  ]);

  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '' });

  // Handler functions for profile, notifications, billing
  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePayNow = (planId: string) => {
    console.log(`Initiating payment for plan: ${planId}`);
    // In a real app, this would integrate with your payment system
    alert(`Payment flow for ${planId} plan would be initiated here`);
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return `${(tokens / 1000000).toFixed(1)}M`;
    } else if (tokens >= 1000) {
      return `${(tokens / 1000).toFixed(0)}K`;
    }
    return tokens.toString();
  };

  const handleCreateSpecialist = () => {
    const id = specialists.length + 1;
    const specialist = {
      id,
      name: newSpecialist.name,
      specialty: newSpecialist.specialty,
      status: "Active",
      jobsCompleted: 0,
      rating: 0,
      created: new Date().toISOString().split('T')[0],
      niche: newSpecialist.niche,
      customPrompt: newSpecialist.customPrompt,
      personality: newSpecialist.personality,
      skills: newSpecialist.skills
    };
    setSpecialists([...specialists, specialist]);
    setNewSpecialist({
      name: '',
      specialty: '',
      niche: '',
      customPrompt: '',
      personality: '',
      skills: '',
      avatar: ''
    });
    setShowCreateForm(false);
    console.log('Created specialist with prompt:', newSpecialist.customPrompt);
  };

  const handleEditSpecialist = (specialist) => {
    setEditingSpecialist(specialist);
    setNewSpecialist({
      name: specialist.name,
      specialty: specialist.specialty,
      niche: specialist.niche,
      customPrompt: specialist.customPrompt,
      personality: specialist.personality,
      skills: specialist.skills,
      avatar: specialist.avatar || ''
    });
    setShowEditForm(true);
  };

  const handleUpdateSpecialist = () => {
    const updatedSpecialists = specialists.map(s => 
      s.id === editingSpecialist.id 
        ? { ...s, ...newSpecialist }
        : s
    );
    setSpecialists(updatedSpecialists);
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
  };

  const handleDeleteSpecialist = (id: number) => {
    setSpecialists(specialists.filter(s => s.id !== id));
  };

  const handleUserAction = (userId: number, action: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        switch (action) {
          case 'suspend':
            return { ...user, status: 'Suspended' };
          case 'ban':
            return { ...user, status: 'Banned' };
          case 'activate':
            return { ...user, status: 'Active' };
          case 'makeAdmin':
            return { ...user, role: 'Admin' };
          case 'removeAdmin':
            return { ...user, role: 'User' };
          default:
            return user;
        }
      }
      return user;
    });
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleSendEmailCampaign = () => {
    console.log('Sending email campaign:', emailCampaign);
    alert('Email campaign sent successfully!');
    setEmailCampaign({ subject: '', content: '', targetAudience: 'all' });
  };

  const handleCreateAnnouncement = () => {
    console.log('Creating announcement:', announcement);
    alert('Announcement created successfully!');
    setAnnouncement({ title: '', content: '', type: 'info', active: false });
  };

  const handleAddFaq = () => {
    const id = faqItems.length + 1;
    setFaqItems([...faqItems, { ...newFaq, id }]);
    setNewFaq({ question: '', answer: '', category: '' });
  };

  const handleDeleteFaq = (id: number) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span>Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First name
                    </label>
                    <Input
                      value={profile.firstName}
                      onChange={(e) => handleProfileChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last name
                    </label>
                    <Input
                      value={profile.lastName}
                      onChange={(e) => handleProfileChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Email Updates</h3>
                    <p className="text-sm text-gray-600">Receive updates about your projects</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.emailUpdates}
                    onChange={(e) => handleNotificationChange('emailUpdates', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Push Notifications</h3>
                    <p className="text-sm text-gray-600">Get notified of new messages instantly</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.pushNotifications}
                    onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Marketing Emails</h3>
                    <p className="text-sm text-gray-600">Receive tips and promotional content</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notifications.marketingEmails}
                    onChange={(e) => handleNotificationChange('marketingEmails', e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <Input type="password" placeholder="Current password" />
                    <Input type="password" placeholder="New password" />
                    <Input type="password" placeholder="Confirm new password" />
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Update Password
                    </Button>
                  </div>
                </div>
                <div className="pt-6 border-t">
                  <h3 className="font-medium mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">
                    Enable 2FA
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
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
                      style={{ width: `${(availableTokens / 1000000) * 100}%` }}
                    ></div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Plans */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan) => (
                  <Card key={plan.id} className={`relative ${plan.current ? 'ring-2 ring-blue-500' : ''}`}>
                    {plan.current && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full">
                          Current Plan
                        </span>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="text-3xl font-bold">
                        {plan.price === 0 ? 'Free' : `$${plan.price}`}
                      </div>
                      <p className="text-gray-600">
                        {formatTokens(plan.tokens)} tokens
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <Check className="w-4 h-4 text-green-500" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      {plan.id !== 'free' && (
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          onClick={() => handlePayNow(plan.id)}
                        >
                          Pay Now
                        </Button>
                      )}
                      {plan.current && (
                        <div className="text-center text-sm text-gray-600">
                          Your current plan
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="admin">
            <div className="space-y-6">
              {/* Enhanced Admin Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <Users className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-2xl font-bold">{adminStats.totalUsers}</p>
                        <p className="text-sm text-gray-600">Total Users</p>
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
                        <p className="text-sm text-gray-600">Logged In Users</p>
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
                                  onClick={() => handleUserAction(user.id, 'makeAdmin')}
                                  title="Make Admin"
                                >
                                  <UserCheck className="w-4 h-4" />
                                </Button>
                              )}
                              {user.status === 'Active' && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleUserAction(user.id, 'suspend')}
                                  title="Suspend User"
                                  className="text-yellow-600 hover:text-yellow-700"
                                >
                                  <Ban className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteUser(user.id)}
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
                          onClick={showEditForm ? handleUpdateSpecialist : handleCreateSpecialist}
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
                                onClick={() => handleEditSpecialist(specialist)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDeleteSpecialist(specialist.id)}
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
                      onClick={handleSendEmailCampaign}
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
                      onClick={handleCreateAnnouncement}
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
                    <Button onClick={handleAddFaq} className="bg-green-600 hover:bg-green-700">
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
                              onClick={() => handleDeleteFaq(item.id)}
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
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Default Token Allocation
                      </label>
                      <Input type="number" defaultValue="100000" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Messages Per Session
                      </label>
                      <Input type="number" defaultValue="50" />
                    </div>
                  </div>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
