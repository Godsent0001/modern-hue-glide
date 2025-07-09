
export interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  monthlyVisitors: number;
  loggedInUsers: number;
  activeSpecialists: number;
  monthlyRevenue: number;
  pendingJobs: number;
  completedJobs: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  joinDate: string;
  lastActive: string;
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  status: string;
  permissions: string[];
  createdAt: string;
  lastActive: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  subcategories: string[];
  createdAt: string;
}

export interface Specialist {
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
    documentUrl?: string;
    documentName?: string;
    documentType?: string;
  }>;
}

export interface EmailCampaign {
  subject: string;
  content: string;
  targetAudience: string;
}

export interface Announcement {
  title: string;
  content: string;
  type: string;
  active: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

export interface AuditLog {
  id: number;
  admin: string;
  action: string;
  target: string;
  timestamp: string;
}
