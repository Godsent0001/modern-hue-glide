import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import Navigation from '@/components/Navigation';
import ProfileTab from '@/components/ProfileTab';
import NotificationsTab from '@/components/NotificationsTab';
import BillingTab from '@/components/BillingTab';
import SecurityTab from '@/components/SecurityTab';
import FaqTab from '@/components/FaqTab';
import AdminTab from '@/components/AdminTab';
import SupportTab from '@/components/SupportTab';

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const Settings = () => {
  const navigate = useNavigate();
  
  const [faqItems, setFaqItems] = useState<FAQ[]>([
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

  const handleDeleteFaq = (id: number) => {
    setFaqItems(faqItems.filter(item => item.id !== id));
  };

  const [newFaq, setNewFaq] = useState<Omit<FAQ, 'id'>>({ question: '', answer: '', category: '' });

  const handleAddFaq = () => {
    const id = faqItems.length + 1;
    const faqWithId: FAQ = { id, ...newFaq };
    setFaqItems([...faqItems, faqWithId]);
    setNewFaq({ question: '', answer: '', category: '' });
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
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
              <TabsTrigger value="support">Support</TabsTrigger>
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <ProfileTab />
            </TabsContent>

            <TabsContent value="notifications">
              <NotificationsTab />
            </TabsContent>

            <TabsContent value="billing">
              <BillingTab />
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
              <AdminTab />
            </TabsContent>

            <TabsContent value="support">
              <SupportTab />
            </TabsContent>

            <TabsContent value="chat">
              <Card>
                <CardHeader>
                  <CardTitle>Live Support Chat</CardTitle>
                  <p className="text-gray-600">Get instant help from our support team</p>
                </CardHeader>
                <CardContent>
                  <Button onClick={() => navigate('/live-chat')} className="w-full">
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
