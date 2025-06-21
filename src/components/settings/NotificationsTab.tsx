
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface NotificationSettings {
  emailUpdates: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
}

interface NotificationsTabProps {
  notifications: NotificationSettings;
  onNotificationChange: (field: string, value: boolean) => void;
}

const NotificationsTab = ({ notifications, onNotificationChange }: NotificationsTabProps) => {
  return (
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
            onChange={(e) => onNotificationChange('emailUpdates', e.target.checked)}
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
            onChange={(e) => onNotificationChange('pushNotifications', e.target.checked)}
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
            onChange={(e) => onNotificationChange('marketingEmails', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
