import { auth } from "@/lib/firebase/firebase"
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "firebase/auth"

export const signup = async(email:string, password:string) => {
    return createUserWithEmailAndPassword(auth, email, password)
}

export const login = async(email:string, password:string) => {
    return signInWithEmailAndPassword (auth, email, password)
}

export const logout = async () => {
    return auth.signOut();
  };
