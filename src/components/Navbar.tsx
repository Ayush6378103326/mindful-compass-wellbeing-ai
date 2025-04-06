
import React from 'react';
import { Heart, Search, MessageSquare, Activity, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-healthcare-muted sticky top-0 z-30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Heart className="text-healthcare-primary h-6 w-6 mr-2" />
            <span className="text-xl font-semibold text-healthcare-dark">Mindful<span className="text-healthcare-primary">Compass</span></span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <NavLink href="#" icon={<Search className="h-4 w-4" />} text="Find Medicines" />
            <NavLink href="#" icon={<MessageSquare className="h-4 w-4" />} text="Chat" />
            <NavLink href="#" icon={<Activity className="h-4 w-4" />} text="Mental Wellbeing" />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-healthcare-dark p-2"
            >
              {isMenuOpen ? 
                <X className="h-6 w-6" /> : 
                <Menu className="h-6 w-6" />
              }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden bg-white absolute w-full border-b border-healthcare-muted transition-all duration-300 ease-in-out",
        isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
      )}>
        <div className="container mx-auto px-4 py-4 space-y-4">
          <MobileNavLink href="#" icon={<Search className="h-5 w-5" />} text="Find Medicines" />
          <MobileNavLink href="#" icon={<MessageSquare className="h-5 w-5" />} text="Chat" />
          <MobileNavLink href="#" icon={<Activity className="h-5 w-5" />} text="Mental Wellbeing" />
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
}

const NavLink = ({ href, icon, text }: NavLinkProps) => (
  <a href={href} className="flex items-center text-healthcare-dark hover:text-healthcare-primary transition-colors">
    <span className="mr-1">{icon}</span>
    <span>{text}</span>
  </a>
);

const MobileNavLink = ({ href, icon, text }: NavLinkProps) => (
  <a href={href} className="flex items-center p-2 text-healthcare-dark hover:text-healthcare-primary transition-colors">
    <span className="mr-3">{icon}</span>
    <span className="text-lg">{text}</span>
  </a>
);

export default Navbar;
