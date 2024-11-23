'use client'

import { useSelector, useDispatch } from 'react-redux'
import { setStep } from '@/lib/store';
import BusinessInfoStep from '@/components/BusinessInfoStep'
import DatabaseIntegrationStep from '@/components/DatabaseIntegrationStep'
import ChannelIntegrationsStep from '@/components/ChannelIntegrationsStep'
import DataSelectionStep from '@/components/DataSelectionStep'
import CompletionStep from '@/components/CompletionStep'

export default function OnboardingForm() {
  const step = useSelector((state) => state.onboarding.step)
  const dispatch = useDispatch()

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BusinessInfoStep />;
      case 2:
        return <DatabaseIntegrationStep />;
      case 3:
        return <ChannelIntegrationsStep />;
      case 4:
        return <DataSelectionStep />;
      case 5:
        return <CompletionStep />;
      default:
        return null
    }
  }

  return (
    (<div
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center">Audience Sync Onboarding</h1>
        <div className="mb-6 flex justify-between">
          {[1, 2, 3, 4, 5].map((s) => (
            <button
              key={s}
              className={`w-10 h-10 rounded-full ${
                s === step ? 'bg-blue-500 text-white' : 'bg-gray-200'
              } flex items-center justify-center`}
              onClick={() => dispatch(setStep(s))}>
              {s}
            </button>
          ))}
        </div>
        {renderStep()}
      </div>
    </div>)
  );
}

