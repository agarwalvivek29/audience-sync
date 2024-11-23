'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setDatabaseIntegration, setStep } from '@/lib/store';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function DatabaseIntegrationStep() {
  const databaseIntegration = useSelector((state) => state.onboarding.databaseIntegration)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    dispatch(setDatabaseIntegration({ [e.target.name]: e.target.value }))
  }

  return (
    (<form className="space-y-4">
      <div>
        <Label htmlFor="host">Host</Label>
        <Input
          id="host"
          name="host"
          value={databaseIntegration.host}
          onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="port">Port</Label>
        <Input
          id="port"
          name="port"
          value={databaseIntegration.port}
          onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={databaseIntegration.username}
          onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={databaseIntegration.password}
          onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="databaseName">Database Name</Label>
        <Input
          id="databaseName"
          name="databaseName"
          value={databaseIntegration.databaseName}
          onChange={handleChange} />
      </div>
      <div className="flex justify-between">
        <Button onClick={() => dispatch(setStep(1))}>Previous</Button>
        <Button onClick={() => dispatch(setStep(3))}>Next</Button>
      </div>
    </form>)
  );
}

