import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, Code, BrainCog } from 'lucide-react';
import siteConfig from '@/config/config';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Code className="h-6 w-6 text-brand-blue" />
            <span className="text-xl font-bold bg-gradient-to-r from-brand-blue to-brand-lightBlue text-transparent bg-clip-text">
              {siteConfig.logoText}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-brand-blue transition-colors">
              หน้าแรก
            </Link>
            <Link to="/builder" className="text-gray-700 hover:text-brand-blue transition-colors">
              สร้าง EA
            </Link>
            <Link to="/ai-generator" className="text-gray-700 hover:text-brand-blue transition-colors">
              สร้าง EA ด้วย AI
            </Link>
            <Link to="/broker" className="text-gray-700 hover:text-brand-blue transition-colors">
              โบรกเกอร์แนะนำ
            </Link>
            <Link to="/course" className="text-gray-700 hover:text-brand-blue transition-colors">
              คอร์สเรียน
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMenu} 
              className="text-gray-500 hover:text-brand-blue focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 border-t border-gray-200 pt-4">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              หน้าแรก
            </Link>
            <Link 
              to="/builder" 
              className="block text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              สร้าง EA
            </Link>
            <Link 
              to="/ai-generator" 
              className="block text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              สร้าง EA ด้วย AI
            </Link>
            <Link 
              to="/broker" 
              className="block text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              โบรกเกอร์แนะนำ
            </Link>
            <Link 
              to="/course" 
              className="block text-gray-700 hover:text-brand-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              คอร์สเรียน
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
