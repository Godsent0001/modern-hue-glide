
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Categories from '@/components/Categories';
import AIFreelancers from '@/components/AIFreelancers';
import HowItWorks from '@/components/HowItWorks';
import Stats from '@/components/Stats';
import Footer from '@/components/Footer';

const Index = () => {
  const navigate = useNavigate();

  const handleCategorySelect = (category: string, subcategories: string[]) => {
    if (category === 'Browse AI') {
      navigate('/browse-ai');
    } else {
      navigate(`/browse-ai?category=${encodeURIComponent(category)}`, {
        state: { subcategories }
      });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Features />
      <Categories onCategorySelect={handleCategorySelect} />
      <AIFreelancers />
      <HowItWorks />
      <Stats />
      <Footer />
    </div>
  );
};

export default Index;
