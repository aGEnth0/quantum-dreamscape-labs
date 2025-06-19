
import React, { useState, useRef } from 'react';
import { Play, SquareX, RotateCcw } from 'lucide-react';

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
  const [draggedGate, setDraggedGate] = useState<Gate['type'] | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const circuitRef = useRef<HTMLDivElement>(null);

  const gateTypes = [
    { type: 'H' as const, name: 'Hadamard', color: 'bg-quantum-500', description: 'Creates superposition' },
    { type: 'X' as const, name: 'Pauli-X', color: 'bg-red-500', description: 'Bit flip gate' },
    { type: 'Y' as const, name: 'Pauli-Y', color: 'bg-green-500', description: 'Y rotation gate' },
    { type: 'Z' as const, name: 'Pauli-Z', color: 'bg-blue-500', description: 'Phase flip gate' },
    { type: 'CNOT' as const, name: 'CNOT', color: 'bg-purple-500', description: 'Controlled NOT gate' },
  ];

  const handleDragStart = (e: React.DragEvent, gateType: Gate['type']) => {
    setDraggedGate(gateType);
    setIsDragging(true);
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragEnd = () => {
    setDraggedGate(null);
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e: React.DragEvent, qubit: number) => {
    e.preventDefault();
    if (!draggedGate) return;

    const rect = circuitRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.max(60, e.clientX - rect.left);
    const y = qubit * 80 + 40;

    // 기존 게이트와 너무 가까우면 스냅하기
    const snapDistance = 40;
    let snappedX = x;
    
    gates.forEach(gate => {
      if (Math.abs(gate.position.x - x) < snapDistance && gate.qubit === qubit) {
        snappedX = gate.position.x + snapDistance;
      }
    });

    const newGate: Gate = {
      id: `${draggedGate}-${Date.now()}-${Math.random()}`,
      type: draggedGate,
      position: { x: snappedX, y },
      qubit
    };

    setGates(prev => [...prev, newGate]);
    setDraggedGate(null);
    setIsDragging(false);
  };

  const removeGate = (gateId: string) => {
    setGates(prev => prev.filter(g => g.id !== gateId));
  };

  const clearCircuit = () => {
    setGates([]);
  };

  const canRunSimulation = gates.length > 0 && !isSimulating;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="neu-card p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4 gradient-text">Quantum Circuit Editor</h3>
        
        {/* Gate Palette */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Available Gates</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {gateTypes.map(gate => (
              <div
                key={gate.type}
                draggable
                onDragStart={(e) => handleDragStart(e, gate.type)}
                onDragEnd={handleDragEnd}
                className={`quantum-gate ${gate.color} text-white px-4 py-3 rounded-lg text-sm font-mono cursor-move hover:scale-105 transition-all duration-200 ${
                  isDragging && draggedGate === gate.type ? 'opacity-50 scale-95' : ''
                }`}
                title={gate.description}
              >
                <div className="text-center">
                  <div className="font-bold">{gate.type}</div>
                  <div className="text-xs opacity-90 mt-1">{gate.name}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Drag gates onto the quantum circuit below to build your experiment
          </p>
        </div>

        {/* Circuit Canvas */}
        <div 
          className="quantum-circuit p-6 mb-6 circuit-grid min-h-[320px] relative border-2 border-dashed border-quantum-200 rounded-lg"
          ref={circuitRef}
          onDragOver={handleDragOver}
        >
          
          {/* Qubit Lines */}
          {[0, 1, 2].map(qubit => (
            <div
              key={qubit}
              className="circuit-line"
              style={{ top: `${qubit * 80 + 40}px` }}
              onDrop={(e) => handleDrop(e, qubit)}
              onDragOver={handleDragOver}
            >
              <div className="absolute -left-6 -top-3 text-sm font-medium text-quantum-700 bg-white px-2 py-1 rounded">
                |q{qubit}⟩
              </div>
            </div>
          ))}

          {/* Gates */}
          {gates.map(gate => (
            <div
              key={gate.id}
              className="absolute quantum-gate bg-white border-2 border-quantum-400 text-quantum-700 px-3 py-2 rounded-lg font-mono text-sm group cursor-pointer hover:shadow-quantum-glow transition-all"
              style={{ 
                left: gate.position.x - 20, 
                top: gate.position.y - 16,
                transform: 'translate(-50%, -50%)'
              }}
            >
              {gate.type}
              <button
                onClick={() => removeGate(gate.id)}
                className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}

          {/* Empty state */}
          {gates.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <p>Drag gates here to build your quantum circuit</p>
              </div>
            </div>
          )}

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
              disabled={!canRunSimulation}
              className={`neu-button px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                canRunSimulation 
                  ? 'bg-quantum-gradient text-white hover:shadow-quantum-glow' 
                  : 'opacity-50 cursor-not-allowed text-gray-500'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>{isSimulating ? 'Simulating...' : 'Run Simulation'}</span>
            </button>
            
            <button
              onClick={clearCircuit}
              disabled={gates.length === 0}
              className={`neu-button px-4 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                gates.length > 0 
                  ? 'text-gray-600 hover:text-red-600' 
                  : 'text-gray-400 cursor-not-allowed'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear</span>
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Gates: {gates.length} | Qubits: 3 | Status: {isSimulating ? 'Running' : 'Ready'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumCircuitEditor;
