'use client'

import { useState, useReducer } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { X, Plus, ArrowRight } from 'lucide-react'
import { useSelector } from 'react-redux'

function queryReducer(state, action) {
  switch (action.type) {
    case 'ADD_TABLE':
      if (state.selectedTables.includes(action.tableName)) {
        return state;
      }
      return {
        ...state,
        selectedTables: [...state.selectedTables, action.tableName],
        conditions: { ...state.conditions, [action.tableName]: [] },
      };
    case 'REMOVE_TABLE':
      const { [action.tableName]: _, ...remainingConditions } = state.conditions;
      return {
        ...state,
        selectedTables: state.selectedTables.filter(t => t !== action.tableName),
        conditions: remainingConditions,
        joins: state.joins.filter(j => j.from !== action.tableName && j.to !== action.tableName),
      };
    case 'TOGGLE_TABLE':
      if (state.selectedTables.includes(action.tableName)) {
        return queryReducer(state, { type: 'REMOVE_TABLE', tableName: action.tableName });
      } else {
        return queryReducer(state, { type: 'ADD_TABLE', tableName: action.tableName });
      }
    case 'UPDATE_CONDITION':
      const updatedConditions = [...state.conditions[action.tableName]];
      updatedConditions[action.index] = action.condition;
      return {
        ...state,
        conditions: {
          ...state.conditions,
          [action.tableName]: updatedConditions,
        },
      };
    case 'ADD_CONDITION':
      return {
        ...state,
        conditions: {
          ...state.conditions,
          [action.tableName]: [
            ...state.conditions[action.tableName],
            { field: '', operator: '', value: '' }
          ],
        },
      };
    case 'REMOVE_CONDITION':
      return {
        ...state,
        conditions: {
          ...state.conditions,
          [action.tableName]: state.conditions[action.tableName].filter((_, i) => i !== action.index),
        },
      };
    case 'UPDATE_JOIN':
      const updatedJoins = [...state.joins];
      updatedJoins[action.index] = action.join;
      return { ...state, joins: updatedJoins };
    case 'ADD_JOIN':
      return {
        ...state,
        joins: [
          ...state.joins,
          { from: '', to: '', fromField: '', toField: '' }
        ],
      };
    case 'REMOVE_JOIN':
      return {
        ...state,
        joins: state.joins.filter((_, i) => i !== action.index),
      };
    default:
      return state;
  }
}

