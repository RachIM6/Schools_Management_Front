import { FC, useState, useEffect } from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMobile: boolean;
}

export const Header: FC<HeaderProps> = ({ onMenuToggle, isMobile }) => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`
        sticky top-0 z-10 py-4 px-4 md:px-6 flex items-center justify-between
        transition-all duration-200 ease-in-out
        ${scrolled ? 'bg-white shadow-sm' : 'bg-gray-50'}
      `}
    >
      <div className="flex items-center">
        {isMobile && (
          <button 
            onClick={onMenuToggle}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none mr-3"
          >
            <Menu size={24} />
          </button>
        )}
        
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-white border border-gray-300 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>
      </div>
      
      <div className="flex items-center">
        <button className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="ml-3 relative">
          <div className="flex items-center">
            <button className="flex items-center focus:outline-none">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              <span className="ml-2 hidden md:block font-medium text-sm text-gray-700">Admin User</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};