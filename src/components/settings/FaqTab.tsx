
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ChevronDown, ChevronUp, Search, Plus, Trash2 } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FaqTabProps {
  faqItems: FaqItem[];
  newFaq: Omit<FaqItem, 'id'>;
  setNewFaq: (faq: Omit<FaqItem, 'id'>) => void;
  onAddFaq: () => void;
  onDeleteFaq: (id: number) => void;
}

const FaqTab = ({ faqItems, newFaq, setNewFaq, onAddFaq, onDeleteFaq }: FaqTabProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewFaqChange = (field: keyof Omit<FaqItem, 'id'>, value: string) => {
    setNewFaq({ ...newFaq, [field]: value });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="space-y-2">
            {filteredFaqs.map((item) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <button
                    onClick={() => toggleExpanded(item.id)}
                    className="w-full text-left flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-medium">{item.question}</h3>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mt-1">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteFaq(item.id);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      {expandedItems.includes(item.id) ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </div>
                  </button>
                  {expandedItems.includes(item.id) && (
                    <div className="mt-3 pt-3 border-t text-gray-600">
                      {item.answer}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredFaqs.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No FAQs found matching your search.
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add New FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <Input
              placeholder="Enter category"
              value={newFaq.category}
              onChange={(e) => handleNewFaqChange('category', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Question</label>
            <Input
              placeholder="Enter question"
              value={newFaq.question}
              onChange={(e) => handleNewFaqChange('question', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Answer</label>
            <Textarea
              placeholder="Enter answer"
              value={newFaq.answer}
              onChange={(e) => handleNewFaqChange('answer', e.target.value)}
              rows={3}
            />
          </div>
          <Button 
            onClick={onAddFaq}
            disabled={!newFaq.question || !newFaq.answer || !newFaq.category}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add FAQ
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FaqTab;
