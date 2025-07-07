import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ProfileTab from '@/components/settings/ProfileTab';
import NotificationsTab from '@/components/settings/NotificationsTab';
import BillingTab from '@/components/settings/BillingTab';
import SecurityTab from '@/components/settings/SecurityTab';
import FaqTab from '@/components/settings/FaqTab';
import AdminTab from '@/components/settings/AdminTab';
import SupportTab from '@/components/settings/SupportTab';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Settings = () => {
  const navigate = useNavigate();
  
  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    bio: 'AI enthusiast and developer'
  });

  // Notifications state
  const [notifications, setNotifications] = useState({
    emailUpdates: true,
    pushNotifications: false,
    marketingEmails: true
  });

  // Billing state
  const [availableTokens] = useState(250000);

  // FAQ state
  const [faqItems, setFaqItems] = useState<FaqItem[]>([
    {
      id: 1,
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page.",
      category: "Account"
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and bank transfers.",
      category: "Billing"
    },
    {
      id: 3,
      question: "How can I contact support?",
      answer: "You can contact our support team via email or live chat.",
      category: "Support"
    }
  ]);

  // Admin state
  const [adminStats] = useState({
    totalUsers: 15420,
    activeUsers: 8230,
    monthlyVisitors: 45600,
    loggedInUsers: 1250,
    activeSpecialists: 180,
    monthlyRevenue: 125000,
    pendingJobs: 89,
    completedJobs: 2340
  });

  const [users] = useState([
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
      joinDate: "2024-02-01",
      lastActive: "2024-06-21"
    }
  ]);

  const [specialists] = useState([
    {
      id: 1,
      name: "Tech Guru AI",
      specialty: "Web Development",
      status: "Active",
      jobsCompleted: 145,
      rating: 4.8,
      created: "2024-01-01",
      niche: "Full-stack development",
      customPrompt: "I specialize in modern web technologies",
      personality: "Professional and helpful",
      skills: "React, Node.js, TypeScript"
    }
  ]);

  const [auditLogs] = useState([
    {
      id: 1,
      admin: "John Doe",
      action: "User Created",
      target: "alice@example.com",
      timestamp: "2024-06-21 10:30:00"
    }
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

  // Handler functions
  const handleProfileChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const handlePayNow = (planId: string) => {
    console.log('Pay now for plan:', planId);
  };

  const formatTokens = (tokens: number) => {
    if (tokens >= 1000000) {
      return (tokens / 1000000).toFixed(1) + 'M';
    } else if (tokens >= 1000) {
      return (tokens / 1000).toFixed(0) + 'K';
    }
    return tokens.toString();
  };

  const handleDeleteFaq = (id: number) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  const [newFaq, setNewFaq] = useState<Omit<FaqItem, 'id'>>({ question: '', answer: '', category: '' });

  const handleAddFaq = () => {
    const id = faqItems.length + 1;
    const faqWithId: FaqItem = { id, ...newFaq };
    setFaqItems([...faqItems, faqWithId]);
    setNewFaq({ question: '', answer: '', category: '' });
  };

  // Admin handler functions (simplified for now)
  const handleUserAction = (userId: number, action: string) => {
    console.log('User action:', userId, action);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Delete user:', userId);
  };

  const handleCreateSpecialist = () => {
    console.log('Create specialist');
  };

  const handleEditSpecialist = (specialist: any) => {
    console.log('Edit specialist:', specialist);
  };

  const handleUpdateSpecialist = () => {
    console.log('Update specialist');
  };

  const handleDeleteSpecialist = (id: number) => {
    console.log('Delete specialist:', id);
  };

  const handleSendEmailCampaign = () => {
    console.log('Send email campaign');
  };

  const handleCreateAnnouncement = () => {
    console.log('Create announcement');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-16 pb-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-1 text-xs">Manage your account preferences and platform settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-8">
              <TabsTrigger value="profile" className="text-xs px-2">Profile</TabsTrigger>
              <TabsTrigger value="notifications" className="text-xs px-2">Notifications</TabsTrigger>
              <TabsTrigger value="billing" className="text-xs px-2">Billing</TabsTrigger>
              <TabsTrigger value="security" className="text-xs px-2">Security</TabsTrigger>
              <TabsTrigger value="faq" className="text-xs px-2">FAQ</TabsTrigger>
              <TabsTrigger value="admin" className="text-xs px-2">Admin</TabsTrigger>
              <TabsTrigger value="support" className="text-xs px-2">Support</TabsTrigger>
              <TabsTrigger value="chat" className="text-xs px-2">Live Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab 
                profile={profile}
                onProfileChange={handleProfileChange}
              />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationsTab 
                notifications={notifications}
                onNotificationChange={handleNotificationChange}
              />
            </TabsContent>

            <TabsContent value="billing">
              <BillingTab 
                availableTokens={availableTokens}
                plans={[]}
                onPayNow={handlePayNow}
                formatTokens={formatTokens}
              />
            </TabsContent>

            <TabsContent value="security">
              <SecurityTab />
            </TabsContent>

            <TabsContent value="faq">
              <FaqTab 
                faqItems={faqItems}
                onDeleteFaq={handleDeleteFaq}
                newFaq={newFaq}
                setNewFaq={setNewFaq}
                onAddFaq={handleAddFaq}
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
                newSpecialist={{}}
                setNewSpecialist={() => {}}
                showCreateForm={false}
                setShowCreateForm={() => {}}
                showEditForm={false}
                setShowEditForm={() => {}}
                editingSpecialist={null}
                setEditingSpecialist={() => {}}
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

            <TabsContent value="support">
              <SupportTab />
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Live Support Chat</CardTitle>
                  <p className="text-gray-600 text-xs">Get instant help from our support team</p>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/live-chat')} className="w-full text-xs h-7">
                    Start Live Chat
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
