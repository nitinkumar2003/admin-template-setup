"use client";

import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/auth/SignInForm"), {
  ssr: false,
  loading: () => (
    <div className="h-40 animate-pulse rounded bg-gray-200"></div>
  ),
});

export default function SignInWrapper() {
  return <SignInForm />;
}
