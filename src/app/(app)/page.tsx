"use client";

import Button from "@/components/common/Button";
import { logout } from "@/lib/api/auth";
import { useAuth } from "@/lib/firebase/provider";
import { FaPlus } from "react-icons/fa";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addPoll, getAllPolls } from "@/lib/api/polls";
import ModalAddNewPoll from "@/components/modals/ModalAddNewPoll";
import { useRouter } from "next/navigation";
import { PollType } from "@/lib/types";
import Spinner from "@/components/common/Spinner";
import Link from "next/link";

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [polls, setPolls] = useState<any>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const handleAddNewPoll = async () => {
    try {
      const result = await addPoll(user?.uid, question);
      setShowModal(false);

      // redirect to question page
      router.push(`/questions/${result.pollId}`);
    } catch (error) {
      console.log("An error occured.", error);
    }
  };

  useEffect(() => {
    if (user) {
      const result = getAllPolls(user.uid);

      result.then((res: any) => {
        const data = Object.values(res);
        setPolls(data);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <main className="bg-[#7088BB] min-h-screen">
      <div className="p-4 max-w-[500px] mx-auto">
        <h1 className="pt-16 text-white font-semibold text-[80px] text-center">
          Pollify
        </h1>

        <AddNewPollButton setShowModal={setShowModal} />

        {loading ? (
          <div className="mt-4 ml-4">
            <Spinner />
          </div>
        ) : (
          <PollCards polls={polls} />
        )}

        <ModalAddNewPoll
          visible={showModal}
          onCancel={() => setShowModal(false)}
          onSuccess={handleAddNewPoll}
          onValue={(value) => setQuestion(value)}
          value={question}
        />
        {/* Temp logout button */}
        <Button className="mt-40" variant="error" onClick={logout}>
          Log out
        </Button>
      </div>
    </main>
  );
};

export default HomePage;

// Add new poll button
const AddNewPollButton = ({
  setShowModal,
}: {
  setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div
      onClick={() => setShowModal(true)}
      className="bg-[#534B45] rounded-md flex justify-center items-center py-4"
    >
      <div className="flex items-center gap-2 text-white text-[24px]">
        <p>Let&apos;s Poll</p>
        <FaPlus />
      </div>
    </div>
  );
};

// Poll Cards
const PollCards = ({ polls }: { polls: PollType[] }) => {
  return (
    <>
      {polls?.length > 0 ? (
        polls?.map((poll: PollType) => <PollCard key={poll.uid} poll={poll} />)
      ) : (
        <p>No Post Yet</p>
      )}
    </>
  );
};

// Poll card
const PollCard = ({ poll }: { poll: PollType }) => {
  return (
    <Link key={poll.uid} href={`questions/${poll.uid}`}>
      <div className="my-4 p-4 bg-white rounded-md cursor-pointer">
        <p>{poll.question}</p>
      </div>
    </Link>
  );
};
