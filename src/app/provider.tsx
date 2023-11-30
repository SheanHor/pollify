"use client";

//import { Toaster } from "react-hot-toast";

import AuthProvider from "@/lib/firebase/provider";

const RootProvider = ({ children }: { children?: React.ReactNode }) => {

  return (
    <>
      {/* <Toaster /> */}
      <AuthProvider>
        {children}
      </AuthProvider>
    </>
  );
};

export default RootProvider;