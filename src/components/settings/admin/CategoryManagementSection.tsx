
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Image, Plus, Edit, Trash2, Upload } from 'lucide-react';
import { Category } from './types';

interface CategoryManagementSectionProps {
  categories: Category[];
  onCreateCategory: (category: Omit<Category, 'id' | 'createdAt'>) => void;
  onEditCategory: (category: Category) => void;
  onDeleteCategory: (id: number) => void;
  onFileUpload: (file: File, type: string) => void;
}

const CategoryManagementSection = ({ categories, onCreateCategory, onEditCategory, onDeleteCategory, onFileUpload }: CategoryManagementSectionProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    icon: '',
    subcategories: ['']
  });

  const handleCreateCategory = () => {
    onCreateCategory({
      ...newCategory,
      subcategories: newCategory.subcategories.filter(sub => sub.trim() !== '')
    });
    setNewCategory({ name: '', description: '', icon: '', subcategories: [''] });
    setShowCreateForm(false);
  };

  const handleSubcategoryChange = (index: number, value: string) => {
    const newSubs = [...newCategory.subcategories];
    newSubs[index] = value;
    setNewCategory({ ...newCategory, subcategories: newSubs });
  };

  const addSubcategoryField = () => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: [...prev.subcategories, '']
    }));
  };

  const removeSubcategoryField = (index: number) => {
    setNewCategory(prev => ({
      ...prev,
      subcategories: prev.subcategories.filter((_, i) => i !== index)
    }));
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <Image className="w-5 h-5" />
          <span>Category Management</span>
        </CardTitle>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Category
        </Button>
      </CardHeader>
      <CardContent>
        {showCreateForm && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Create New Category</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <Input
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                  placeholder="e.g., Technology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Icon</label>
                <div className="flex items-center space-x-2">
                  <Input
                    value={newCategory.icon}
                    onChange={(e) => setNewCategory({...newCategory, icon: e.target.value})}
                    placeholder="Icon URL"
                    className="flex-1"
                  />
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFileUpload(file, 'categoryIcon');
                      }}
                      className="hidden"
                    />
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Category description..."
                rows={2}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
              {newCategory.subcategories.map((subcategory, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={subcategory}
                    onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                    placeholder={`Subcategory ${index + 1}`}
                    className="flex-1"
                  />
                  {newCategory.subcategories.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeSubcategoryField(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSubcategoryField}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subcategory
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleCreateCategory} className="bg-green-600 hover:bg-green-700">
                Create Category
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
              <TableHead>Icon</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Subcategories</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <img src={category.icon} alt={category.name} className="w-8 h-8 rounded object-cover" />
                </TableCell>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell className="max-w-xs truncate">{category.description}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {category.subcategories.slice(0, 2).map((sub, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {sub}
                      </span>
                    ))}
                    {category.subcategories.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs">
                        +{category.subcategories.length - 2} more
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>{category.createdAt}</TableCell>
                <TableCell>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onEditCategory(category)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onDeleteCategory(category.id)}
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

export default CategoryManagementSection;
