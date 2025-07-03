
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BrowseAI from "./pages/BrowseAI";
import Pricing from "./pages/Pricing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Settings from "./pages/Settings";
import ChatPage from "./pages/ChatPage";
import ChatHistory from "./pages/ChatHistory";
import LiveChat from "./pages/LiveChat";
import AISpecialistProfile from "./pages/AISpecialistProfile";
import PortfolioDetails from "./pages/PortfolioDetails";
import LearnMore from "./pages/LearnMore";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/browse-ai" element={<BrowseAI />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chat/:id" element={<ChatPage />} />
            <Route path="/chat-history" element={<ChatHistory />} />
            <Route path="/live-chat" element={<LiveChat />} />
            <Route path="/ai-specialist/:id" element={<AISpecialistProfile />} />
            <Route path="/portfolio/:id" element={<PortfolioDetails />} />
            <Route path="/learn-more" element={<LearnMore />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
