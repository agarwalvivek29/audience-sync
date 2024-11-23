
import React from 'react';
import DBDiagramVisualizer from '../components/DBDiagramVisualizer';

const mockSchema = {
  tables: [
    {
      name: 'Users',
      fields: [
        { name: 'id', type: 'uuid' },
        { name: 'username', type: 'varchar' },
        { name: 'email', type: 'varchar' },
      ],
    },
    {
      name: 'Posts',
      fields: [
        { name: 'id', type: 'uuid' },
        { name: 'title', type: 'varchar' },
        { name: 'content', type: 'text' },
        { name: 'author_id', type: 'uuid' },
      ],
    },
    {
      name: 'Comments',
      fields: [
        { name: 'id', type: 'uuid' },
        { name: 'content', type: 'text' },
        { name: 'post_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
      ],
    },
  ],
  relationships: [
    { fromTable: 'Posts', toTable: 'Users', fromField: 'author_id', toField: 'id' },
    { fromTable: 'Comments', toTable: 'Posts', fromField: 'post_id', toField: 'id' },
    { fromTable: 'Comments', toTable: 'Users', fromField: 'user_id', toField: 'id' },
  ],
};

const DBDiagramPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <main className="p-8 flex justify-center items-center">
        <div className="w-full max-w-7xl">
          <DBDiagramVisualizer schema={mockSchema} />
        </div>
      </main>
      <footer className="mt-auto py-4 bg-gray-800 text-gray-300 text-center">
        <p>
          Built with <span className="text-blue-400 font-bold">ReactFlow</span> and{' '}
          <span className="text-purple-400 font-bold">React</span>
        </p>
      </footer>
    </div>
  );
};

export default DBDiagramPage;
