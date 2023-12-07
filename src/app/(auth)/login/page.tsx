"use client";

import Button from "@/components/common/Button";
import LogInForm from "@/components/forms/LogInForm";
import { useAuth } from "@/lib/firebase/provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const LogIn = () => {
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
      <LogInForm />
      <Link href="/signup">
        <Button variant="link">
          Doesn&apos;t have account yet?{" "}
          <span className="font-semibold">Sign up</span>
        </Button>
      </Link>
    </div>
  );
};

export default LogIn;
