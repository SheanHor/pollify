import { auth } from "@/lib/firebase/firebase"
import {GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth"
import { addUser } from "../users";


// Email signup
export const signup = async(email:string, password:string, username:string) => {
    
    const result = await createUserWithEmailAndPassword(auth, email, password)

     // (email, username, userId)
    addUser(email, username, result.user.uid);
}

// Email login
export const login = async(email:string, password:string) => {
    return signInWithEmailAndPassword (auth, email, password)
}

// Google login/signup (if account existed, login , else signup)
export const googleLogin = async() => {
    const provider = new GoogleAuthProvider();

    return signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user
        
        // (email, username, userId, isGoogle)
        addUser(user.email, user.displayName, user.uid, true);
    })
    .catch((error) => {
     console.log("error: ", error)
    })
} 

// Logout
export const logout = async () => {
    return auth.signOut();
  };
