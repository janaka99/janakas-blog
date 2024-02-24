"use client";
import { Card } from "@/components";
import React, { useEffect, useState } from "react";
import SkelatonPost from "./SkelatonPosts";

const HomepagePosts = () => {
  const [posts, setposts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPosts = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/post/all", {
        method: "GET",
      });
      const newRes = await res.json();
      if (res.ok) {
        if (newRes.length <= 0) {
          getPosts();
        } else {
          setposts(newRes as Post[]);
          setIsLoading(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="w-full my-10 flex-col gap-20 bg-background-500">
      <div className="w-[100%] gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-20">
        {isLoading
          ? [0, 1, 2, 3, 4, 5].map((s, i) => <SkelatonPost index={i} key={i} />)
          : posts.map((post: any, i: number) => (
              <Card key={post._id} post={post} index={i} />
            ))}
      </div>
    </section>
  );
};

export default HomepagePosts;
