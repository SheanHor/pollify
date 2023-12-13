import { ref, set, get, getDatabase } from "firebase/database";

export const addUser = async (
  email: string | null,
  username: string | null,
  userId: string,
  isGoogle?: boolean
) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);

  // Add new user to DB if not exists yet
  if (!snapshot.exists()) {
    set(userRef, {
      username: isGoogle
        ? username?.replace(/\s/g, "").toLowerCase()
        : username,
      email: email,
    });
  }
};
