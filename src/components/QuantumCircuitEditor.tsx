
import React, { useState, useRef } from 'react';
import { Play, SquareX, SquareCheck, SquarePlus } from 'lucide-react';

interface Gate {
  id: string;
  type: 'H' | 'X' | 'Y' | 'Z' | 'CNOT';
  position: { x: number; y: number };
  qubit: number;
}

interface QuantumCircuitEditorProps {
  onSimulate: (gates: Gate[]) => void;
  isSimulating: boolean;
}

const QuantumCircuitEditor: React.FC<QuantumCircuitEditorProps> = ({
  onSimulate,
  isSimulating
}) => {
  const [gates, setGates] = useState<Gate[]>([]);
  const [draggedGate, setDraggedGate] = useState<string | null>(null);
  const circuitRef = useRef<HTMLDivElement>(null);

  const gateTypes = [
    { type: 'H' as const, name: 'Hadamard', color: 'bg-quantum-500' },
    { type: 'X' as const, name: 'Pauli-X', color: 'bg-red-500' },
    { type: 'Y' as const, name: 'Pauli-Y', color: 'bg-green-500' },
    { type: 'Z' as const, name: 'Pauli-Z', color: 'bg-blue-500' },
    { type: 'CNOT' as const, name: 'CNOT', color: 'bg-purple-500' },
  ];

  const handleDragStart = (gateType: Gate['type']) => {
    setDraggedGate(gateType);
  };

  const handleDrop = (e: React.DragEvent, qubit: number) => {
    e.preventDefault();
    if (!draggedGate) return;

    const rect = circuitRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = qubit * 80 + 40; // Align to qubit line

    const newGate: Gate = {
      id: `${draggedGate}-${Date.now()}`,
      type: draggedGate,
      position: { x, y },
      qubit
    };

    setGates(prev => [...prev, newGate]);
    setDraggedGate(null);
  };

  const removeGate = (gateId: string) => {
    setGates(prev => prev.filter(g => g.id !== gateId));
  };

  const clearCircuit = () => {
    setGates([]);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="neu-card p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 gradient-text">Quantum Circuit Editor</h3>
        
        {/* Gate Palette */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Available Gates</h4>
          <div className="flex flex-wrap gap-3">
            {gateTypes.map(gate => (
              <div
                key={gate.type}
                draggable
                onDragStart={() => handleDragStart(gate.type)}
                className={`quantum-gate ${gate.color} text-white px-4 py-2 rounded-lg text-sm font-mono cursor-move hover:scale-105 transition-transform`}
              >
                {gate.type}
              </div>
            ))}
          </div>
        </div>

        {/* Circuit Canvas */}
        <div className="quantum-circuit p-6 mb-6 circuit-grid min-h-[300px] relative"
             ref={circuitRef}>
          
          {/* Qubit Lines */}
          {[0, 1, 2].map(qubit => (
            <div
              key={qubit}
              className="circuit-line"
              style={{ top: `${qubit * 80 + 40}px` }}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, qubit)}
            >
              <div className="absolute -left-4 -top-3 text-sm font-medium text-quantum-700">
                |q{qubit}⟩
              </div>
            </div>
          ))}

          {/* Gates */}
          {gates.map(gate => (
            <div
              key={gate.id}
              className="absolute quantum-gate bg-white border-2 border-quantum-400 text-quantum-700 px-3 py-2 rounded-lg font-mono text-sm group"
              style={{ 
                left: gate.position.x - 20, 
                top: gate.position.y - 16,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {gate.type}
              <button
                onClick={() => removeGate(gate.id)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
            </div>
          ))}

          {/* Animation particles */}
          {isSimulating && (
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {[0, 1, 2].map(qubit => (
                <div
                  key={qubit}
                  className="absolute w-2 h-2 bg-quantum-400 rounded-full animate-circuit-flow"
                  style={{ top: `${qubit * 80 + 36}px` }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => onSimulate(gates)}
              disabled={isSimulating || gates.length === 0}
              className="neu-button px-6 py-3 bg-quantum-gradient text-white rounded-lg font-medium hover:shadow-quantum-glow transition-all duration-200 flex items-center space-x-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
            </button>
            
            <button
              onClick={clearCircuit}
              className="neu-button px-4 py-3 text-gray-600 rounded-lg hover:text-red-600 transition-colors flex items-center space-x-2"
            >
              <SquareX className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Gates: {gates.length} | Qubits: 3
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCircuitEditor;
