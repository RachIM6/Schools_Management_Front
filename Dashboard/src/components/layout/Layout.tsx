import { FC, ReactNode, useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileMenu } from './MobileMenu';
import { Route } from '../../types';

interface LayoutProps {
  children: ReactNode;
  currentRoute: Route;
  onRouteChange: (route: Route) => void;
}

export const Layout: FC<LayoutProps> = ({ 
  children, 
  currentRoute, 
  onRouteChange 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {!isMobile && (
        <Sidebar 
          currentRoute={currentRoute} 
          onRouteChange={onRouteChange} 
        />
      )}
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header 
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          isMobile={isMobile}
        />
        
        {isMobile && (
          <MobileMenu 
            isOpen={isMobileMenuOpen} 
            onClose={() => setIsMobileMenuOpen(false)}
            currentRoute={currentRoute}
            onRouteChange={(route) => {
              onRouteChange(route);
              setIsMobileMenuOpen(false);
            }}
          />
        )}
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};