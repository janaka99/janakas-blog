import React from "react";
import { FaBookOpen } from "react-icons/fa";

const Logo = () => {
  return (
    <a href="/" className="cursor-pointer flex items-center gap-2 text-white">
      <FaBookOpen size={35} />
      <div className="flex flex-col">
        <span className=" font-bold text-xl leading-5">JANAKA'S</span>
        <span className=" font-normal text-xl leading-5">BLOG</span>
      </div>
    </a>
  );
};

export default Logo;
