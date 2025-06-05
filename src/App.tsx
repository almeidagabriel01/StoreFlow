import React, { useState } from 'react';
import './globals.css';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './components/auth/LoginPage';
import type { PageType } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      
      default:
        // Fallback to home page for unknown routes
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  );
};

export default App;