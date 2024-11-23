import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
function SignIn() {
  return (
   <>
       <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
         <UserButton /> 
      </SignedIn>
    </header>
   </>
  )
}

export default SignIn