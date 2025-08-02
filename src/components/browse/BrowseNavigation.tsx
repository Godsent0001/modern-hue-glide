
import { ArrowLeft, ChevronRight } from 'lucide-react';

interface BrowseNavigationProps {
  showSubcategories: boolean;
  selectedCategory: string;
  onBackToHome: () => void;
  onBackToCategories: () => void;
}

const BrowseNavigation = ({
  showSubcategories,
  selectedCategory,
  onBackToHome,
  onBackToCategories
}: BrowseNavigationProps) => {
  if (!showSubcategories || selectedCategory === 'all') {
    return null;
  }

  return (
    <div className="flex items-center mb-6 text-sm text-gray-600">
      <button 
        onClick={onBackToHome}
        className="flex items-center hover:text-blue-600 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Home
      </button>
      <ChevronRight className="w-4 h-4 mx-2" />
      <button 
        onClick={onBackToCategories}
        className="hover:text-blue-600 transition-colors"
      >
        All Categories
      </button>
      <ChevronRight className="w-4 h-4 mx-2" />
      <span className="text-gray-900 font-medium">{selectedCategory}</span>
    </div>
  );
};

export default BrowseNavigation;
