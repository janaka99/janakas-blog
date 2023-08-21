"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import SkelatonCard from "./SkelatonCard";

const Body = () => {
  const [posts, setposts] = useState([]);

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
      } else {
        console.log("error raised");
        getPosts();
      }
    } catch (error) {}
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="_container my-10 ">
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
  );
};

export default Body;
