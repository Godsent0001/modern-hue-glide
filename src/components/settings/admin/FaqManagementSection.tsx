import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HelpCircle, Plus, Trash2, Search } from 'lucide-react';
import { FAQ } from './types';

interface FaqManagementSectionProps {
  faqItems: FAQ[];
  onAddFaq: (faq: Omit<FAQ, 'id'>) => void;
  onDeleteFaq: (id: number) => void;
}

const FaqManagementSection = ({ faqItems, onAddFaq, onDeleteFaq }: FaqManagementSectionProps) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newFaq, setNewFaq] = useState({
    question: '',
    answer: '',
    category: ''
  });

  const categories = ['Account', 'Billing', 'Support', 'Technical', 'General'];

  const handleCreateFaq = () => {
    if (newFaq.question && newFaq.answer && newFaq.category) {
      onAddFaq(newFaq);
      setNewFaq({ question: '', answer: '', category: '' });
      setShowCreateForm(false);
    }
  };

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center space-x-2">
          <HelpCircle className="w-5 h-5" />
          <span>FAQ Management</span>
        </CardTitle>
        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New FAQ
        </Button>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {showCreateForm && (
          <div className="mb-6 p-6 bg-gray-50 rounded-lg space-y-4">
            <h3 className="text-lg font-semibold">Create New FAQ</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question</label>
              <Input
                value={newFaq.question}
                onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                placeholder="Enter the frequently asked question..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Answer</label>
              <Textarea
                value={newFaq.answer}
                onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                placeholder="Enter the answer to the question..."
                rows={4}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <Select
                value={newFaq.category}
                onValueChange={(value) => setNewFaq({...newFaq, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex space-x-4">
              <Button onClick={handleCreateFaq} className="bg-green-600 hover:bg-green-700">
                Create FAQ
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
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Answer</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFaqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="font-medium max-w-xs">{faq.question}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {faq.category}
                  </span>
                </TableCell>
                <TableCell className="max-w-md truncate">{faq.answer}</TableCell>
                <TableCell>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => onDeleteFaq(faq.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredFaqs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No FAQs found matching your search.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FaqManagementSection;