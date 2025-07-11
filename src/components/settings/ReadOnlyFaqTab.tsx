import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface ReadOnlyFaqTabProps {
  faqItems: FaqItem[];
}

const ReadOnlyFaqTab = ({ faqItems }: ReadOnlyFaqTabProps) => {
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

  return (
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
                  {expandedItems.includes(item.id) ? 
                    <ChevronUp className="w-5 h-5" /> : 
                    <ChevronDown className="w-5 h-5" />
                  }
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
  );
};

export default ReadOnlyFaqTab;