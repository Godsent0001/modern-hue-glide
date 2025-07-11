
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Categories from "@/components/Categories";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-16">
        <div className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Browse Categories
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find the perfect AI specialist for your project across our comprehensive range of categories
              </p>
            </div>
          </div>
        </div>
        <Categories />
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
