
import React from 'react';
import { ArrowUp, CircleArrowRight } from 'lucide-react';

interface ExperimentCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const ExperimentCard: React.FC<ExperimentCardProps> = ({
  title,
  description,
  icon,
  gradient,
  onClick,
  difficulty
}) => {
  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'text-green-600 bg-green-50';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-50';
      case 'Advanced': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div 
      className="neu-card p-6 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-quantum-glow group"
      onClick={onClick}
    >
      <div className="relative">
        <div className={`w-16 h-16 ${gradient} rounded-2xl flex items-center justify-center mb-4 animate-float`}>
          {icon}
        </div>
        
        <div className="absolute top-2 right-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-quantum-400 rounded-full animate-quantum-pulse"></div>
          <span className="text-xs text-gray-500">Interactive</span>
        </div>
        
        <CircleArrowRight className="w-5 h-5 text-quantum-600 group-hover:translate-x-1 transition-transform duration-200" />
      </div>
    </div>
  );
};

export default ExperimentCard;
