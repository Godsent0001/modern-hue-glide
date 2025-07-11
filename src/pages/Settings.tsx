import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, CreditCard, ArrowLeft, Settings as SettingsIcon, HelpCircle, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProfileTab from '@/components/settings/ProfileTab';
import SecurityTab from '@/components/settings/SecurityTab';
import BillingTab from '@/components/settings/BillingTab';
import AdminTab from '@/components/settings/AdminTab';
import SupportTab from '@/components/settings/SupportTab';
import FaqTab from '@/components/settings/FaqTab';

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

  // Mock available tokens - in a real app this would come from your backend
  const [availableTokens] = useState(250000);

  const plans = [
    {
      id: 'free',
      name: 'Free Plan',
      price: 0,
      tokens: 10000,
      features: ['10,000 tokens per day', 'Access to all AI models', 'Basic support'],
      current: true
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: 0.99,
      tokens: 500000,
      features: ['500,000 tokens', 'Access to all AI models', 'Priority support', 'Custom templates'],
      current: false
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: 1.99,
      tokens: 1000000,
      features: ['1,000,000 tokens', 'Access to all AI models', '24/7 premium support', 'Custom integrations', 'Team collaboration'],
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
    { id: 2, question: "How does billing work?", answer: "We use a token-based system. Purchase tokens and use them as needed.", category: "Billing" },
    { id: 3, question: "Can I create custom AI specialists?", answer: "Yes, our premium plans allow you to create custom AI specialists with specific personalities and expertise.", category: "Features" },
    { id: 4, question: "What payment methods do you accept?", answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise plans.", category: "Billing" }
  ]);

  const [newFaq, setNewFaq] = useState({ question: '', answer: '', category: '' });

  // Handler functions for profile, billing
  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
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
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Support</span>
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center space-x-2">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </TabsTrigger>
            <TabsTrigger value="admin" className="flex items-center space-x-2">
              <SettingsIcon className="w-4 h-4" />
              <span>Admin</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileTab 
              profile={profile}
              onProfileChange={handleProfileChange}
            />
          </TabsContent>

          <TabsContent value="billing">
            <BillingTab 
              availableTokens={availableTokens}
              plans={plans}
              onPayNow={handlePayNow}
              formatTokens={formatTokens}
            />
          </TabsContent>

          <TabsContent value="support">
            <SupportTab />
          </TabsContent>

          <TabsContent value="faq">
            <FaqTab 
              faqItems={faqItems}
              newFaq={newFaq}
              setNewFaq={setNewFaq}
              onAddFaq={handleAddFaq}
              onDeleteFaq={handleDeleteFaq}
            />
          </TabsContent>

          <TabsContent value="admin">
            <AdminTab 
              adminStats={adminStats}
              users={users}
              specialists={specialists}
              onUserAction={handleUserAction}
              onDeleteUser={handleDeleteUser}
              onCreateSpecialist={handleCreateSpecialist}
              onEditSpecialist={handleEditSpecialist}
              onUpdateSpecialist={handleUpdateSpecialist}
              onDeleteSpecialist={handleDeleteSpecialist}
              newSpecialist={newSpecialist}
              setNewSpecialist={setNewSpecialist}
              showCreateForm={showCreateForm}
              setShowCreateForm={setShowCreateForm}
              showEditForm={showEditForm}
              setShowEditForm={setShowEditForm}
              editingSpecialist={editingSpecialist}
              setEditingSpecialist={setEditingSpecialist}
              auditLogs={auditLogs}
              emailCampaign={emailCampaign}
              setEmailCampaign={setEmailCampaign}
              onSendEmailCampaign={handleSendEmailCampaign}
              announcement={announcement}
              setAnnouncement={setAnnouncement}
              onCreateAnnouncement={handleCreateAnnouncement}
              faqItems={faqItems}
              newFaq={newFaq}
              setNewFaq={setNewFaq}
              onAddFaq={handleAddFaq}
              onDeleteFaq={handleDeleteFaq}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
