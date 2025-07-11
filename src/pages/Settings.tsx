import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from '@/components/Navigation';
import ProfileTab from '@/components/settings/ProfileTab';
import BillingTab from '@/components/settings/BillingTab';
import ReadOnlyFaqTab from '@/components/settings/ReadOnlyFaqTab';
import AdminTab from '@/components/settings/AdminTab';
import SupportTab from '@/components/settings/SupportTab';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Settings = () => {
  // Profile state
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    bio: 'AI enthusiast and developer'
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

  const [specialists, setSpecialists] = useState([
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
      skills: "React, Node.js, TypeScript",
      codeName: "TECH_GURU_01",
      promptTemplate: "Use a professional and technical tone",
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=100&h=100&fit=crop&crop=face",
      portfolios: []
    }
  ]);

  // AI Specialist Management State
  const [newSpecialist, setNewSpecialist] = useState({
    name: '',
    specialty: '',
    niche: '',
    customPrompt: '',
    personality: '',
    skills: '',
    avatar: '',
    codeName: '',
    promptTemplate: '',
    portfolios: []
  });
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingSpecialist, setEditingSpecialist] = useState(null);

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


  // Admin handler functions (simplified for now)
  const handleUserAction = (userId: number, action: string) => {
    console.log('User action:', userId, action);
  };

  const handleDeleteUser = (userId: number) => {
    console.log('Delete user:', userId);
  };

  const handleCreateSpecialist = () => {
    if (!newSpecialist.name || !newSpecialist.specialty) {
      alert('Please fill in required fields (Name and Specialty)');
      return;
    }
    
    const id = specialists.length + 1;
    const specialist = {
      id,
      ...newSpecialist,
      status: "Active",
      jobsCompleted: 0,
      rating: 0,
      created: new Date().toISOString().split('T')[0],
      portfolios: newSpecialist.portfolios || []
    };
    
    setSpecialists([...specialists, specialist]);
    setNewSpecialist({
      name: '',
      specialty: '',
      niche: '',
      customPrompt: '',
      personality: '',
      skills: '',
      avatar: '',
      codeName: '',
      promptTemplate: '',
      portfolios: []
    });
    setShowCreateForm(false);
  };

  const handleEditSpecialist = (specialist: any) => {
    setEditingSpecialist(specialist);
    setNewSpecialist({
      name: specialist.name,
      specialty: specialist.specialty,
      niche: specialist.niche,
      customPrompt: specialist.customPrompt,
      personality: specialist.personality,
      skills: specialist.skills,
      avatar: specialist.avatar || '',
      codeName: specialist.codeName || '',
      promptTemplate: specialist.promptTemplate || '',
      portfolios: specialist.portfolios || []
    });
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleUpdateSpecialist = () => {
    if (!editingSpecialist) return;
    
    const updatedSpecialists = specialists.map(specialist =>
      specialist.id === editingSpecialist.id
        ? { ...specialist, ...newSpecialist }
        : specialist
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
      avatar: '',
      codeName: '',
      promptTemplate: '',
      portfolios: []
    });
  };

  const handleDeleteSpecialist = (id: number) => {
    if (confirm('Are you sure you want to delete this specialist?')) {
      setSpecialists(specialists.filter(specialist => specialist.id !== id));
    }
  };

  const handleFileUpload = (file: File, type: string) => {
    // Simulate file upload - in real app, this would upload to a service
    const fakeUrl = URL.createObjectURL(file);
    
    if (type === 'avatar') {
      setNewSpecialist(prev => ({ ...prev, avatar: fakeUrl }));
    }
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
      
      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">Manage your account preferences and platform settings</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
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
                plans={[]}
                onPayNow={handlePayNow}
                formatTokens={formatTokens}
              />
            </TabsContent>

            <TabsContent value="faq">
              <ReadOnlyFaqTab 
                faqItems={faqItems}
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
                onFileUpload={handleFileUpload}
                auditLogs={auditLogs}
                emailCampaign={emailCampaign}
                setEmailCampaign={setEmailCampaign}
                onSendEmailCampaign={handleSendEmailCampaign}
                announcement={announcement}
                setAnnouncement={setAnnouncement}
                onCreateAnnouncement={handleCreateAnnouncement}
                faqItems={faqItems}
                newFaq={{question: '', answer: '', category: ''}}
                setNewFaq={() => {}}
                onAddFaq={() => {}}
                onDeleteFaq={() => {}}
              />
            </TabsContent>

            <TabsContent value="support">
              <SupportTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Settings;
