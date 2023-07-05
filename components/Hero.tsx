import React from "react";
import Logo from "./Logo";
import Header from "./Header";

const Hero = () => {
  return (
    <header className="_container py-5">
      <div className="w-[100%] flex flex-col">
        <Header />
        <div className="flex flex-col h-[calc(100vh-80px)] justify-center items-center ">
          <div className="font-bold text-6xl md:text-8xl mb-10 text-center">
            Janaka's Daily Blog.
          </div>
          <div className="font-bold text-1xl text-center">
            Welcome to Every Developers Favourite Blog
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
