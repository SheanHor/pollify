"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "./firebase";

//import Spinner from "@/components/common/Spinner";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  authenticating: boolean;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authenticating: true
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);
  const doneAuthenticating = () => {
    setAuthenticating(false);
    return setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (user) {
      timeout = doneAuthenticating();
    }
    return () => timeout && clearTimeout(timeout);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticating
      }}
    >
      <div className="relative">
        {loading && (
          <div className="absolute left-0 top-0 z-10 flex min-h-screen w-full items-center justify-center bg-white">
            <div className="w-full max-w-xl md:ml-20 flex justify-center items-center">
              {/* <Spinner className="text-blox-blue" /> */}
              Loading...
            </div>
          </div>
        )}
        {children}
      </div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;