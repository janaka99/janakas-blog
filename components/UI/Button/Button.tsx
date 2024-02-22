import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  link: string;
  classes?: string;
  autofocus?: boolean;
};

const Button = ({ children, link, classes = "", autofocus = false }: Props) => {
  return (
    <button
      className={`${classes} uppercase text-lg py-1 px-4 rounded-3xl border border-secondary-500 bg-transparent text-secondary-100 hover:bg-secondary-100 hover:text-background-500 transition-all duration-300  tracking-tight focus:bg-secondary-100 focus:text-background-500 whitespace-nowrap`}
    >
      {children}
    </button>
  );
};

export default Button;
