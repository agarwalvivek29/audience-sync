import React, { useCallback } from 'react';
import ReactFlow, { ConnectionLineType, useNodesState, useEdgesState, Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const DBDiagramVisualizer = ({ schema }) => {
  const initialNodes = schema.tables.map((table, index) => ({
    id: table.name,
    type: 'default',
    data: { label: createTableLabel(table) },
    position: { x: index * 350, y: index * 100 },
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

  // function createTableLabel(table) {
  //   return (
  //     (<div className="bg-white p-2 rounded shadow">
  //       <h3 className="font-bold text-lg mb-2">{table.name}</h3>
  //       <ul className="text-sm no-wrap">
  //         {table.fields.map((field, index) => (
  //           <li key={index}>
  //             {field.name}: <span className="text-gray-600">{field.type}</span>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>)
  //   );
  // }

  // function createTableLabel(table) {
  //   return (
  //     <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
  //       <h3 className="font-semibold text-xl text-blue-600 mb-4">{table.name}</h3>
  //       <table className="w-full text-sm border-collapse">
  //         <thead>
  //           <tr className="bg-gray-100 border-b">
  //             <th className="text-left p-2 font-medium text-gray-700">Field Name</th>
  //             <th className="text-left p-2 font-medium text-gray-700">Data Type</th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {table.fields.map((field, index) => (
  //             <tr key={index} className="border-b hover:bg-gray-50">
  //               <td className="p-2 text-gray-800">{field.name}</td>
  //               <td className="p-2 text-gray-600">{field.type}</td>
  //             </tr>
  //           ))}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // }

  function createTableLabel(table) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200" style={{ width: '300px', height: 'auto' }}>
        <h3 className="font-semibold text-xl text-blue-600 mb-4">{table.name}</h3>
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="text-left p-2 font-medium text-gray-700">Field Name</th>
              <th className="text-left p-2 font-medium text-gray-700">Data Type</th>
            </tr>
          </thead>
          <tbody>
            {table.fields.map((field, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="p-2 text-gray-800">{field.name}</td>
                <td className="p-2 text-gray-600">{field.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    (<div style={{ width: '100%', height: '800px' }}>
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

