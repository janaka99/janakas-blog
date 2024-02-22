import React from "react";

type props = {
  index: number;
};

const SkelatonPost = ({ index }: props) => {
  return (
    <>
      <div
        className={`w-[100%] mx-auto skelaton-anima-div aspect-[8/4] md:aspect-[8/5] rounded-xl overflow-hidden  ${
          index == 2 || index == 5
            ? "lg:col-span-4  lg:aspect-[8/3]"
            : "lg:col-span-2  lg:aspect-[8/6]"
        }
      `}
      >
        <div className="w-full h-full skelaton-anima-inner-div oveflow-hidden "></div>
      </div>
    </>
  );
};

export default SkelatonPost;