export default function VisualQueryEditor() {
  const Schema = useSelector(state=> state.onboarding.schema);
  const [queryState, dispatch] = useReducer(queryReducer, {
    selectedTables: [],
    conditions: {},
    joins: [],
  });
  const [queryResult, setQueryResult] = useState('');

  const getAvailableJoinFields = (tableName) => {
    const table = Schema?.tables.find(t => t.name === tableName);
    return table ? table.fields : [];
  };

  const handleTableToggle = (tableName) => {
    dispatch({ type: 'TOGGLE_TABLE', tableName });
  };

  const generateSQLQuery = () => {
    if (queryState.selectedTables.length === 0) return '';
    console.log(queryState);
    const selectedTables = queryState.selectedTables.join(', ');
    let query = `SELECT * FROM ${queryState.selectedTables[0]}`;

    // Add joins
    queryState.joins.forEach(join => {
      if (join.from && join.to && join.fromField && join.toField) {
        query += `\nJOIN ${join.to} ON ${join.from}.${join.fromField} = ${join.to}.${join.toField}`;
      }
    });

    // Add conditions
    const allConditions = [];
    Object.entries(queryState.conditions).forEach(([tableName, conditions]) => {
      conditions.forEach(condition => {
        if (condition.field && condition.operator && condition.value) {
          allConditions.push(
            `${tableName}.${condition.field} ${condition.operator} '${condition.value}'`
          );
        }
      });
    });

    if (allConditions.length > 0) {
      query += `\nWHERE ${allConditions.join(' AND ')}`;
    }

    return query;
  };

  const executeQuery = () => {
    const sqlQuery = generateSQLQuery();
    setQueryResult(sqlQuery);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Visual Query Editor</CardTitle>
      </CardHeader>
      <CardContent>
        {<div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <Label className="text-lg font-semibold mb-4 block">Available Tables</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Schema?.tables.map((table) => (
                <div
                  key={table.name}
                  className="flex items-start space-x-3 p-3 bg-background rounded-md border"
                >
                  <Checkbox
                    id={`table-${table.name}`}
                    checked={queryState.selectedTables.includes(table.name)}
                    onCheckedChange={() => handleTableToggle(table.name)}
                  />
                  <div className="space-y-1">
                    <Label
                      htmlFor={`table-${table.name}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {table.name}
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      {table.fields.map(f => f.name).join(', ')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {queryState.selectedTables.map((tableName) => (
            <Card key={tableName} className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{tableName}</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => dispatch({ type: 'REMOVE_TABLE', tableName })}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {queryState.conditions[tableName]?.map((condition, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Select
                    value={condition.field}
                    onValueChange={(value) => dispatch({
                      type: 'UPDATE_CONDITION',
                      tableName,
                      index,
                      condition: { ...condition, field: value }
                    })}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Select field" />
                    </SelectTrigger>
                    <SelectContent>
                      {Schema?.tables.find(t => t.name === tableName)?.fields.map((field) => (
                        <SelectItem key={field.name} value={field.name}>
                          {field.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={condition.operator}
                    onValueChange={(value) => dispatch({
                      type: 'UPDATE_CONDITION',
                      tableName,
                      index,
                      condition: { ...condition, operator: value }
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Operator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="=">=</SelectItem>
                      <SelectItem value="<">{'<'}</SelectItem>
                      <SelectItem value=">">{'>'}</SelectItem>
                      <SelectItem value="LIKE">LIKE</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    value={condition.value}
                    onChange={(e) => dispatch({
                      type: 'UPDATE_CONDITION',
                      tableName,
                      index,
                      condition: { ...condition, value: e.target.value }
                    })}
                    placeholder="Value"
                    className="w-40"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => dispatch({ type: 'REMOVE_CONDITION', tableName, index })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch({ type: 'ADD_CONDITION', tableName })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Condition
              </Button>
            </Card>
          ))}
    {queryState.selectedTables.length > 1 && (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-2">Joins</h3>
              {queryState.joins.map((join, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Select
                    value={join.from}
                    onValueChange={(value) => dispatch({
                      type: 'UPDATE_JOIN',
                      index,
                      join: { ...join, from: value, fromField: '' }
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="From Table" />
                    </SelectTrigger>
                    <SelectContent>
                      {queryState.selectedTables.map((table) => (
                        <SelectItem key={table} value={table}>
                          {table}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ArrowRight className="h-4 w-4" />
                  <Select
                    value={join.to}
                    onValueChange={(value) => dispatch({
                      type: 'UPDATE_JOIN',
                      index,
                      join: { ...join, to: value, toField: '' }
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="To Table" />
                    </SelectTrigger>
                    <SelectContent>
                      {queryState.selectedTables.map((table) => (
                        <SelectItem key={table} value={table}>
                          {table}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={join.fromField}
                    onValueChange={(value) => dispatch({
                      type: 'UPDATE_JOIN',
                      index,
                      join: { ...join, fromField: value }
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="From Field" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableJoinFields(join.from).map((field) => (
                        <SelectItem key={field.name} value={field.name}>
                          {field.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ArrowRight className="h-4 w-4" />
                  <Select
                    value={join.toField}
                    onValueChange={(value) => dispatch({
                      type: 'UPDATE_JOIN',
                      index,
                      join: { ...join, toField: value }
                    })}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="To Field" />
                    </SelectTrigger>
                    <SelectContent>
                      {getAvailableJoinFields(join.to).map((field) => (
                        <SelectItem key={field.name} value={field.name}>
                          {field.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => dispatch({ type: 'REMOVE_JOIN', index })}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch({ type: 'ADD_JOIN' })}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Join
              </Button>
            </Card>
          )}
        </div>}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={executeQuery}>Generate SQL Query</Button>
      </CardFooter>
      {queryResult && (
        <CardContent>
          <pre className="bg-muted p-4 rounded-md overflow-auto">
            <code>{queryResult}</code>
          </pre>
        </CardContent>
      )}
    </Card>
  );  
} 