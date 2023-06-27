"use client";

import React,{FC} from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";


type Props = {
  children: any;
  session: any;
}

const Provider = ({children, session}: Props) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
  
}

export default Provider