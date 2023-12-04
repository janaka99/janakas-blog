"use client";
import { Footer, Hero } from "@/components";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import { useSession, getSession } from "next-auth/react";
import Loading from "@/components/Loading";
import Error from "@/components/404Error";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const page = (props: any) => {
  const router = useRouter();

  const { data: session, status } = useSession();

  const [value, setValue] = useState("");
  const [post, setpost] = useState<any>(null);
  const [reqProcessing, setreqProcessing] = useState(false);

  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
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

  const updatePost = async () => {
    setreqProcessing(true);
    // setloading(true)
    const form: any = new FormData();
    const editedPost = {
      title: title,
      body: body,
      imageId: post.imageId,
      id: post._id,
    };
    console.log(editedPost);
    form.append("details ", JSON.stringify(editedPost));
    if (file !== null) {
      form.append("file", file);
    }
    const res = await fetch("/api/post/update", {
      method: "POST",
      body: form,
    });
    if (res.ok) {
      const post = await res.json();
      console.log(post);
      alert("The post update successfully");
      router.push(`/post/${post.title}?post_id=${post._id}`);
    } else {
      alert("Something went wrong. Please check the form and try again");
    }
    setreqProcessing(false);
  };

  const handleImage = () => {
    setFile(null);
    setTemporyImageView("");
  };
  // console.log(props.post.body)
  const getPost = async () => {
    const res = await fetch(
      `/api/post/get/getpost?id=${props.searchParams.post_id}`,
      {
        method: "GET",
      }
    );
    const newRes = await res.json();
    console.log(newRes.body);
    if (res.ok) {
      setpost(newRes);
      setTitle(newRes.title);
      setBody(newRes.body);
      // setposts(newRes);
    } else {
      setpost("Error");
    }
    setloading(false);
  };
  useEffect(() => {
    getPost();
  }, []);

  console.log(status);
  if (status === "loading") {
    return <Loading />;
  }
  if (status === "unauthenticated") {
    return <Error />;
  }
  if (post === "Error") {
    return <Error />;
  }

  return (
    <div className="flex flex-col justify-between min-h-screen pt-5 ">
      <div className="w-[90%] mx-auto">
        <div className="my-10 max-w-[768px] mx-auto">
          <div className="flex flex-col gap-4 my-7 ">
            <div className="flex flex-col gap-3">
              <label className="" htmlFor="">
                Title
              </label>
              <input
                className="text-3xl border outline-none p-2"
                type="text"
                defaultValue={post?.title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className=" flex flex-col md:flex-row">
              <div className="flex flex-col gap-10 ">
                <div className="flex flex-col gap-3 ">
                  <label htmlFor="">Upload Cover Image</label>
                  <input
                    type="file"
                    name=""
                    id=""
                    onChange={(e) => {
                      handleFileUpload(e.target.files);
                    }}
                  />
                  <button
                    className="cursor-pointer w-fit text-black transition-all bg-white py-2 px-4 border rounded-sm hover:text-white hover:bg-[#323232] "
                    onClick={handleImage}
                  >
                    Keep Original Image
                  </button>
                </div>
              </div>
              <div className="min-w-[300px] max-w-[300px] aspect-[5/3] bg-gray-50 mt-10 md:mt-0">
                <img
                  className="w-full h-full object-cover"
                  src={
                    file == null
                      ? post?.src
                      : temporyImageView && temporyImageView
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            {post && (
              <ReactQuill theme="snow" value={body} onChange={setBody} />
            )}
          </div>
          <div className="mt-10">
            {reqProcessing ? (
              <button className="_btn_1 w-fit cursor-pointer">
                updating...
              </button>
            ) : (
              <button
                className="_btn_1 w-fit cursor-pointer"
                onClick={updatePost}
              >
                Update
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default page;
