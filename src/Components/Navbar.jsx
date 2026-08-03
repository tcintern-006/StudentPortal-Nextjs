"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { navbarData } from '@/app/Assets/data'
import { ButtonComp } from './ButtonComp'
import Link from 'next/link'


export const Navbar = () => {
    const { links, btnText, socials } = navbarData
    const text = btnText;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleClick() {
        setIsMenuOpen(!isMenuOpen);
    }
    return (
        <nav className='fixed'>
            <div className="search  w-screen flex gap-3">
                <div className='  absolute top-5 left-1/2 -translate-x-1/2 md:pl-[16%] md:w-[70%]' >
                    <span></span>
                    <input className='w-full p-2  border border-[#8080802f] outline-0 px-5 ring-1 ring-[#a8a8d649] ' type="text" placeholder='Search courses , instructors...' name="" id="" />
                </div>
                <button onClick={handleClick} className='flex items-center absolute top-5 right-5 border border-[#8080802f] p-2 px-4 rounded-md cursor-pointer  hover:bg-[#8080802f] transition-all duration-300 active:scale-95 md:hidden'>
                    <span className={isMenuOpen ? "icon-[lucide--x] w-4 h-4" : "icon-[lucide--menu] w-6 h-6"}></span>
                </button>
            </div>
          <aside className={`${isMenuOpen ? 'left-0 ' : '-left-full'} z-40 md:left-0 bg-white/90 backdrop-blur-md px-8 transition-all duration-300 fixed h-screen border-r border-[#e5e5e5] md:backdrop-blur-md md:bg-transparent flex flex-col gap-5 pt-4 items-center md:w-[16%]`}>

                <div className="flex justify-center items-center logo border-b-2 border-[#8080801e] p-4">
                    <span className="icon-[lucide--graduation-cap] h-5 w-5"></span>
                    <h1>.Code</h1>
                </div>
                <ul className='flex flex-col gap-5 justify-items-start'>
                    {links.map((elem, idx) => {
                        return (
                            <li key={idx} className='flex  items-center gap-3 justify-start '>
                                <span className={elem.iconClass}></span>
                                <Link href={elem.href}>
                                    {elem.name}
                                </Link>
                            </li>
                        )
                    })}


                </ul>
                <div className="sign-in flex justify-center items-center border-t-2 border-[#8080801e] p-4">
                    <ButtonComp text={text} />
                </div>

                <div className="socials ">
                    <ul className='border-t-2 border-[#8080801e] p-4 flex flex-col gap-5'>
                        {
                            socials.map((elem, idx) => {
                                return (
                                    <li className='flex  gap-3 ' key={idx}>
                                        <span className={elem.iconClass}></span>
                                        <a href={elem.href}>{elem.name}</a>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            </aside>
        </nav>
    )
}
