"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Logo from "@/components/UI/Logo/Logo";

const Header = () => {
  const { data, status } = useSession();

  useEffect(() => {}, [status]);

  return (
    <header className="w-[100%] absolute top-0 left-0 h-20 flex justify-between items-center  pb-2 z-50">
      <div className="w-full h-full px-[2vw] flex justify-between items-center">
        <div className="">
          <Logo />
        </div>
        <div className="flex items-center gap-6">
          {status === "authenticated" && (
            <button className="_btn_1" onClick={() => signOut()}>
              Log Out
            </button>
          )}
          {status === "unauthenticated" && (
            <a href="/user/login" className="_btn_1">
              Log In
            </a>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
