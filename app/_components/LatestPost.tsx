"use client";
import React, { useEffect, useState } from "react";

const LatestPost = () => {
  const [latestPost, setLatestPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getLatestArticle = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/post/latest-article", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        setLatestPost(newRes[0] as Post);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLatestArticle();
  }, []);

  return (
    <div className="w-full flex flex-col gap-16">
      <h1 className="font-normal underline">Latest Article</h1>
      {!isLoading && latestPost ? (
        <a
          href={`/post/${latestPost.title}?post_id=${latestPost._id}`}
          className="w-full flex flex-col sm:flex-row gap-10"
        >
          <div className="w-full sm:w-[150px] sm:min-w-[150px] aspect-[2/1] sm:aspect-square">
            <img
              src={`${latestPost.src}`}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-between ">
            <div className="text-2xl md:text-4xl  text-start">
              {latestPost.title}
            </div>
            <div className="text-base sm:text-lg md:text-xl text-start text-gray-400 flex gap-10">
              <span>{latestPost.createdAt.slice(0, 10)}</span>
              <span>{latestPost.author.name}</span>
            </div>
          </div>
        </a>
      ) : (
        <div className="w-full flex flex-col sm:flex-row gap-2 sm:gap-10">
          <div className="w-full sm:w-[150px] aspect-[3/1] sm:aspect-square skelaton-anima-div">
            <div className="skelaton-anima-inner-div w-full h-full"></div>
          </div>
          <div className="flex flex-col justify-center gap-2 flex-grow">
            <div className="text-5xl text-start skelaton-anima-div h-14 w-full">
              <div className="skelaton-anima-inner-div w-full h-full"></div>
            </div>
            <div className="text-xl text-start hidden sm:flex gap-10">
              <span className="skelaton-anima-div h-10 w-24">
                <div className="skelaton-anima-inner-div w-full h-full"></div>
              </span>
              <span className="skelaton-anima-div h-10 w-24">
                <div className="skelaton-anima-inner-div w-full h-full"></div>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestPost;
