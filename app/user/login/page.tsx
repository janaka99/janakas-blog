"use client"
import { Footer } from '@/components'
import Header from '@/components/Header'
import React,{useState} from 'react'
import {signIn , useSession} from "next-auth/react"
import {useRouter} from "next/navigation"
import Loading from '@/components/Loading'

const Page = () => {
  const router = useRouter()

  const { data: session, status } = useSession()

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleLogin =async () => {
    setLoading(true)
    const res = await signIn("credentials", {
      email: email,
      password: password,
      redirect: false,
    })
    setLoading(false)

  }

  if(status === "loading"){
    return <Loading />
  }

  if(session){
    router.push("/")
  }else{

  return (
    <div className='flex flex-col w-full min-h-screen justify-between pt-5'>
      <div className="w-[90%] mx-auto">

      <Header />
      </div>

          <div className="max-w-[400px] w-full mx-auto border  bg-gray-50 p-10 flex flex-col gap-5 rounded">
            <input className='border outline-none p-2 rounded' type="text" placeholder='email' onChange={(e)=>setemail(e.target.value)} />
            <input className='border outline-none p-2 rounded' type="text"  placeholder='Password' onChange={(e)=>setpassword(e.target.value)}/>
            {loading ? (
              <div className="_btn_1 text-center cursor-pointer" >Loading....</div>
              ):(           
              <div className="_btn_1 text-center cursor-pointer" onClick={handleLogin}>Login</div>
            )}
            </div>
        
        <Footer />
    </div>
  )
}
}
export default Page