import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

type Props = {
  post: any;
};

const Card = ({ post }: Props) => {
  return (
    <a
      href={`/post/${post.title}?post_id=${post._id}`}
      className="w-[100%] mx-auto aspect-[8/4] md:aspect-[8/5] lg:aspect-[8/6] rounded-2xl overflow-hidden cursor-pointer p-4 flex flex-col justify-between shadow-xl relative"
    >
      <div className="  my-1 h-[30%] md:h-[20%] flex flex-col justify-start ">
        <div className="text-lg text-black font-normal px-2 leading-5 ">
          {/* {post.title.slice(0, 40) + "..."} */}
          {post.title}
        </div>
        <div className="font-normal text-black text-sm mx-2 mt-2 flex items-center">
          {post.createdAt.slice(0, 10)} {" - "}
          {post.author.name}
        </div>
      </div>
      <div className="w-[100%] h-[70%] md:[h-80%] rounded-lg overflow-hidden">
        <img
          src={post.src}
          alt=""
          className="w-full flex-grow object-cover bg-red-100 transition-all duration-300  hover:scale-[1.025]"
        />
      </div>
      <div className="w-[50px] absolute right-4 bottom-4 aspect-square rounded-full bg-gray-950 text-white flex justify-center items-center">
        <FiArrowUpRight size={35} />
      </div>
    </a>
  );
};

export default Card;
