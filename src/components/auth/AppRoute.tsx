"use client";

import { useAuth } from "@/lib/firebase/provider";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

export default function AppRoute({ children }: PropsWithChildren) {
  const { user, authenticating } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authenticating) {
      if (!user) {
        router.push("/login");
      } 
    }
  }, [user, router, authenticating]);

  return <>{children}</>;
}