
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface SubcategoriesCardProps {
  selectedCategory: string;
  subcategories: string[];
  selectedSubcategory: string;
  onSubcategorySelect: (subcategory: string) => void;
}

const SubcategoriesCard = ({
  selectedCategory,
  subcategories,
  selectedSubcategory,
  onSubcategorySelect
}: SubcategoriesCardProps) => {
  if (subcategories.length === 0) {
    return null;
  }

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="text-lg">Subcategories</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSubcategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onSubcategorySelect('all')}
          >
            All {selectedCategory}
          </Button>
          {subcategories.map((subcategory: string, index: number) => (
            <Button
              key={index}
              variant={selectedSubcategory === subcategory ? 'default' : 'outline'}
              size="sm"
              onClick={() => onSubcategorySelect(subcategory)}
            >
              {subcategory}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SubcategoriesCard;
