import { auth } from "@/lib/firebase/firebase"
import {GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"

// Email signup
export const signup = async(email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

// Email login
export const login = async(email:string, password:string) => {
    return signInWithEmailAndPassword (auth, email, password)
}

// Google login/signup (if account existed, login , else signup)
export const googleLogin = async() => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    .catch((error) => {
     console.log("error: ", error)
    });
} 

// Logout
export const logout = async () => {
    return auth.signOut();
  };
