
import { useState } from 'react';
import AdminStatsSection from './admin/AdminStatsSection';
import AdminManagementSection from './admin/AdminManagementSection';
import UserManagementSection from './admin/UserManagementSection';
import CategoryManagementSection from './admin/CategoryManagementSection';
import AISpecialistManagementSection from './admin/AISpecialistManagementSection';
import MarketingToolsSection from './admin/MarketingToolsSection';
import AuditLogSection from './admin/AuditLogSection';
import SystemSettingsSection from './admin/SystemSettingsSection';
import { AdminStats, User, Admin, Category, Specialist, EmailCampaign, Announcement, FAQ, AuditLog } from './admin/types';

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
  auditLogs: AuditLog[];
  emailCampaign: EmailCampaign;
  setEmailCampaign: (campaign: EmailCampaign) => void;
  onSendEmailCampaign: () => void;
  announcement: Announcement;
  setAnnouncement: (announcement: Announcement) => void;
  onCreateAnnouncement: () => void;
  faqItems: FAQ[];
  newFaq: FAQ;
  setNewFaq: (faq: FAQ) => void;
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
  onCreateAnnouncement
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

  // Announcement with end date
  const [announcementWithEndDate, setAnnouncementWithEndDate] = useState({
    ...announcement,
    endDate: ''
  });

  // Handler Functions
  const handleCreateAdmin = (adminData: Omit<Admin, 'id' | 'status' | 'createdAt' | 'lastActive'>) => {
    const id = admins.length + 1;
    const admin: Admin = {
      id,
      name: adminData.name,
      email: adminData.email,
      status: "Active",
      permissions: adminData.permissions,
      createdAt: new Date().toISOString().split('T')[0],
      lastActive: "Never"
    };
    setAdmins([...admins, admin]);
    console.log('Created admin with permissions:', adminData.permissions);
  };

  const handleDeleteAdmin = (id: number) => {
    setAdmins(admins.filter(admin => admin.id !== id));
  };

  const handleCreateCategory = (categoryData: Omit<Category, 'id' | 'createdAt'>) => {
    const id = categories.length + 1;
    const category: Category = {
      id,
      ...categoryData,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCategories([...categories, category]);
  };

  const handleFileUpload = (file: File, type: 'avatar' | 'categoryIcon') => {
    // Simulate file upload - in real app, this would upload to a service
    const fakeUrl = `https://example.com/uploads/${file.name}`;
    
    if (type === 'avatar') {
      setNewSpecialist(prev => ({ ...prev, avatar: fakeUrl }));
    }
    
    console.log(`Uploaded ${type}:`, fakeUrl);
  };

  return (
    <div className="space-y-6">
      <AdminStatsSection adminStats={adminStats} />
      
      <AdminManagementSection 
        admins={admins}
        onCreateAdmin={handleCreateAdmin}
        onDeleteAdmin={handleDeleteAdmin}
      />

      <UserManagementSection 
        users={users}
        onUserAction={onUserAction}
        onDeleteUser={onDeleteUser}
      />

      <CategoryManagementSection 
        categories={categories}
        onCreateCategory={handleCreateCategory}
        onFileUpload={handleFileUpload}
      />

      <AISpecialistManagementSection 
        specialists={specialists}
        showCreateForm={showCreateForm}
        showEditForm={showEditForm}
        editingSpecialist={editingSpecialist}
        newSpecialist={newSpecialist}
        onCreateSpecialist={onCreateSpecialist}
        onEditSpecialist={onEditSpecialist}
        onUpdateSpecialist={onUpdateSpecialist}
        onDeleteSpecialist={onDeleteSpecialist}
        onShowCreateForm={setShowCreateForm}
        onShowEditForm={setShowEditForm}
        onSetNewSpecialist={setNewSpecialist}
        onSetEditingSpecialist={setEditingSpecialist}
        onFileUpload={handleFileUpload}
      />

      <MarketingToolsSection 
        emailCampaign={emailCampaign}
        announcement={announcementWithEndDate}
        onEmailCampaignChange={setEmailCampaign}
        onAnnouncementChange={setAnnouncementWithEndDate}
        onSendEmailCampaign={onSendEmailCampaign}
        onCreateAnnouncement={onCreateAnnouncement}
      />

      <AuditLogSection auditLogs={auditLogs} />

      <SystemSettingsSection />
    </div>
  );
};

export default AdminTab;
