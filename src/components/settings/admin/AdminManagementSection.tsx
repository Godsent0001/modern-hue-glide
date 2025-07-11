
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Plus, Search, Trash2 } from 'lucide-react';
import { Admin } from './types';

interface AdminManagementSectionProps {
  admins: Admin[];
  onCreateAdmin: (admin: Omit<Admin, 'id' | 'status' | 'createdAt' | 'lastActive'>) => void;
  onDeleteAdmin: (id: number) => void;
}

const AdminManagementSection = ({ admins, onCreateAdmin, onDeleteAdmin }: AdminManagementSectionProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    permissions: [] as string[]
  });

  const adminPermissions = [
    { id: 'stats', label: 'Stats Section' },
    { id: 'userManagement', label: 'User Management' },
    { id: 'adminManagement', label: 'Admin Management' },
    { id: 'aiSpecialist', label: 'AI Specialist Management' },
    { id: 'emailCampaigns', label: 'Email Campaigns' },
    { id: 'announcements', label: 'Announcements' },
    { id: 'faqManagement', label: 'FAQ Management' },
    { id: 'auditLogs', label: 'Audit Logs' },
    { id: 'systemSettings', label: 'System Settings' }
  ];

  const handleCreateAdmin = () => {
    onCreateAdmin(newAdmin);
    setNewAdmin({ name: '', email: '', password: '', permissions: [] });
    setShowCreateForm(false);
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setNewAdmin(prev => ({
        ...prev,
        permissions: [...prev.permissions, permission]
      }));
    } else {
      setNewAdmin(prev => ({
        ...prev,
        permissions: prev.permissions.filter(p => p !== permission)
      }));
    }
  };

  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Shield className="w-5 h-5" />
          <span>Admin Management</span>
        </CardTitle>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Admin
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Create New Admin</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={newAdmin.name}
                  onChange={(e) => setNewAdmin({...newAdmin, name: e.target.value})}
                  placeholder="Admin name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <Input
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                  placeholder="admin@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <Input
                type="password"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              <div className="grid grid-cols-3 gap-4">
                {adminPermissions.map((permission) => (
                  <label key={permission.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={newAdmin.permissions.includes(permission.id)}
                      onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">{permission.label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleCreateAdmin} className="bg-green-600 hover:bg-green-700">
                Create Admin
              </Button>
              <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAdmins.map((admin) => (
              <TableRow key={admin.id}>
                <TableCell className="font-medium">{admin.name}</TableCell>
                <TableCell>{admin.email}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    admin.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {admin.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {admin.permissions.slice(0, 3).map((perm) => (
                      <span key={perm} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {adminPermissions.find(p => p.id === perm)?.label.split(' ')[0]}
                      </span>
                    ))}
                    {admin.permissions.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        +{admin.permissions.length - 3} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{admin.createdAt}</TableCell>
                <TableCell>{admin.lastActive}</TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDeleteAdmin(admin.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AdminManagementSection;
