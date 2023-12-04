"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SkelatonCard from "./SkelatonCard";

const Body = () => {
  const [posts, setposts] = useState<Post[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [latestPost, setLatestPost] = useState<Post | null>(null);

  const getLatestArticle = async () => {
    try {
      const res = await fetch("/api/post/latest-article", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        if (
          newRes.length <= 0 ||
          !newRes.length ||
          newRes === undefined ||
          newRes === null
        ) {
          getPosts();
        }
        setLatestPost(newRes[0]);
        console.log(newRes);
      } else {
        setRefresh(true);
      }
    } catch (error) {
      setRefresh(true);
    }
  };

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post/all", {
        method: "GET",
      });
      const newRes = await res.json();

      if (res.ok) {
        if (
          newRes.length <= 0 ||
          !newRes.length ||
          newRes === undefined ||
          newRes === null
        ) {
          getPosts();
        }
        setposts(newRes);
        console.log(newRes);
      } else {
        setRefresh(true);
      }
    } catch (error) {
      setRefresh(true);
    }
  };

  useEffect(() => {
    getPosts();
    getLatestArticle();
  }, [refresh]);

  return (
    <div className="_container my-10 flex-col gap-20">
      <div className="w-full flex flex-col gap-16">
        <h1 className="font-normal underline">Latest Article</h1>
        {latestPost && (
          <a
            href={`/post/${latestPost.title}?post_id=${latestPost._id}`}
            className="w-full flex gap-10"
          >
            <div className="w-[150px] aspect-square">
              <img
                src={`${latestPost.src}`}
                className="w-full h-full object-cover"
                alt=""
              />
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-5xl text-start">{latestPost.title}</div>
              <div className="text-xl text-start text-gray-400 flex gap-10">
                <span>{latestPost.createdAt.slice(0, 10)}</span>
                <span>{latestPost.author.name}</span>
              </div>
            </div>
          </a>
        )}
      </div>

      <div className="w-full flex flex-col gap-16">
        <h1 className="font-normal underline text-left">More Articles</h1>
        <div className="w-[100%] gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <>
              <SkelatonCard />
              <SkelatonCard />
              <SkelatonCard />
              <SkelatonCard />
              <SkelatonCard />
              <SkelatonCard />
            </>
          ) : (
            posts.map((post: any) => <Card key={post._id} post={post} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Body;
