"use client"
import { Footer, Hero } from '@/components'
import Header from '@/components/Header'
import React, {useState ,useEffect}from 'react'
// import Editor from '@/components/Editor/Editor'
import { useSession, getSession } from "next-auth/react"
import Loading from '@/components/Loading'
import Error from '@/components/404Error'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import 'react-quill/dist/quill.snow.css';

const page = (props:any) => {
  const router = useRouter();

  const { data: session, status } = useSession()

    const [value, setValue] = useState('');

    const [file, setFile ] = useState(null)
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [temporyImageView, setTemporyImageView] = useState<any >("")
    const [loading, setloading] = useState(false)

    const handleFileUpload = ( file: any | null | FileList)=>{

      setFile(null);
      var reader = new FileReader();
      reader.onloadend = function () {
        setTemporyImageView(reader.result);
      };
      setFile(file[0]);
      reader.readAsDataURL(file[0]);
    }
    

    const createNewPost = async () =>{
      setloading(true)
      const newPost: any = new FormData() ;
      if(file !== null){
        const post = {
          title : title,
          body : body,
        }
        console.log(post)
        newPost.append("details ", JSON.stringify(post));
        newPost.append("file", file);
        const res = await fetch("/api/post/new", {
          method : "POST",
          body: newPost}
        )
        const newRes = await res.json()
        if(res.ok){
          alert("New post created successfully")
          router.push(`/post/${newRes.title}?post_id=${newRes._id}`);
        }else{
          alert("Something went wrong. Please check the form and try again")
        }
      }
      setloading(false);

    }

console.log(status)
  if(status === "loading"){
    return <Loading />
  }
  if( status === "unauthenticated"){
    return <Error />
  }


  return (
    <div className='flex flex-col justify-between min-h-screen pt-5 '>
      <div className="w-[90%] mx-auto">
      <Header />

      <div className="my-10 max-w-[1440px] mx-auto">
        <div className="flex flex-col gap-4 my-7 ">
            <div className="flex flex-col gap-3">
                <label className='' htmlFor="">Title</label>
                <input className='text-3xl border outline-none p-2' type="text"                     onChange={(e) => {
                        setTitle(e.target.value);
                      }}/>
            </div>
            <div className=" flex flex-col md:flex-row">
              <div className="flex flex-col gap-10 ">
                <div className="flex flex-col gap-3 ">
                  <label htmlFor="">Upload Cover Image</label>
                  <input type="file" name="" id=""                     
                    onChange={(e) => {
                        handleFileUpload(e.target.files);
                      }}/>
                </div>
              </div>
              <div className="min-w-[300px] max-w-[300px] aspect-[5/3] bg-gray-50 mt-10 md:mt-0">
                <img className='w-full h-full object-cover' src={temporyImageView && temporyImageView } alt="" />
              </div>
            </div>

        </div>
        <div className="flex flex-col ">
            {/* <Editor setBody={setBody} body={body}/> */}
            <ReactQuill theme="snow" value={value} onChange={setBody} />
        </div>
        <div className="mt-10">
          {loading ? (

          <button className="_btn_1 w-fit cursor-pointer">
            Submitting...
          </button>

            ):(
            <button className="_btn_1 w-fit cursor-pointer" onClick={createNewPost}>Publish</button>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>
  )
}

export default page