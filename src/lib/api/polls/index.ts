import { PollType } from "@/lib/types";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

// Add new poll
export const addPoll = async (userId?: string, question?: string) => {
  const pollId = uuidv4();
  const db = getDatabase();

  // add poll id to user's polls
  set(ref(db, `users/${userId}/polls/${pollId}`), true);

  // add new poll in polls
  set(ref(db, `polls/${pollId}`), {
    question: question,
    ownerId: userId,
    editable: false,
    expiredTime: new Date("2023-12-31").toUTCString(),
  });

  return { pollId };
};

// Get current poll
export const getPoll = (pollId: string) => {
  const db = getDatabase();
  const pollRef = ref(db, `polls/${pollId}`);

  let data: PollType = {
    question: "",
    ownerId: "",
    editable: false,
    expiredTime: new Date(),
  };

  onValue(pollRef, (snapshot) => {
    data = snapshot.val();
  });

  return data;
};

// Todo: retrive all polls by userId on Homepage
export const getAllPolls = () => {};
