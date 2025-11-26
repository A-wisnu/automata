"use client";

import { Handle, Position } from "reactflow";

interface AutomataNodeProps {
  data: {
    label: string;
    isInitial?: boolean;
    isFinal?: boolean;
  };
}

export default function AutomataNode({ data }: AutomataNodeProps) {
  return (
    <div className="relative" style={{ width: '100px', height: '100px' }}>
      {/* Handles for all directions - positioned outside the circles */}
      <Handle 
        type="target" 
        position={Position.Top} 
        className="w-3 h-3 bg-indigo-600"
        style={{ top: '-5px' }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-3 h-3 bg-indigo-600"
        style={{ left: '-5px' }}
      />
      <Handle 
        type="target" 
        position={Position.Right} 
        className="w-3 h-3 bg-indigo-600"
        style={{ right: '-5px' }}
      />
      <Handle 
        type="target" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-indigo-600"
        style={{ bottom: '-5px' }}
      />
      
      {/* Initial state arrow */}
      {data.isInitial && (
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 z-20">
          <svg width="60" height="30" className="overflow-visible">
            <defs>
              <marker
                id="arrowhead-initial"
                markerWidth="12"
                markerHeight="12"
                refX="10"
                refY="4"
                orient="auto"
              >
                <polygon points="0 0, 12 4, 0 8" fill="#1E40AF" />
              </marker>
            </defs>
            <line
              x1="0"
              y1="15"
              x2="55"
              y2="15"
              stroke="#1E40AF"
              strokeWidth="3"
              markerEnd="url(#arrowhead-initial)"
            />
          </svg>
        </div>
      )}

      {/* Container for circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Outer circle for final states (larger) */}
        {data.isFinal && (
          <div className="absolute flex items-center justify-center">
            <div className="w-[90px] h-[90px] rounded-full border-[3px] border-indigo-700"></div>
          </div>
        )}

        {/* Inner circle for final states (smaller) */}
        {data.isFinal && (
          <div className="absolute flex items-center justify-center">
            <div className="w-[75px] h-[75px] rounded-full border-[3px] border-indigo-700 bg-white"></div>
          </div>
        )}

        {/* Main circle (for all states) */}
        <div
          className={`${data.isFinal ? 'w-[75px] h-[75px]' : 'w-[80px] h-[80px]'} rounded-full border-[3px] border-indigo-700 bg-white flex items-center justify-center shadow-xl relative z-10`}
        >
          <span className="text-lg font-bold text-indigo-900 text-center px-2 break-words">
            {data.label}
          </span>
        </div>
      </div>

      {/* Source handles */}
      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="w-3 h-3 bg-indigo-600"
        style={{ bottom: '-5px' }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-3 h-3 bg-indigo-600"
        style={{ right: '-5px' }}
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        className="w-3 h-3 bg-indigo-600"
        style={{ left: '-5px' }}
      />
      <Handle 
        type="source" 
        position={Position.Top} 
        className="w-3 h-3 bg-indigo-600"
        style={{ top: '-5px' }}
      />
    </div>
  );
}
