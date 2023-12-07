"use client";

import Button from "@/components/common/Button";
import { logout } from "@/lib/api/auth";
import { useAuth } from "@/lib/firebase/provider";
import React from "react";

const HomePage = () => {
  const { user } = useAuth();
  console.log("user", user);
  return (
    <main className="p-4">
      <p>Home page</p>
      <p>Welcome back: {user?.displayName}</p>
      <p>Welcome back: {user?.email}</p>

      <Button variant="error" size="small" onClick={logout}>
        Log out
      </Button>
    </main>
  );
};

export default HomePage;
