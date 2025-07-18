
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import AIFreelancers from '@/components/AIFreelancers';
import Categories from '@/components/Categories';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <Categories />
      <AIFreelancers />
      <HowItWorks />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
