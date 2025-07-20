import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import Builder from "./pages/Builder";
import AIGenerator from "./pages/AIGenerator";
import BrokerRecommendation from "./pages/BrokerRecommendation";
import Course from "./pages/Course";
import NotFound from "./pages/NotFound";
import FAQ from "./pages/FAQ";
import HowToUse from "./pages/HowToUse";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/builder" element={<Builder />} />
            <Route path="/ai-generator" element={<AIGenerator />} />
            <Route path="/broker" element={<BrokerRecommendation />} />
            <Route path="/course" element={<Course />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/how-to-use" element={<HowToUse />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
