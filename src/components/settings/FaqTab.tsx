
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search, Plus, Trash2 } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface FaqTabProps {
  faqItems: FaqItem[];
  newFaq: { question: string; answer: string; category: string };
  setNewFaq: (faq: { question: string; answer: string; category: string }) => void;
  onAddFaq: () => void;
  onDeleteFaq: (id: number) => void;
}

const FaqTab = ({ faqItems, newFaq, setNewFaq, onAddFaq, onDeleteFaq }: FaqTabProps) => {
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

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

  const categories = [...new Set(faqItems.map(item => item.category))];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>FAQ Management</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </div>

          {showAddForm && (
            <Card className="border-2 border-dashed border-gray-300">
              <CardContent className="p-4 space-y-4">
                <Input
                  placeholder="Question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                />
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                />
                <Input
                  placeholder="Category"
                  value={newFaq.category}
                  onChange={(e) => setNewFaq({ ...newFaq, category: e.target.value })}
                />
                <div className="flex space-x-2">
                  <Button onClick={onAddFaq} disabled={!newFaq.question || !newFaq.answer}>
                    Add FAQ
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="space-y-2">
            {filteredFaqs.map((item) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="flex-1 text-left flex items-center justify-between"
                    >
                      <div>
                        <h3 className="font-medium">{item.question}</h3>
                        <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded mt-1">
                          {item.category}
                        </span>
                      </div>
                      {expandedItems.includes(item.id) ? 
                        <ChevronUp className="w-5 h-5" /> : 
                        <ChevronDown className="w-5 h-5" />
                      }
                    </button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteFaq(item.id)}
                      className="ml-2 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
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
    </div>
  );
};

export default FaqTab;
