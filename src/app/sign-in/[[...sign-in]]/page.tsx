"use client";

import { SignIn } from '@clerk/nextjs';
import { Ribbon } from 'lucide-react'; // Import the Ribbon icon

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            {/* Replaced the generic SVG with the Ribbon icon from lucide-react */}
            <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Ribbon className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
            Welcome to YouMatter
          </h1>
          <p className="text-zinc-400 mt-2">
            Sign in to access your personalized wellness hub
          </p>
        </div>
        
        <SignIn 
          appearance={{
            elements: {
              rootBox: "bg-transparent shadow-none",
              // Card background and border matching the app's cards
              card: "bg-zinc-900/50 backdrop-blur-xl shadow-2xl border border-zinc-800 rounded-2xl ring-0",
              headerTitle: "text-zinc-100 text-2xl font-bold",
              headerSubtitle: "text-zinc-400",
              // Social buttons styled to fit the dark theme
              socialButtonsBlockButton: "border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 transition-all duration-200 text-zinc-300",
              socialButtonsBlockButtonText: "text-zinc-300 font-medium",
              // Primary button gradient matching the app's CTA buttons
              formButtonPrimary: "bg-gradient-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl",
              // Form fields styled for the dark theme
              formFieldInput: "border border-zinc-700 bg-zinc-800/60 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent text-zinc-100 placeholder:text-zinc-500",
              formFieldLabel: "text-zinc-300 font-medium",
              // Footer links and other interactive elements
              footerActionLink: "text-sky-400 hover:text-sky-300 font-medium",
              dividerLine: "bg-zinc-700",
              dividerText: "text-zinc-500",
              formFieldInputShowPasswordButton: "text-zinc-500 hover:text-zinc-300",
              formFieldSuccessText: "text-emerald-400",
              formFieldErrorText: "text-red-400",
              identityPreviewText: "text-zinc-300",
              identityPreviewEditButton: "text-sky-400 hover:text-sky-300",
              formResendCodeLink: "text-sky-400 hover:text-sky-300",
              otpCodeFieldInput: "border border-zinc-700 bg-zinc-800/60 text-zinc-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent",
              formHeaderText: "text-zinc-200",
              formHeaderSubtitle: "text-zinc-400",
              alternativeMethodsBlockButton: "border border-zinc-700 bg-zinc-800/60 hover:bg-zinc-800 text-zinc-300 transition-all duration-200",
              backButton: "text-zinc-400 hover:text-zinc-200",
              cardBox: "bg-zinc-900/50 backdrop-blur-xl shadow-2xl border border-zinc-800 rounded-2xl ring-0",
              main: "bg-transparent",
              loading: "text-sky-400"
            },
            layout: {
              animations: true,
              logoImageUrl: undefined, // You can set your app's logo here if you have one
              helpPageUrl: undefined,
              privacyPageUrl: undefined,
              termsPageUrl: undefined,
              showOptionalFields: false,
              socialButtonsPlacement: 'bottom', // Ensure social buttons are at the bottom
            },
          }}
          routing="path"
          path="/sign-in" 
          signUpUrl="/sign-up" 
        />
      </div>
    </div>
  );
}
