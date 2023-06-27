import React from 'react'
import Logo from './Logo'
import Header from './Header'



const Hero = () => {
  return (
    <header className='_container py-5'>
        <div className="w-[100%] flex flex-col">
            <Header />
            <div className="flex flex-col h-[500px] justify-center items-center ">
                <div className="font-bold text-8xl mt-10 mb-10">Janaka's Daily Blog</div>
                <div className="font-bold text-1xl">Welcome to Every Developers Favourite Blog</div>
            </div>
        </div>
    </header>
  )
}

export default Hero