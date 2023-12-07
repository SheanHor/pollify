import AppRoute from "@/components/auth/AppRoute";
import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRoute>
      <div className="w-full">{children}</div>
    </AppRoute>
  );
};

export default AppLayout;
