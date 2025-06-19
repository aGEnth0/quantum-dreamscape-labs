
import React, { useState } from 'react';
import { ArrowUp, CircleCheck, Play } from 'lucide-react';

interface LearningStep {
  id: number;
  title: string;
  content: string;
  visual: string;
  completed: boolean;
}

interface LearningSectionProps {
  experimentTitle: string;
  steps: LearningStep[];
  onComplete: () => void;
}

const LearningSection: React.FC<LearningSectionProps> = ({ 
  experimentTitle, 
  steps, 
  onComplete 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleStepComplete = () => {
    const newCompleted = new Set(completedSteps);
    newCompleted.add(currentStep);
    setCompletedSteps(newCompleted);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold gradient-text mb-2">
          Understanding {experimentTitle}
        </h2>
        <p className="text-gray-600">Let's learn the concepts before experimenting</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${index === currentStep 
                  ? 'bg-quantum-gradient text-white shadow-quantum-glow' 
                  : completedSteps.has(index)
                  ? 'bg-green-500 text-white'
                  : 'neu-card text-gray-400'
                }
              `}>
                {completedSteps.has(index) ? (
                  <CircleCheck className="w-5 h-5" />
                ) : (
                  <span className="font-medium">{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 transition-colors duration-300 ${
                  completedSteps.has(index) ? 'bg-green-400' : 'bg-gray-300'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="learning-card max-w-2xl mx-auto animate-fade-in">
        <div className="mb-6">
          <div className={`w-full h-48 ${currentStepData.visual} rounded-lg mb-4 flex items-center justify-center`}>
            <div className="text-white text-6xl animate-float">
              {currentStep === 0 && '⚛️'}
              {currentStep === 1 && '🔗'}
              {currentStep === 2 && '📊'}
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            {currentStepData.title}
          </h3>
          
          <p className="text-gray-600 leading-relaxed">
            {currentStepData.content}
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
          
          <button
            onClick={handleStepComplete}
            className="neu-button px-6 py-3 bg-quantum-gradient text-white rounded-lg font-medium hover:shadow-quantum-glow transition-all duration-200 flex items-center space-x-2"
          >
            <span>{currentStep === steps.length - 1 ? 'Start Experiment' : 'Next'}</span>
            <ArrowUp className="w-4 h-4 rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningSection;
