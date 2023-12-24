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
import Spinner from "@/components/common/Spinner";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  authenticating: boolean;
  refreshAuth: (firebaseUser: User) => Promise<void>;
  refreshToken: (firebaseUser: User) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authenticating: true,
  refreshAuth: async () => {},
  refreshToken: async () => {},
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [authenticating, setAuthenticating] = useState(true);

  // refresh token
  const refreshToken = async (user: User) => {
    await user.getIdToken(true);
    await user.reload();
  };

  // refrest auth (use case: update user's profile etc)
  const refreshAuth = useCallback(async (firebaseUser: User) => {
    try {
      if (firebaseUser) {
        const { claims } = await firebaseUser.getIdTokenResult(true);
        if (claims.verified) {
          setUser(firebaseUser);
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      doneAuthenticating();
    }
  }, []);

  // done authenticating
  const doneAuthenticating = () => {
    setAuthenticating(false);
    return setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // check firebaseUser initially
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setLoading(true);
        setUser(null);
        timeout = doneAuthenticating();
      }
    });

    return () => {
      unsubscribe();
      timeout && clearTimeout(timeout);
    };
  }, []);

  // check firebaseUser when "user" changed / "refreshAuth" triggered
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (user) {
      if (user.emailVerified) {
        refreshAuth(user);
      } else {
        timeout = doneAuthenticating();
      }
    }
    return () => timeout && clearTimeout(timeout);
  }, [user, refreshAuth]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authenticating,
        refreshAuth,
        refreshToken,
      }}
    >
      <div className="relative">
        {loading ? (
          <div className="absolute left-0 top-0 z-10 flex min-h-screen w-full items-center justify-center bg-white">
            <div className="w-full max-w-xl md:ml-20 flex justify-center items-center">
              <Spinner className="text-blox-blue" />
            </div>
          </div>
        ) : (
          <>{children}</>
        )}
      </div>
    </AuthContext.Provider>
  );
};

export default AuthProvider;
