"use client";
import Link from 'next/link'
import { auth, useAuth, useClerk } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import UserProfileShow from '@/components/UserProfile'

export default function Home() {
  const { userId, isSignedIn, signOut } = useAuth();

  return (
    (<main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold mb-8">Audience Sync</h1>
      { !isSignedIn && <>
      {userId ? (
        <Link
          href="/onboarding"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Onboarding
        </Link>
      ) : (
        <SignInButton mode="modal">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign In with Google
          </button>
        </SignInButton>
      )}
      </>}
      {
        isSignedIn && <>
          <UserProfileShow />
          <br />
          <Link href="/dashboard" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Go to Dashboard
          </Link>
          <br />
          <Link href="/onboarding" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Start Onboarding
          </Link>
          <br />
          <button onClick={() => signOut()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Sign Out
          </button>
        </>
      }
    </main>
    )
  );
}

