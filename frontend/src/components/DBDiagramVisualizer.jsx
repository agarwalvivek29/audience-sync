
import React, { useCallback } from 'react';
import ReactFlow, {
  ConnectionLineType,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const DBDiagramVisualizer = ({ schema }) => {
  const initialNodes = schema.tables.map((table, index) => ({
    id: table.name,
    type: 'default',
    data: { label: createTableLabel(table) },
    position: { x: index * 350, y: index * 200 },
  }));

  const initialEdges = schema.relationships.map((rel, index) => ({
    id: `e${index}`,
    source: rel.fromTable,
    target: rel.toTable,
    label: `${rel.fromField} → ${rel.toField}`,
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#1d4ed8', strokeWidth: 2 },
    labelStyle: { fill: '#0f172a', fontWeight: 'bold', fontSize: 12 },
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  function createTableLabel(table) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-lg shadow-lg text-white">
        <h3 className="font-bold text-lg mb-2">{table.name}</h3>
        <ul className="text-sm space-y-1">
          {table.fields.map((field, index) => (
            <li key={index} className="flex justify-between">
              <span>{field.name}</span>
              <span className="font-light">{field.type}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '700px',
        background: 'linear-gradient(120deg, #f3f4f6, #e5e7eb)',
        borderRadius: '8px',
        padding: '10px',
        boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Controls style={{ right: 15, bottom: 15 }} />
        <Background color="#e0e7ff" gap={20} />
      </ReactFlow>
    </div>
  );
};

export default DBDiagramVisualizer;
