import React from "react";
import Logo from "./Logo";
import Header from "./Header";

const Hero = () => {
  return (
    <header className="_container py-5">
      <div className="w-[100%] flex flex-col">
        <div className="flex flex-col w-full h-[calc(100vh-80px)] justify-between items-center gap-6 ">
          <div className=""></div>
          <div className="w-full flex items-center justify-between gap-10">
            <div className="flex flex-col items-center  lg:items-start gap-6 w-full lg:w-[60%]">
              <div className="font-bold text-6xl xl:text-9xl  text-center lg:text-left">
                Janaka's Daily Blog.
              </div>
              <div className="font-nomal text-xl  md:text-2xl text-gray-400  text-center lg:text-left">
                Welcome to Every Developers Favourite Blog
              </div>
            </div>
            <div className="hidden lg:flex w-2/6 mt-[10%]">
              <p className="font-nomal text-2xl text-gray-400">
                Dive into my coding odyssey! 🚀 Join me, Janaka, as I navigate
                the exciting realm of programming. Uncover tech stories,
                insights, and the unique adventures that shape my life as a
                programmer. Let's code the narrative together!{" "}
              </p>
            </div>
          </div>
          <div className="marquee ">
            <div className="track">
              <span className="text-6xl font-bold text-gray-300 whitespace-nowrap _space">
                ReactJS NextJS MySQL MongoDB NodeJS Django ReactJS NextJS MySQL
                MongoDB NodeJS Django ReactJS NextJS MySQL MongoDB NodeJS Django
                ReactJS NextJS MySQL MongoDB NodeJS Django ReactJS NextJS MySQL
                MongoDB NodeJS Django
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
