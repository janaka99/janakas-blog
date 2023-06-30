"use client"
import { Footer, Hero } from '@/components'
import Header from '@/components/Header'
import React,{useEffect, useState} from 'react'
import {BsFillPersonFill} from "react-icons/bs"
import {MdDateRange} from "react-icons/md"
import {BiSolidCategory} from "react-icons/bi"
import { useRouter } from 'next/navigation'
import Loading from '@/components/Loading'
import Error from '@/components/404Error'
import {AiFillEdit} from "react-icons/ai"
import { useSession } from 'next-auth/react'

const page = (props:any) => {

  const router = useRouter()
  const {data: session, status} = useSession();

  const [post, setpost] = useState<any>(null)
  const [loading, setloading] = useState(true)
  const [noPost, setnoPost] = useState(false)
const [processing, setProcessing] = useState(false)

  // console.log(props.post.body)
  const getPost = async () => {
      const res = await fetch(`/api/post/get/getpost?id=${props.searchParams.post_id}`, {
        method: "GET",
  
      });
      const newRes = await res.json();
      console.log(newRes.body);
      if (res.ok) {
        setpost(newRes);
        // setposts(newRes);
      }else{
        setpost("Error")
      }
      setloading(false)
  };

  const handleEdit = () =>{
    router.push(`/post/edit/editpost?post_id=${post._id}`)
  }
  const handleDelete =async () =>{
    setProcessing(true);
    if(window.confirm("Are you sure you want to delete this post")){
      const data = {
        postId: post._id
      }
      const res = await fetch('/api/post/delete',{
        method: "POST",
        body: JSON.stringify(data)
      })
      if(res.ok){
        alert("Successfully deleted")
        router.push("/")
      }else{
        alert("Something went wrong")
      }
    }
    setProcessing(false)
  }


  useEffect(()=>{
    getPost();
  },[])

  if(loading){
    return <Loading />
  }
  if(post === "Error"){
    return <Error />
  }
  //fetch data
  return (
    <div className='flex flex-col justify-between min-h-screen pt-5 w-full '>
      <div className="w-[90%]  mx-auto">
        <div className="mx-auto">

      <Header />
        </div>
      <div className="my-10 max-w-[768px] mx-auto">
        <div className="flex gap-5 my-5 items-center">
          {session && status === "authenticated" && (
            <>
            <button className="cursor-pointer text-black transition-all bg-white py-2 px-4 border rounded-sm hover:text-white hover:bg-[#323232] " onClick={handleEdit}>
              Edit
            </button>            
            {processing ? (
              <button className="cursor-pointer transition-all py-2 px-4 border rounded-sm text-white bg-[#323232] " >
              Deleting....
              </button>
              ):(
                <button className="cursor-pointer text-black transition-all bg-white py-2 px-4 border rounded-sm hover:text-white hover:bg-[#323232] " onClick={handleDelete}>
                Delete
                </button>
            )}
            </>
          )}

         
        </div>
        <img src={post.src} alt="" className="w-[100%] aspect-[8/5] object-cover bg-red-100 sm:aspect-[8/4] md:aspect-[8/3]" />
        <h1 className="mt-3 text-4xl ">{post.title}</h1>
        <div className="flex mt-2 text-xs  items-center gap-5">
          <p className='flex items-center font-bold'><BsFillPersonFill /> &nbsp; {post.author.name}  </p>
          <p> | </p>
          <p className='flex items-center font-bold'><MdDateRange /> &nbsp; {post.createdAt.slice(0,10)}</p>
        </div>
        <div className=" text-justify my-10" >
          <div className="div" dangerouslySetInnerHTML={{__html: post.body}}/>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
  }

export default page