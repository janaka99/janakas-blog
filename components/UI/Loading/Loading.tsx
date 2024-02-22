import React from "react";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-background-500 text-secondary-100">
      <div className="w-10 h-10 border-t-4 border-r-4 border-secondary-100 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
