"use client";

import { useCallback, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import AutomataNode from "./AutomataNode";

interface DiagramCanvasProps {
  data: {
    nodes: any[];
    edges: any[];
  };
}

export default function DiagramCanvas({ data }: DiagramCanvasProps) {
  const nodeTypes = useMemo(() => ({ automata: AutomataNode }), []);
  
  // Add default edge styling with better visibility
  const edgesWithStyle = data.edges.map((edge: any) => ({
    ...edge,
    type: edge.type || 'smoothstep',
    animated: true,
    style: { 
      stroke: '#1E40AF', 
      strokeWidth: 3,
    },
    labelStyle: { 
      fill: '#1F2937', 
      fontWeight: 700,
      fontSize: 14,
    },
    labelBgStyle: { 
      fill: '#FFFFFF',
      fillOpacity: 0.9,
      rx: 4,
      ry: 4,
    },
    labelBgPadding: [8, 4],
    markerEnd: {
      type: 'arrowclosed',
      color: '#1E40AF',
      width: 25,
      height: 25,
    },
  }));
  
  const [nodes, setNodes, onNodesChange] = useNodesState(data.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesWithStyle);

  const onConnect = useCallback(
    (params: Connection | Edge) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Diagram Automata
        </h2>
        <div className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded">
          Pinch to zoom
        </div>
      </div>
      <div className="h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] border-2 border-gray-300 rounded-lg bg-gradient-to-br from-gray-50 to-blue-50 touch-none">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, minZoom: 0.3, maxZoom: 1 }}
          defaultEdgeOptions={{
            animated: true,
          }}
          minZoom={0.2}
          maxZoom={2}
          panOnScroll={false}
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={false}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
