
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Settings as SettingsIcon } from 'lucide-react';

const SystemSettingsSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5" />
          <span>System Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
  );
};

export default SystemSettingsSection;
