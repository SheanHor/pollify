"use client";

import Button from "@/components/common/Button";
import { logout } from "@/lib/api/auth";
import { useAuth } from "@/lib/firebase/provider";
import { FaPlus } from "react-icons/fa";
import React, { Dispatch, SetStateAction, useState } from "react";
import { addPoll } from "@/lib/api/polls";
import ModalAddNewPoll from "@/components/modals/ModalAddNewPoll";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");

  const handleAddNewPoll = async () => {
    const result = await addPoll(user?.uid, question);

    setShowModal(false);

    router.push(`/questions/${result.pollId}`);
  };

  console.log(user);

  return (
    <main className="bg-[#7088BB] min-h-screen">
      <div className="p-4 max-w-[500px] mx-auto">
        <h1 className="pt-16 text-white font-semibold text-[80px] text-center">
          Pollify
        </h1>

        <AddNewPollButton setShowModal={setShowModal} />

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
