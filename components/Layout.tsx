import React, { ReactNode } from 'react';
import { Flower } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-orange-50 text-orange-950 font-sans flex flex-col items-center">
      {/* Header */}
      <header className="w-full bg-gradient-to-r from-orange-500 to-red-600 shadow-lg sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 text-white">
            <Flower className="w-6 h-6 animate-pulse" />
            <h1 className="text-xl font-bold tracking-wide">Japam Sadhana</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-4xl flex-1 p-4 md:p-6 pb-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="w-full bg-orange-100 py-6 mt-auto border-t border-orange-200">
        <div className="text-center text-orange-700 text-sm">
          <p>© {new Date().getFullYear()} Japam Sadhana</p>
          <p className="text-xs mt-1 opacity-75">ఓం శాంతిః శాంతిః శాంతిః</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
