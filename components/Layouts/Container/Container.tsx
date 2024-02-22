import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  classes?: string;
};

const Container = ({ children, classes = "" }: Props) => {
  return (
    <div className={`${classes}  mx-auto px-10 md:px-20 w-full h-full`}>
      {children}
    </div>
  );
};

export default Container;
