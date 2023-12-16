"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import { addOption, getPoll } from "@/lib/api/polls";
import { PollType } from "@/lib/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const QuestionPage = () => {
  const pathname = usePathname();
  const pollId = pathname.slice(11);

  const [option, setOption] = useState<string>("");
  const poll: PollType | undefined = getPoll(pollId);

  const handleAddOption = async () => {
    addOption(pollId, option);
  };

  return (
    <div>
      <p>Question : {poll?.question}</p>
      <Input className="my-4" />
      <Button onClick={handleAddOption}>Add option</Button>
    </div>
  );
};

export default QuestionPage;
