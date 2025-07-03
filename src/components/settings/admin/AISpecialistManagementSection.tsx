
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Specialist } from './types';

interface AISpecialistManagementSectionProps {
  specialists: Specialist[];
  showCreateForm: boolean;
  showEditForm: boolean;
  editingSpecialist: Specialist | null;
  newSpecialist: any;
  onCreateSpecialist: () => void;
  onEditSpecialist: (specialist: Specialist) => void;
  onUpdateSpecialist: () => void;
  onDeleteSpecialist: (id: number) => void;
  onShowCreateForm: (show: boolean) => void;
  onShowEditForm: (show: boolean) => void;
  onSetNewSpecialist: (specialist: any) => void;
  onSetEditingSpecialist: (specialist: Specialist | null) => void;
  onFileUpload: (file: File, type: string) => void;
}

const AISpecialistManagementSection = ({
  specialists,
  showCreateForm,
  showEditForm,
  editingSpecialist,
  newSpecialist,
  onCreateSpecialist,
  onEditSpecialist,
  onUpdateSpecialist,
  onDeleteSpecialist,
  onShowCreateForm,
  onShowEditForm,
  onSetNewSpecialist,
  onSetEditingSpecialist,
  onFileUpload
}: AISpecialistManagementSectionProps) => {
  const handleCancel = () => {
    onShowCreateForm(false);
    onShowEditForm(false);
    onSetEditingSpecialist(null);
    onSetNewSpecialist({
      name: '',
      specialty: '',
      niche: '',
      customPrompt: '',
      personality: '',
      skills: '',
      avatar: '',
      codeName: '',
      promptTemplate: ''
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>AI Specialists Management</CardTitle>
        <Button
          onClick={() => onShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Specialist
        </Button>
      </CardHeader>
      <CardContent>
        {(showCreateForm || showEditForm) && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">
              {showEditForm ? `Edit ${editingSpecialist?.name}` : 'Create New AI Specialist'}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <Input
                  value={newSpecialist.name}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, name: e.target.value})}
                  placeholder="e.g., Dr. Sarah Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Code Name</label>
                <Input
                  value={newSpecialist.codeName || ''}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, codeName: e.target.value})}
                  placeholder="e.g., TECH_WRITER_01"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialty</label>
                <Input
                  value={newSpecialist.specialty}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, specialty: e.target.value})}
                  placeholder="e.g., Technical Writing Expert"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Niche</label>
                <Input
                  value={newSpecialist.niche}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, niche: e.target.value})}
                  placeholder="e.g., Software Documentation"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Personality</label>
                <Input
                  value={newSpecialist.personality}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, personality: e.target.value})}
                  placeholder="e.g., Professional and detail-oriented"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Skills (comma-separated)</label>
                <Input
                  value={newSpecialist.skills}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, skills: e.target.value})}
                  placeholder="e.g., API Documentation, User Guides, Technical Tutorials"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Custom System Prompt</label>
              <Textarea
                value={newSpecialist.customPrompt}
                onChange={(e) => onSetNewSpecialist({...newSpecialist, customPrompt: e.target.value})}
                placeholder="Enter the system prompt that defines how this AI specialist should behave, respond, and approach tasks..."
                rows={4}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Prompt Template (Tone & Writing Style)</label>
              <Textarea
                value={newSpecialist.promptTemplate || ''}
                onChange={(e) => onSetNewSpecialist({...newSpecialist, promptTemplate: e.target.value})}
                placeholder="Define the specific tone, writing style, and formatting preferences this AI specialist should follow..."
                rows={3}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Avatar</label>
              <div className="flex items-center space-x-2">
                <Input
                  value={newSpecialist.avatar || ''}
                  onChange={(e) => onSetNewSpecialist({...newSpecialist, avatar: e.target.value})}
                  placeholder="Avatar URL"
                  className="flex-1"
                />
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) onFileUpload(file, 'avatar');
                    }}
                    className="hidden"
                  />
                  <Button type="button" variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Avatar
                  </Button>
                </label>
              </div>
            </div>
            <div className="flex space-x-4">
              <Button
                onClick={showEditForm ? onUpdateSpecialist : onCreateSpecialist}
                className="bg-green-600 hover:bg-green-700"
              >
                {showEditForm ? 'Update Specialist' : 'Create Specialist'}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Avatar</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Code Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Jobs</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {specialists.map((specialist) => (
              <TableRow key={specialist.id}>
                <TableCell>
                  <img 
                    src={specialist.avatar || 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=40&h=40&fit=crop&crop=face'} 
                    alt={specialist.name} 
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                </TableCell>
                <TableCell className="font-medium">{specialist.name}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-mono">
                    {specialist.codeName || 'N/A'}
                  </span>
                </TableCell>
                <TableCell>{specialist.specialty}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    specialist.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {specialist.status}
                  </span>
                </TableCell>
                <TableCell>{specialist.jobsCompleted}</TableCell>
                <TableCell>{specialist.rating > 0 ? specialist.rating : 'N/A'}</TableCell>
                <TableCell>{specialist.created}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEditSpecialist(specialist)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDeleteSpecialist(specialist.id)}
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

export default AISpecialistManagementSection;
