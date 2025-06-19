
import React from 'react';
import { Home, BookOpen, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleLearnClick = () => {
    // 향후 학습 페이지로 이동할 수 있도록 준비
    console.log('Learn page coming soon!');
  };

  const handleSettingsClick = () => {
    // 향후 설정 페이지로 이동할 수 있도록 준비
    console.log('Settings page coming soon!');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={handleHomeClick}
          >
            <div className="w-8 h-8 bg-quantum-gradient rounded-lg shadow-quantum-glow animate-quantum-pulse"></div>
            <h1 className="text-xl font-bold gradient-text">Quantum Dreamscape Labs</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className={`neu-button p-2 rounded-lg transition-colors ${
                location.pathname === '/' ? 'bg-quantum-100' : ''
              }`}
              onClick={handleHomeClick}
            >
              <Home className="w-5 h-5 text-quantum-600" />
            </button>
            <button 
              className="neu-button p-2 rounded-lg"
              onClick={handleLearnClick}
            >
              <BookOpen className="w-5 h-5 text-quantum-600" />
            </button>
            <button 
              className="neu-button p-2 rounded-lg"
              onClick={handleSettingsClick}
            >
              <Settings className="w-5 h-5 text-quantum-600" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
