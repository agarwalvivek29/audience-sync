'use client'

import { Provider } from 'react-redux'
import { store } from '@/lib/store'
import OnboardingForm from '@/components/OnboardingForm'

export default function OnboardingPage() {
  return (
    (<Provider store={store}>
      <OnboardingForm />
    </Provider>)
  );
}

