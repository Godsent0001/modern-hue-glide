
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Mail, Megaphone } from 'lucide-react';
import { EmailCampaign, Announcement } from './types';

interface MarketingToolsSectionProps {
  emailCampaign: EmailCampaign;
  announcement: Announcement & { endDate?: string };
  onEmailCampaignChange: (campaign: EmailCampaign) => void;
  onAnnouncementChange: (announcement: Announcement & { endDate?: string }) => void;
  onSendEmailCampaign: () => void;
  onCreateAnnouncement: () => void;
}

const MarketingToolsSection = ({
  emailCampaign,
  announcement,
  onEmailCampaignChange,
  onAnnouncementChange,
  onSendEmailCampaign,
  onCreateAnnouncement
}: MarketingToolsSectionProps) => {
  const [showAnnouncementPreview, setShowAnnouncementPreview] = useState(false);

  const handleAnnouncementPreview = () => {
    setShowAnnouncementPreview(true);
  };

  const handleSendAnnouncement = () => {
    console.log('Sending announcement:', announcement);
    alert('Announcement sent successfully!');
    setShowAnnouncementPreview(false);
    onAnnouncementChange({ title: '', content: '', type: 'info', active: false, endDate: '' });
  };

  return (
    <>
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
                onChange={(e) => onEmailCampaignChange({...emailCampaign, subject: e.target.value})}
                placeholder="Campaign subject..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={emailCampaign.targetAudience}
                onChange={(e) => onEmailCampaignChange({...emailCampaign, targetAudience: e.target.value})}
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
                onChange={(e) => onEmailCampaignChange({...emailCampaign, content: e.target.value})}
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
                onChange={(e) => onAnnouncementChange({...announcement, title: e.target.value})}
                placeholder="Announcement title..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <select 
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={announcement.type}
                onChange={(e) => onAnnouncementChange({...announcement, type: e.target.value})}
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
                value={announcement.endDate || ''}
                onChange={(e) => onAnnouncementChange({...announcement, endDate: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
              <Textarea
                value={announcement.content}
                onChange={(e) => onAnnouncementChange({...announcement, content: e.target.value})}
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
              {announcement.endDate && (
                <p className="text-sm text-gray-500 mt-2">
                  Ends: {new Date(announcement.endDate).toLocaleString()}
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
    </>
  );
};

export default MarketingToolsSection;
