
import React from 'react';
import Navigation from '../components/Navigation';
import ExperimentCard from '../components/ExperimentCard';

const Index = () => {
  const experiments = [
    {
      id: 'entanglement',
      title: 'Quantum Entanglement',
      description: 'Explore the mysterious connection between particles that Einstein called "spooky action at a distance"',
      icon: <div className="text-white text-2xl">🔗</div>,
      gradient: 'bg-quantum-gradient',
      difficulty: 'Beginner' as const
    },
    {
      id: 'superposition',
      title: 'Quantum Superposition',
      description: 'Discover how quantum particles can exist in multiple states simultaneously',
      icon: <div className="text-white text-2xl">⚛️</div>,
      gradient: 'bg-neural-gradient',
      difficulty: 'Beginner' as const
    },
    {
      id: 'teleportation',
      title: 'Quantum Teleportation',
      description: 'Learn how quantum information can be transmitted instantaneously across vast distances',
      icon: <div className="text-white text-2xl">🌌</div>,
      gradient: 'bg-cosmos-gradient',
      difficulty: 'Intermediate' as const
    },
    {
      id: 'gates',
      title: 'Quantum Gates',
      description: 'Build quantum circuits using fundamental gates like Hadamard, Pauli-X, and CNOT',
      icon: <div className="text-white text-2xl">⚡</div>,
      gradient: 'bg-gradient-to-br from-purple-500 to-pink-500',
      difficulty: 'Intermediate' as const
    },
    {
      id: 'algorithms',
      title: 'Quantum Algorithms',
      description: 'Implement famous algorithms like Grover\'s search and Shor\'s factoring',
      icon: <div className="text-white text-2xl">🧮</div>,
      gradient: 'bg-gradient-to-br from-green-500 to-teal-500',
      difficulty: 'Advanced' as const
    },
    {
      id: 'cryptography',
      title: 'Quantum Cryptography',
      description: 'Understand quantum key distribution and unbreakable quantum encryption',
      icon: <div className="text-white text-2xl">🔐</div>,
      gradient: 'bg-gradient-to-br from-red-500 to-orange-500',
      difficulty: 'Advanced' as const
    }
  ];

  const handleExperimentClick = (experimentId: string) => {
    console.log(`Starting experiment: ${experimentId}`);
    // Here we would typically navigate to the experiment page or open a modal
    // For now, we'll log the action
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 quantum-bg">
      <Navigation />
      
      <div className="pt-20 pb-16 px-4">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Explore the Quantum Universe
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
              Discover the fascinating world of quantum physics through interactive experiments 
              and visualizations. No physics degree required - just curiosity!
            </p>
            
            <div className="flex items-center justify-center space-x-4 mb-12">
              <div className="neu-card px-6 py-3 rounded-full">
                <span className="text-sm text-gray-600">✨ Interactive Learning</span>
              </div>
              <div className="neu-card px-6 py-3 rounded-full">
                <span className="text-sm text-gray-600">🎯 Beginner Friendly</span>
              </div>
              <div className="neu-card px-6 py-3 rounded-full">
                <span className="text-sm text-gray-600">🚀 Real Quantum Concepts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Experiments Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Choose Your Quantum Adventure</h2>
            <p className="text-gray-600 text-lg">Each experiment includes guided learning and hands-on interaction</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experiments.map((experiment, index) => (
              <div 
                key={experiment.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ExperimentCard
                  title={experiment.title}
                  description={experiment.description}
                  icon={experiment.icon}
                  gradient={experiment.gradient}
                  difficulty={experiment.difficulty}
                  onClick={() => handleExperimentClick(experiment.id)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-6xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Quantum Dreamscape Labs?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="learning-card text-center">
              <div className="w-16 h-16 bg-quantum-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float">
                <span className="text-white text-2xl">🎓</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn by Doing</h3>
              <p className="text-gray-600">
                Interactive experiments let you manipulate quantum circuits and see real-time results
              </p>
            </div>
            
            <div className="learning-card text-center">
              <div className="w-16 h-16 bg-neural-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '1s' }}>
                <span className="text-white text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Beautiful Visualizations</h3>
              <p className="text-gray-600">
                Complex quantum concepts explained through stunning animations and graphics
              </p>
            </div>
            
            <div className="learning-card text-center">
              <div className="w-16 h-16 bg-cosmos-gradient rounded-2xl flex items-center justify-center mx-auto mb-4 animate-float" style={{ animationDelay: '2s' }}>
                <span className="text-white text-2xl">🔬</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Real Science</h3>
              <p className="text-gray-600">
                Based on actual quantum physics principles used in modern quantum computing
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
