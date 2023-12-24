"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Spinner from "@/components/common/Spinner";
import { addOption, getPoll } from "@/lib/api/polls";
import { PollType } from "@/lib/types";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const QuestionPage = () => {
  const { id: pollId } = useParams() as { id: string };

  const [loading, setLoading] = useState<boolean>(true);
  const [poll, setPoll] = useState<PollType | null | void>(null);
  const [option, setOption] = useState<string>("");

  useEffect(() => {
    // A callback function to handle data changes
    const handleDataChange = (data: PollType) => {
      setPoll(data);
      setLoading(false);
    };

    // Start the real-time listener
    getPoll(pollId, handleDataChange);
  }, [pollId]);

  // TODO: function add option
  const handleAddOption = () => {
    addOption(pollId, option);
  };

  if (loading) {
    return (
      <div className="bg-[#7088BB] min-h-screen pt-4 pl-4">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="bg-[#7088BB] min-h-screen px-4 pt-4">
      <p>Question : {poll?.question}</p>
      <Input className="my-4" />
      <Button onClick={handleAddOption}>Add option</Button>
    </div>
  );
};

export default QuestionPage;
