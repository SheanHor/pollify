import { ref, set, getDatabase } from "firebase/database";


export const addUser = async (
    email:string | null, 
    username:string | null, 
    userId: string, 
    isGoogle?: boolean
  ) => {

    const db = getDatabase()

    set(ref(db, 'users/' + userId), {
      username: isGoogle ? username?.replace(/\s/g, '').toLowerCase() :username,
      email: email
    });
  
}