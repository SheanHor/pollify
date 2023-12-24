import { PollType } from "@/lib/types";
import {
  getDatabase,
  onValue,
  ref,
  set,
  orderByChild,
  query,
  equalTo,
  get,
} from "firebase/database";
import { v4 as uuidv4 } from "uuid";

// Add new poll
export const addPoll = async (userId?: string, question?: string) => {
  const pollId = uuidv4();
  const db = getDatabase();

  // add poll id to user's polls
  set(ref(db, `users/${userId}/polls/${pollId}`), true);

  // add new poll in polls
  set(ref(db, `polls/${pollId}`), {
    uid: pollId,
    question: question,
    ownerId: userId,
    editable: false,
    expiredTime: new Date("2023-12-31").toUTCString(),
  });

  return { pollId };
};

// Get current poll (real-time listener)
export const getPoll = async (
  pollId: string,
  onDataChange: (data: PollType) => void
) => {
  const db = getDatabase();
  const pollRef = ref(db, `polls/${pollId}`);

  onValue(pollRef, (snapshot) => {
    const data = snapshot.val();
    onDataChange(data);
  });
};

// Get all polls
export const getAllPolls = async (userId: string) => {
  const db = getDatabase();
  const pollsRef = ref(db, "polls");

  const userPollsQuery = query(
    pollsRef,
    orderByChild("ownerId"),
    equalTo(userId)
  );

  let data: PollType[] = [];

  await get(userPollsQuery).then((snapshot) => {
    if (snapshot.exists()) {
      data = snapshot.val();
    }
  });

  return data;
};

// TODO: Add option
export const addOption = async (pollId: string, option: string) => {
  const db = getDatabase();
  const pollsRef = ref(db, `polls/${pollId}`);

  return;
};
