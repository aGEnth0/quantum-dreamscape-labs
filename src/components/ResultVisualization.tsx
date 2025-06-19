
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Gate {
  id: string;
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT';
  position: { x: number; y: number };
  qubit: number;
}

interface ResultVisualizationProps {
  gates: Gate[];
  isVisible: boolean;
}

const ResultVisualization: React.FC<ResultVisualizationProps> = ({ gates, isVisible }) => {
  // Simulate quantum measurement results based on gates
  const generateResults = () => {
    const hasHadamard = gates.some(g => g.type === 'H');
    const hasEntanglement = gates.some(g => g.type === 'CNOT');
    
    if (hasHadamard && hasEntanglement) {
      return [
        { state: '|000⟩', probability: 0.5, amplitude: Math.sqrt(0.5) },
        { state: '|111⟩', probability: 0.5, amplitude: Math.sqrt(0.5) },
      ];
    } else if (hasHadamard) {
      return [
        { state: '|000⟩', probability: 0.5, amplitude: Math.sqrt(0.5) },
        { state: '|001⟩', probability: 0.25, amplitude: Math.sqrt(0.25) },
        { state: '|010⟩', probability: 0.125, amplitude: Math.sqrt(0.125) },
        { state: '|011⟩', probability: 0.125, amplitude: Math.sqrt(0.125) },
      ];
    } else {
      return [
        { state: '|000⟩', probability: 1.0, amplitude: 1.0 },
      ];
    }
  };

  const results = generateResults();
  const COLORS = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];

  if (!isVisible) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Probability Distribution */}
        <div className="neu-card p-6">
          <h3 className="text-lg font-semibold mb-4 gradient-text">State Probabilities</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={results}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e9ff" />
              <XAxis 
                dataKey="state" 
                tick={{ fontSize: 12, fontFamily: 'JetBrains Mono' }}
                stroke="#667eea"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                stroke="#667eea"
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #667eea',
                  borderRadius: '8px',
                  fontFamily: 'JetBrains Mono'
                }}
              />
              <Bar 
                dataKey="probability" 
                fill="url(#quantumGradient)"
                radius={[4, 4, 0, 0]}
              />
              <defs>
                <linearGradient id="quantumGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quantum State Visualization */}
        <div className="neu-card p-6">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Quantum States</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={results}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="probability"
                label={({ state, probability }) => `${state}: ${(probability * 100).toFixed(1)}%`}
                labelLine={false}
              >
                {results.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Probability']}
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #667eea',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Amplitude Analysis */}
        <div className="neu-card p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 gradient-text">Quantum Amplitude Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {results.map((result, index) => (
              <div key={result.state} className="learning-card text-center">
                <div className="text-2xl font-mono mb-2 text-quantum-700">{result.state}</div>
                <div className="text-sm text-gray-600 mb-2">
                  Amplitude: {result.amplitude.toFixed(3)}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-quantum-gradient h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${result.probability * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {(result.probability * 100).toFixed(1)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultVisualization;
