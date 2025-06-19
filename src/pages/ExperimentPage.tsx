
import React, { useState } from 'react';
import { ArrowUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import LearningSection from '../components/LearningSection';
import QuantumCircuitEditor from '../components/QuantumCircuitEditor';
import ResultVisualization from '../components/ResultVisualization';

interface Gate {
  id: string;
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT';
  position: { x: number; y: number };
  qubit: number;
}

const ExperimentPage = () => {
  const [currentPhase, setCurrentPhase] = useState<'learning' | 'experiment' | 'results'>('learning');
  const [gates, setGates] = useState<Gate[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);

  const learningSteps = [
    {
      id: 1,
      title: "Quantum Superposition",
      content: "In quantum mechanics, particles can exist in multiple states simultaneously. This is called superposition. Unlike classical bits that are either 0 or 1, quantum bits (qubits) can be both 0 and 1 at the same time, creating infinite possibilities.",
      visual: "bg-quantum-gradient",
      completed: false
    },
    {
      id: 2,
      title: "Quantum Entanglement",
      content: "When two qubits become entangled, measuring one instantly affects the other, regardless of distance. This 'spooky action at a distance' as Einstein called it, is fundamental to quantum computing and enables powerful parallel processing.",
      visual: "bg-neural-gradient",
      completed: false
    },
    {
      id: 3,
      title: "Quantum Gates & Circuits",
      content: "Quantum gates manipulate qubits like logic gates manipulate classical bits. By combining different gates in a quantum circuit, we can perform complex quantum algorithms and harness the power of quantum computation.",
      visual: "bg-cosmos-gradient",
      completed: false
    }
  ];

  const handleLearningComplete = () => {
    setCurrentPhase('experiment');
  };

  const handleSimulation = (circuitGates: Gate[]) => {
    setGates(circuitGates);
    setIsSimulating(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsSimulating(false);
      setCurrentPhase('results');
    }, 2000);
  };

  const resetExperiment = () => {
    setCurrentPhase('learning');
    setGates([]);
    setIsSimulating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 quantum-bg">
      <Navigation />
      
      <div className="pt-20 pb-8">
        {/* Phase Indicator */}
        <div className="max-w-4xl mx-auto px-4 mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[
              { key: 'learning', label: 'Learn', icon: '📚' },
              { key: 'experiment', label: 'Experiment', icon: '⚗️' },
              { key: 'results', label: 'Results', icon: '📊' }
            ].map((phase, index) => (
              <div key={phase.key} className="flex items-center">
                <div className={`
                  w-12 h-12 rounded-full flex items-center justify-center text-lg transition-all duration-300
                  ${currentPhase === phase.key 
                    ? 'bg-quantum-gradient text-white shadow-quantum-glow' 
                    : 'neu-card text-gray-400'
                  }
                `}>
                  {phase.icon}
                </div>
                <span className={`ml-2 font-medium ${
                  currentPhase === phase.key ? 'text-quantum-600' : 'text-gray-400'
                }`}>
                  {phase.label}
                </span>
                {index < 2 && (
                  <ArrowUp className="w-4 h-4 text-gray-300 mx-4 rotate-90" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content Phases */}
        {currentPhase === 'learning' && (
          <LearningSection
            experimentTitle="Quantum Entanglement"
            steps={learningSteps}
            onComplete={handleLearningComplete}
          />
        )}

        {currentPhase === 'experiment' && (
          <QuantumCircuitEditor
            onSimulate={handleSimulation}
            isSimulating={isSimulating}
          />
        )}

        {currentPhase === 'results' && (
          <div>
            <ResultVisualization gates={gates} isVisible={true} />
            <div className="flex justify-center mt-8">
              <button
                onClick={resetExperiment}
                className="neu-button px-8 py-3 bg-neural-gradient text-white rounded-lg font-medium hover:shadow-neural-glow transition-all duration-200"
              >
                Try Another Experiment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperimentPage;
