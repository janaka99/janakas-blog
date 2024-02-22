import React from "react";
import { FiArrowUpRight } from "react-icons/fi";
import Button from "./UI/Button/Button";

type Props = {
  post: Post;
  index: number;
};

const Card = ({ post, index }: Props) => {
  //
  //   {post.createdAt.slice(0, 10)} {" - "}
  //   {post.author.name}
  //        <FiArrowUpRight size={25} />
  return (
    <a
      href={`/post/${post.title}?post_id=${post._id}`}
      className={`relative w-full flex flex-col
        ${index == 2 || index == 5 ? "lg:col-span-4" : "lg:col-span-2"}
      `}
    >
      <div
        className={`w-full  overflow-hidden
      ${
        index == 2 || index == 5
          ? "aspect-[9/5] lg:aspect-[9/3]"
          : "aspect-[9/5]"
      }
      `}
      >
        <img
          src={`${post.src}`}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <Button link="/" classes="w-fit mx-auto mt-4">
        Category
      </Button>
      <div className="line-clamp-2 line text-secondary-100 w-[90%] mx-auto text-center text-2xl md:text-3xl my-2 mb-4 ">
        {post.title}
      </div>
    </a>
  );
};

export default Card;
