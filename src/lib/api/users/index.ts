import { getDatabase, ref, set } from "firebase/database";

export const addUser = (userId:string, email:string, username:string) => {
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
    username: username,
    email: email
  });
}