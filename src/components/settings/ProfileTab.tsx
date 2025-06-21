
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bio: string;
}

interface ProfileTabProps {
  profile: ProfileData;
  onProfileChange: (field: string, value: string) => void;
}

const ProfileTab = ({ profile, onProfileChange }: ProfileTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              First name
            </label>
            <Input
              value={profile.firstName}
              onChange={(e) => onProfileChange('firstName', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Last name
            </label>
            <Input
              value={profile.lastName}
              onChange={(e) => onProfileChange('lastName', e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <Input
            type="email"
            value={profile.email}
            onChange={(e) => onProfileChange('email', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone
          </label>
          <Input
            value={profile.phone}
            onChange={(e) => onProfileChange('phone', e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bio
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            value={profile.bio}
            onChange={(e) => onProfileChange('bio', e.target.value)}
          />
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileTab;
