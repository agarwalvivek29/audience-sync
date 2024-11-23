'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setChannelIntegrations, setStep } from '@/lib/store';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function ChannelIntegrationsStep() {
  const channelIntegrations = useSelector((state) => state.onboarding.channelIntegrations)
  const dispatch = useDispatch()

  const handleChange = (channel, field, value) => {
    dispatch(setChannelIntegrations({
      [channel]: {
        ...channelIntegrations[channel],
        [field]: value
      }
    }))
  }

  return (
    (<form className="space-y-4">
      <h2 className="text-xl font-semibold">AWS SES</h2>
      <div>
        <Label htmlFor="awsAccessKey">Access Key</Label>
        <Input
          id="awsAccessKey"
          value={channelIntegrations.awsSes.accessKey}
          onChange={(e) => handleChange('awsSes', 'accessKey', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="awsSecretAccessKey">Secret Access Key</Label>
        <Input
          id="awsSecretAccessKey"
          type="password"
          value={channelIntegrations.awsSes.secretAccessKey}
          onChange={(e) => handleChange('awsSes', 'secretAccessKey', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="awsRegion">Region</Label>
        <Input
          id="awsRegion"
          value={channelIntegrations.awsSes.region}
          onChange={(e) => handleChange('awsSes', 'region', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="awsEmail">Email</Label>
        <Input
          id="awsEmail"
          type="email"
          value={channelIntegrations.awsSes.email}
          onChange={(e) => handleChange('awsSes', 'email', e.target.value)} />
      </div>
      <h2 className="text-xl font-semibold mt-8">Push Notifications</h2>
      <div>
        <Label htmlFor="webhookUrl">Webhook URL</Label>
        <Input
          id="webhookUrl"
          value={channelIntegrations.pushNotifications.webhookUrl}
          onChange={(e) => handleChange('pushNotifications', 'webhookUrl', e.target.value)} />
      </div>
      <div>
        <Label htmlFor="authorizationToken">Authorization Token</Label>
        <Input
          id="authorizationToken"
          type="password"
          value
={channelIntegrations.pushNotifications.authorizationToken}
          onChange={(e) => handleChange('pushNotifications', 'authorizationToken', e.target.value)} />
      </div>
      <div className="flex justify-between">
        <Button onClick={() => dispatch(setStep(2))}>Previous</Button>
        <Button onClick={() => dispatch(setStep(4))}>Next</Button>
      </div>
    </form>)
  );
}

