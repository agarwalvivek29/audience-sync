"use client";
import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { Provider } from "react-redux";
import { store } from "@/lib/store";

const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Audience Sync',
//   description: 'Automated User Understanding and Segmentation',
// }

export default function RootLayout({
  children
}) {
  return (
    (<ClerkProvider>
      <Provider store={store}>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </Provider>
    </ClerkProvider>)
  );
}

