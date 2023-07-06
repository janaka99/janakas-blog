import React from "react";
import { CgArrowTopRight } from "react-icons/cg";

type Props = {
  post: any;
};

const Card = ({ post }: Props) => {
  return (
    <a
      href={`/post/${post.title}?post_id=${post._id}`}
      className="w-[100%] mx-auto aspect-[8/4] md:aspect-[8/5] lg:aspect-[8/6] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer   transition-all duration-150 hover:transition-all hover:duration-150"
    >
      <div className="w-[100%] h-[70%] md:[h-80%] rounded-md overflow-hidden">
        <img
          src={post.src}
          alt=""
          className="w-full flex-grow object-cover bg-red-100 transition-all duration-300  hover:scale-[1.025]"
        />
      </div>
      <div className=" bg-red-50 my-1 h-[30%] md:h-[20%] flex flex-col justify-center ">
        <div className="underline text-sm font-bold px-2  ">
          {post.title.slice(0, 40) + "..."}
        </div>
        <div className="font-bold text-xs mx-2 mt-2 flex items-center">
          Read Post <CgArrowTopRight />{" "}
        </div>
      </div>
    </a>
  );
};

export default Card;
