import { PollType } from "@/lib/types";
import { getDatabase, onValue, ref, set, orderByChild, query, equalTo, get } from "firebase/database";
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

// Get current poll
export const getPoll = (pollId: string) => {
  const db = getDatabase();
  const pollRef = ref(db, `polls/${pollId}`);

  let data: PollType = {
    uid: pollId,
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
// export const getAllPolls = (userId:string) => {
//   const db = getDatabase();
//   const pollsRef = ref(db, `polls/`);
//   // Retrieve the polls for the current user
//   const allPolls = query(pollsRef, orderByChild('ownerId').child(userId).once('value')
//   .then(snapshot => {
//     if (snapshot.exists()) {
//       const polls = snapshot.val();

//       // Now, you have the polls for the current user
//       // Iterate through the polls and fetch the details from the "polls" node
//       const pollsArray = Object.keys(polls).map(pollId => {
//         const pollRef = firebase.database().ref('polls').child(pollId);
//         return pollRef.once('value').then(pollSnapshot => pollSnapshot.val());
//       });

//       // Wait for all promises to resolve using Promise.all
//       return Promise.all(pollsArray);
//     } else {
//       console.log("User has no polls.");
//       return [];
//     }
//   })
// .then(polls => {
//   // Here, 'polls' is an array containing the details of the polls for the current user
//   console.log(polls);
// })
// .catch(error => {
//   console.error("Error fetching user polls:", error);
//   }))
// };

export const getAllPolls = (userId: string) => {
  const db = getDatabase();
  const pollsRef = ref(db, 'polls');

  // Construct the query to get polls for a specific user (assuming 'ownerId' is the field to compare with 'userId')
  const userPollsQuery = query(pollsRef, orderByChild('ownerId'), equalTo(userId));
  let data
  try {
    get(userPollsQuery)
    .then((snapshot) => {
      if (snapshot.exists()) {
        data = snapshot.val();

        data = Object.values(data);
        console.log(data, typeof data);
        return data;
      } else {
        console.log("User has no polls.");
        return [];
      }
    })
    .then((polls) => {
      // Here, 'polls' is an array containing the details of the polls for the current user
      console.log(polls);
      return polls; // Return the polls for further handling if needed
    })
  } catch (error) {
    
  }
  // return get(userPollsQuery)
  //   .then((snapshot) => {
  //     if (snapshot.exists()) {
  //       const polls = snapshot.val();

  //       // Now, you have the polls for the current user
  //       // Iterate through the polls and fetch the details from the "polls" node
  //       const pollsArray = Object.keys(polls).map((pollId) => {
  //         const pollRef = ref(db, `polls/${pollId}`);
  //         return get(pollRef).then((pollSnapshot) => pollSnapshot.val());
  //       });

  //       // Wait for all promises to resolve using Promise.all
  //       console.log(pollsArray);
  //       return pollsArray;
  //     } else {
  //       console.log("User has no polls.");
  //       return [];
  //     }
  //   })
    // .then((polls) => {
    //   // Here, 'polls' is an array containing the details of the polls for the current user
    //   console.log(polls);
    //   return polls; // Return the polls for further handling if needed
    // })
  //   .catch((error) => {
  //     console.error("Error fetching user polls:", error);
  //     return []; // Return an empty array in case of an error
  //   });
};

