'use client'

import { useDispatch } from 'react-redux'
import { setStep } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function CompletionStep() {
  const dispatch = useDispatch()
  const router = useRouter()

  const handleComplete = () => {
    // Here you would typically submit the form data to your backend
    console.log('Onboarding complete')
    router.push('/')
  }

  return (
    (<div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Onboarding Complete!</h2>
      <p className="mb-6">Thank you for setting up your account with Audience Sync.</p>
      <div className="flex justify-between">
        <Button onClick={() => dispatch(setStep(4))}>Previous</Button>
        <Button onClick={handleComplete}>Finish</Button>
      </div>
    </div>)
  );
}

