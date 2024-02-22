"use client";
import React, { useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdDateRange } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loading from "@/components/UI/Loading/Loading";

const page = (props: any) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [post, setpost] = useState<Post | null>(null);
  const [loading, setloading] = useState(true);
  const [processing, setProcessing] = useState(false);

  // console.log(props.post.body)
  const getPost = async () => {
    const res = await fetch(
      `/api/post/get/getpost?id=${props.searchParams.post_id}`,
      {
        method: "GET",
      }
    );
    const newRes = await res.json();
    console.log(newRes);
    if (res.ok) {
      setpost(newRes as Post);
    }
    setloading(false);
  };

  const handleEdit = () => {
    router.push(`/post/edit/editpost?post_id=${post?._id}`);
  };
  const handleDelete = async () => {
    setProcessing(true);
    if (window.confirm("Are you sure you want to delete this post")) {
      const data = {
        postId: post?._id,
      };
      const res = await fetch("/api/post/delete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Successfully deleted");
        router.push("/");
      } else {
        alert("Something went wrong");
      }
    }
    setProcessing(false);
  };

  useEffect(() => {
    getPost();
  }, []);

  if (loading || !post) {
    return <Loading />;
  }
  return (
    <div className="w-full bg-background-500 text-secondary-100">
      <div className="flex flex-col justify-between min-h-screen  w-full   ">
        <div className="w-full  mx-auto">
          <img
            src={`${post.src}`}
            alt=""
            className="w-full overflow-hidden aspect-[8/3] object-cover bg-red-100 sm:aspect-[8/3] md:aspect-[8/3] brightness-50"
          />

          <div className="max-w-[1280px] mx-auto py-10">
            <div className="flex gap-5 my-5 items-center">
              {session && status === "authenticated" && (
                <>
                  <button
                    className="cursor-pointer text-black transition-all bg-white py-2 px-4 border rounded-sm hover:text-white hover:bg-[#323232] "
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                  {processing ? (
                    <button className="cursor-pointer transition-all py-2 px-4 border rounded-sm text-white bg-[#323232] ">
                      Deleting....
                    </button>
                  ) : (
                    <button
                      className="cursor-pointer text-black transition-all bg-white py-2 px-4 border rounded-sm hover:text-white hover:bg-[#323232] "
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                  )}
                </>
              )}
            </div>
            <h1 className="text-4xl md:text-6xl my-10 font-normal ">
              {post.title}
            </h1>
            <div className="flex mt-2 text-base  items-center gap-5 text-secondary-500">
              <p className="flex items-center font-bold">
                <BsFillPersonFill /> &nbsp; {post.author.name}{" "}
              </p>
              <p> | </p>
              <p className="flex items-center font-bold">
                <MdDateRange /> &nbsp; {post.createdAt.slice(0, 10)}
              </p>
            </div>
            <div className=" text-justify my-10">
              <div
                className="div "
                dangerouslySetInnerHTML={{ __html: post.body }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
