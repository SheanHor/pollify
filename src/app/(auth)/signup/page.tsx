"use client";

import Button from "@/components/common/Button";
import SignUpForm from "@/components/forms/SignUpForm";
import { useAuth } from "@/lib/firebase/provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SignUp = () => {
  const router = useRouter();

  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-[#7088BB] pt-32 flex flex-col items-center">
      <h1 className="text-[64px] font-bold text-white">Pollify</h1>

      <SignUpForm />

      <Link href="/login">
        <Button variant="link">
          Already have account? <span className="font-semibold">Log in</span>
        </Button>
      </Link>
    </div>
  );
};

export default SignUp;
