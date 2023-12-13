"use client";

import Button from "@/components/common/Button";
import { logout } from "@/lib/api/auth";
import { useAuth } from "@/lib/firebase/provider";
import { FaPlus } from "react-icons/fa";
import React from "react";

const HomePage = () => {
  const { user } = useAuth();
  console.log("user", user);
  return (
    <main className="bg-[#7088BB] min-h-screen">
      <div className="p-4 max-w-[500px] mx-auto">
        <h1 className="pt-16 text-white font-semibold text-[80px] text-center">Pollify</h1>
        <div onClick={()=>{}} className="bg-[#534B45] rounded-md flex justify-center items-center py-4">
          <div className="flex items-center gap-2 text-white text-[24px]">
            <p>Let&apos;s Poll</p>
            <FaPlus />
          </div>
        </div>
        
      </div>
      
    </main>
  );
};

export default HomePage;
