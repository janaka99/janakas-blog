import React from "react";

import Footer from "./Footer";
import Header from "./Layouts/Header/Header";

type Props = {};

const Error = (props: Props) => {
  return (
    <div className="min-h-screen min-w-full flex flex-col justify-between">
      <div className="w-[90%] mx-auto pt-5">
        <Header />
      </div>
      <div className="text-4xl text-[#323232] text-center">
        404 Page Not Found
      </div>
      <Footer />
    </div>
  );
};

export default Error;
