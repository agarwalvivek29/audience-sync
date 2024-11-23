import React, { useCallback } from 'react';
import ReactFlow, { ConnectionLineType, useNodesState, useEdgesState, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const DBDiagramVisualizer = ({ schema }) => {
  const initialNodes = schema.tables.map((table, index) => ({
    id: table.name,
    type: 'default',
    data: { label: createTableLabel(table) },
    position: { x: index * 250, y: index * 100 },
  }));

  const initialEdges = schema.relationships.map((rel, index) => ({
    id: `e${index}`,
    source: rel.fromTable,
    target: rel.toTable,
    label: `${rel.fromField} -> ${rel.toField}`,
    type: 'smoothstep',
    animated: true,
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  function createTableLabel(table) {
    return (
      (<div className="bg-white p-2 rounded shadow">
        <h3 className="font-bold text-lg mb-2">{table.name}</h3>
        <ul className="text-sm">
          {table.fields.map((field, index) => (
            <li key={index}>
              {field.name}: <span className="text-gray-600">{field.type}</span>
            </li>
          ))}
        </ul>
      </div>)
    );
  }

  return (
    (<div style={{ width: '100%', height: '600px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView>
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>)
  );
};

export default DBDiagramVisualizer;

