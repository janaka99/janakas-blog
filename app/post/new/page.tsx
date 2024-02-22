"use client";

import React, { useState, useEffect } from "react";
// import Editor from '@/components/Editor/Editor'
import { useSession, getSession } from "next-auth/react";
import Error from "@/components/404Error";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import Container from "@/components/Layouts/Container/Container";
import Loading from "@/components/UI/Loading/Loading";

const page = (props: any) => {
  const router = useRouter();

  // const { data: session, status } = useSession();

  const [value, setValue] = useState("");

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [temporyImageView, setTemporyImageView] = useState<any>("");
  const [loading, setloading] = useState(false);

  const handleFileUpload = (file: any | null | FileList) => {
    setFile(null);
    var reader = new FileReader();
    reader.onloadend = function () {
      setTemporyImageView(reader.result);
    };
    setFile(file[0]);
    reader.readAsDataURL(file[0]);
  };

  const handleChange = (e: any) => {
    setValue(e);
  };

  const createNewPost = async () => {
    setloading(true);
    const newPost: any = new FormData();
    if (file !== null) {
      const post = {
        title: title,
        body: value,
      };
      newPost.append("details ", JSON.stringify(post));
      newPost.append("file", file);
      const res = await fetch("/api/post/new", {
        method: "POST",
        body: newPost,
      });
      const newRes = await res.json();
      if (res.ok) {
        alert("New post created successfully");
        router.push(`/post/${newRes.title}?post_id=${newRes._id}`);
      } else {
        alert("Something went wrong. Please check the form and try again");
      }
    }
    setloading(false);
  };

  // if (status === "loading") {
  //   return <Loading />;
  // }
  // if (status === "unauthenticated") {
  //   return <Error />;
  // }

  return (
    <div className="flex flex-col justify-between min-h-screen pt-5 bg-background-500 text-secondary-100">
      <Container>
        <div className="my-20 max-w-[768px] mx-auto">
          <div className="uppercase mb-10 text-xl tracking-wider">
            Add new post
          </div>
          <div className="flex flex-col gap-4 my-7 ">
            <div className="flex flex-col gap-3">
              <label className="" htmlFor="">
                Title
              </label>
              <input
                className="text-xl border outline-none p-2 text-background-500"
                type="text"
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className=" flex flex-col md:flex-row md:justify-between">
              <div className="flex flex-col gap-10 ">
                <div className="flex flex-col gap-3 ">
                  <label htmlFor="">Upload Cover Image</label>
                  <label
                    htmlFor="upload_image"
                    className="px-4 py-2 bg-background-500 border-2 border-secondary-100 transition-all duration-300 hover:bg-secondary-100 hover:text-background-500 flex justify-center "
                  >
                    Upload
                  </label>
                  <input
                    type="file"
                    className="hidden"
                    name=""
                    id="upload_image"
                    onChange={(e) => {
                      handleFileUpload(e.target.files);
                    }}
                  />
                </div>
              </div>
              <div className="min-w-[300px] max-w-[300px] aspect-[5/3] bg-gray-50 mt-10 md:mt-0">
                <img
                  className="w-full h-full object-cover"
                  src={temporyImageView && temporyImageView}
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            {/* <Editor setBody={setBody} body={body}/> */}
            <ReactQuill theme="snow" value={value} onChange={handleChange} />
          </div>
          <div className="mt-10">
            {loading ? (
              <button className="_btn_1 w-fit cursor-pointer">
                Submitting...
              </button>
            ) : (
              <button
                className="_btn_1 w-fit cursor-pointer"
                onClick={createNewPost}
              >
                Publish
              </button>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default page;
