'use client'

import { useDispatch, useSelector } from 'react-redux'
import { setStep } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

async function saveOnboardingData(data){
  try{
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/post/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      return true;
    }
  }
  catch(err){
    console.log(err);
    return false;
  }
}

export default function CompletionStep() {
  const dispatch = useDispatch()
  const router = useRouter()

  const userId = useSelector((state) => state.onboarding.userId)
  const business = useSelector((state) => state.onboarding.businessInfo)
  const db = useSelector((state) => state.onboarding.databaseIntegration)
  const channels = useSelector((state) => state.onboarding.channelIntegrations)
  const key_tables = useSelector((state) => state.onboarding.dataSelection)

  const handleComplete = async () => {
    // Here you would typically submit the form data to your backend
    const res = await saveOnboardingData({
      userId,
      business,
      db,
      channels,
      key_tables,
    });
    if(!res){
      alert('Error saving data');
    }
    console.log(res);
    alert('Onboarding complete')
    router.push('/dashboard')
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

