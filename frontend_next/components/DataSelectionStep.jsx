'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setDataSelection, setStep } from '@/lib/store';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'

export default function DataSelectionStep() {
  const dataSelection = useSelector((state) => state.onboarding.dataSelection)
  const dispatch = useDispatch()
  const [tables, setTables] = useState([])

  useEffect(() => {
    // Mock API call to get tables
    const mockTables = ['users', 'events', 'products', 'orders']
    setTables(mockTables)
  }, [])

  const handleSelectChange = (name, value) => {
    dispatch(setDataSelection({ [name]: value }))
  }

  return (
    (<form className="space-y-4">
      <div>
        <Label htmlFor="usersTable">Users Table</Label>
        <Select onValueChange={(value) => handleSelectChange('usersTable', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select users table" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table} value={table}>
                {table}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="eventsTable">Events Table</Label>
        <Select onValueChange={(value) => handleSelectChange('eventsTable', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select events table" />
          </SelectTrigger>
          <SelectContent>
            {tables.map((table) => (
              <SelectItem key={table} value={table}>
                {table}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between">
        <Button onClick={() => dispatch(setStep(3))}>Previous</Button>
        <Button onClick={() => dispatch(setStep(5))}>Next</Button>
      </div>
    </form>)
  );
}

