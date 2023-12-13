"use client";

import { getPoll } from "@/lib/api/polls";
import { PollType } from "@/lib/types";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const QuestionPage = () => {
  const pathname = usePathname();
  const pollId = pathname.slice(11);

  const poll: PollType | undefined = getPoll(pollId);

  return (
    <div>
      <p>Question : {poll?.question}</p>
    </div>
  );
};

export default QuestionPage;
