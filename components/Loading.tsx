import React from 'react'

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <img  src="/rolling.svg" alt="" />
    </div>
  )
}

export default Loading