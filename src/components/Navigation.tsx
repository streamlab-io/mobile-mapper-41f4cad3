
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatedContainer } from './AnimatedContainer';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Home, Users, Building2, Briefcase, LogOut, Menu, X } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Home', icon: Home },
  { path: '/developers', label: 'Developers', icon: Users },
  { path: '/projects', label: 'Projects', icon: Briefcase },
  { path: '/properties', label: 'Properties', icon: Building2 },
];

export const Navigation: React.FC = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!isAuthenticated) return null;

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t md:hidden">
        <AnimatedContainer className="flex items-center justify-around p-2" animation="fadeIn">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center p-2 rounded-full transition-colors",
                location.pathname === item.path 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          ))}
        </AnimatedContainer>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:block fixed top-0 left-0 h-screen w-64 bg-background/80 backdrop-blur-xl border-r z-50">
        <AnimatedContainer className="flex flex-col h-full py-8" animation="fadeIn">
          <div className="px-6 mb-8">
            <h1 className="text-xl font-semibold">RealEstate App</h1>
          </div>
          
          <nav className="flex-1">
            <ul className="space-y-2 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary font-medium"
                        : "hover:bg-muted text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="px-6 mt-auto">
            <Button 
              variant="outline" 
              className="w-full justify-start gap-2" 
              onClick={() => logout()}
            >
              <LogOut size={16} />
              Sign Out
            </Button>
          </div>
        </AnimatedContainer>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b md:hidden">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-lg font-semibold">RealEstate App</h1>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Menu Drawer */}
        {isOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col p-6 animate-fade-in">
            <div className="flex justify-end mb-8">
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X size={24} />
              </Button>
            </div>
            <nav className="flex-1">
              <ul className="space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={cn(
                        "flex items-center gap-3 py-3 text-lg transition-all",
                        location.pathname === item.path
                          ? "text-primary font-medium"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto pt-6 border-t">
              <Button 
                variant="outline" 
                className="w-full justify-center gap-2 py-6" 
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut size={18} />
                Sign Out
              </Button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
