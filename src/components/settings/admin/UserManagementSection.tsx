
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ban, UserCheck, Trash2, Search } from 'lucide-react';
import { User } from './types';

interface UserManagementSectionProps {
  users: User[];
  onUserAction: (userId: number, action: string) => void;
  onDeleteUser: (userId: number) => void;
}

const UserManagementSection = ({ users, onUserAction, onDeleteUser }: UserManagementSectionProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.role === 'Admin' 
                      ? 'bg-purple-100 text-purple-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : user.status === 'Suspended'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell>{user.lastActive}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    {user.status === 'Active' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onUserAction(user.id, 'suspend')}
                        title="Suspend User"
                        className="text-yellow-600 hover:text-yellow-700"
                      >
                        <Ban className="w-4 h-4" />
                      </Button>
                    )}
                    {user.status === 'Suspended' && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onUserAction(user.id, 'activate')}
                        title="Unsuspend User"
                        className="text-green-600 hover:text-green-700"
                      >
                        <UserCheck className="w-4 h-4" />
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDeleteUser(user.id)}
                      title="Delete User"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default UserManagementSection;
