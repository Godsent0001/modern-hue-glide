
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SecurityTab = () => {
  return (
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
  );
};

export default SecurityTab;
