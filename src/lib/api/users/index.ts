import { ref, set, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

export const addUser = async ( email:string, username:string) => {

    const newUserId = uuidv4()

    const db = getDatabase()

    set(ref(db, 'users/' + newUserId), {
      username: username,
      email: email
    });
  
}