import React from 'react'
import {CgArrowTopRight} from "react-icons/cg"

type Props = {
  post: any
}

const Card = ({post}: Props) => {
  return (
    <a href={`/post/${post.title}?post_id=${post._id}`} className='w-[100%] mx-auto bg-gray-100 aspect-[8/4] md:aspect-[8/5] lg:aspect-[8/6] rounded-sm overflow-hidden flex flex-col justify-between cursor-pointer hover:shadow-md hover:shadow-slate-300 transition-all duration-150 hover:transition-all hover:duration-150'>
      <div className="w-[100%] h-[70%] md:[h-80%] overflow-hidden">

        <img src={post.src} alt="" className='w-[100%]  flex-grow object-cover bg-red-100'/>
      </div>
        <div className="my-1 h-[30%] md:h-[20%] flex flex-col justify-center ">
          <a className='underline text-sm font-bold px-2  '  href='#'>{post.title.slice(0,40) + "..."}</a>
          <a className='font-bold text-xs mx-2 mt-2 flex items-center' href="#">Read Post <CgArrowTopRight /> </a>
        </div>
    </a>
  )
}

export default Card

