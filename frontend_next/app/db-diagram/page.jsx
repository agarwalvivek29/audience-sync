'use client'

import React from 'react';
import DBDiagramVisualizer from '../../components/DBDiagramVisualizer';

// This is a mock schema. In a real application, you would fetch this data from your database connector.
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
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Database Schema Diagram</h1>
      <DBDiagramVisualizer schema={mockSchema} />
    </div>)
  );
};

export default DBDiagramPage;

