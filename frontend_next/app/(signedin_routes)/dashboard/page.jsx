'use client'

import React from 'react';
import DBDiagramVisualizer from '@/components/DBDiagramVisualizer';
import { onboardingActions } from '@/lib/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

// This is a mock schema. In a real application, you would fetch this data from your database connector.
const mockSchema = {
  tables: [
    {
      name: 'Users',
      fields: [
        { name: 'user_id', type: 'uuid' },
        { name: 'name', type: 'varchar' },
        { name: 'email', type: 'varchar' },
        { name: 'phone_number', type: 'varchar' },
        { name: 'location', type: 'json' },
        { name: 'preferences', type: 'json' },
        { name: 'created_at', type: 'timestamp' },
        { name: 'last_active', type: 'timestamp' },
        { name: 'tags', type: 'json' },
        { name: 'total_orders', type: 'integer' },
      ],
    },
    {
      name: 'Restaurants',
      fields: [
        { name: 'restaurant_id', type: 'uuid' },
        { name: 'name', type: 'varchar' },
        { name: 'cuisine', type: 'json' },
        { name: 'location', type: 'json' },
        { name: 'average_cost_for_two', type: 'float' },
        { name: 'rating', type: 'float' },
        { name: 'tags', type: 'json' },
        { name: 'menu_items_count', type: 'integer' },
        { name: 'created_at', type: 'timestamp' },
        { name: 'last_active', type: 'timestamp' },
      ],
    },
    {
      name: 'MenuItems',
      fields: [
        { name: 'menu_item_id', type: 'uuid' },
        { name: 'restaurant_id', type: 'uuid' },
        { name: 'name', type: 'varchar' },
        { name: 'price', type: 'float' },
        { name: 'category', type: 'varchar' },
        { name: 'tags', type: 'json' },
        { name: 'availability_status', type: 'boolean' },
      ],
    },
    {
      name: 'Orders',
      fields: [
        { name: 'order_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
        { name: 'restaurant_id', type: 'uuid' },
        { name: 'menu_items', type: 'json' },
        { name: 'total_amount', type: 'float' },
        { name: 'status', type: 'varchar' },
        { name: 'created_at', type: 'timestamp' },
        { name: 'updated_at', type: 'timestamp' },
      ],
    },
    {
      name: 'Events',
      fields: [
        { name: 'event_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
        { name: 'event_type', type: 'varchar' },
        { name: 'event_details', type: 'json' },
        { name: 'timestamp', type: 'timestamp' },
      ],
    },
    {
      name: 'SearchQueries',
      fields: [
        { name: 'search_id', type: 'uuid' },
        { name: 'user_id', type: 'uuid' },
        { name: 'query', type: 'varchar' },
        { name: 'result_count', type: 'integer' },
        { name: 'timestamp', type: 'timestamp' },
      ],
    },
  ],
  relationships: [
    { fromTable: 'MenuItems', toTable: 'Restaurants', fromField: 'restaurant_id', toField: 'restaurant_id' },
    { fromTable: 'Orders', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
    { fromTable: 'Orders', toTable: 'Restaurants', fromField: 'restaurant_id', toField: 'restaurant_id' },
    { fromTable: 'Events', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
    { fromTable: 'SearchQueries', toTable: 'Users', fromField: 'user_id', toField: 'user_id' },
  ],
};

const DBDiagramPage = () => {
  const dispatch = useDispatch();
  const { isSignedIn, userId } = useAuth();

  useEffect(()=>{
    if(isSignedIn){
      if(userId){
        console.log(userId);
        dispatch(onboardingActions.setUserId(userId));
        dispatch(onboardingActions.setSchema(mockSchema));
      }
      console.log(userId);
    }
  },[userId]);

  return (
    (<div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Database Schema Diagram</h1>
      <DBDiagramVisualizer schema={mockSchema} />
    </div>)
  );
};

export default DBDiagramPage;

