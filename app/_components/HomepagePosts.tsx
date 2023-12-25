"use client";
import { Card } from "@/components";
import React, { useEffect, useState } from "react";
import SkelatonPosts from "./SkelatonPosts";

const HomepagePosts = () => {
  const [posts, setposts] = useState<Post[]>([]);

  const getPosts = async () => {
    try {
      const res = await fetch("/api/post/all", {
        method: "GET",
      });
      const newRes = await res.json();
      if (res.ok) {
        setposts(newRes as Post[]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="w-full my-10 flex-col gap-20">
      <div className="w-full flex flex-col gap-16">
        <h1 className="font-normal underline text-left">More Articles</h1>
        <div className="w-[100%] gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.length === 0 ? (
            <>
              <SkelatonPosts />
            </>
          ) : (
            posts.map((post: any) => <Card key={post._id} post={post} />)
          )}
        </div>
      </div>
    </section>
  );
};

export default HomepagePosts;
