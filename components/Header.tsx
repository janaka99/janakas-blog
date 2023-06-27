"use client"
import React, { useEffect } from 'react'
import Logo from './Logo'
import {signOut, useSession} from "next-auth/react"

const Header = () => {

  
  const {data, status} = useSession();

  useEffect(() => {

  }, [status])
  

  return (
  <div className='w-[100%] flex justify-between items-center border-b-2 pb-2'>
      <div className="">
          <Logo />
      </div>
      {status === 'authenticated' && (
      <button className='_btn_1' onClick={() => signOut()}>Log Out</button>
      )}
      {status === 'unauthenticated' && (
      <a href="/user/login" className='_btn_1'>Log In</a>
      )}      

</div>
  )
}

export default Header