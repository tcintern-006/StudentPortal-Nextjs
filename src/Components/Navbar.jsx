"use client"
import React, { useState } from 'react'
import { navbarData } from '@/app/Assets/data'
import { ButtonComp } from './ButtonComp'
import Link from 'next/link'

export const Navbar = () => {
  const { links, btnText, socials } = navbarData
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className='fixed w-full z-[90]'>
      <div className="search w-screen flex gap-3">
        <div className='absolute top-5 left-1/2 -translate-x-1/2 md:pl-[16%] md:w-[70%]'>
          <input
            className='w-full p-2 border border-[#3123c170] outline-0 px-5 ring-1 ring-[#a8a8d649] bg-white'
            type="text"
            placeholder='Search courses , instructors...'
          />
        </div>
        <button
          onClick={handleClick}
          className='flex items-center absolute top-5 right-5 border border-[#e5e5e5] p-2 px-4 rounded-md cursor-pointer bg-white hover:bg-[#f5f5f5] transition-all duration-300 active:scale-95 md:hidden z-[95]'
        >
          <span className={isMenuOpen ? "icon-[lucide--x] w-4 h-4" : "icon-[lucide--menu] w-6 h-6"}></span>
        </button>
      </div>

      {isMenuOpen && (
        <div
          onClick={handleClick}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] md:hidden"
        ></div>
      )}

      <aside className={`${isMenuOpen ? 'left-0' : '-left-full'} z-[90] md:left-0 bg-white md:bg-white/90 backdrop-blur-md px-8 transition-all duration-300 fixed h-screen border-r border-[#3123c170] flex flex-col gap-5 pt-4 items-center md:w-[16%]`}>

        <div className="flex justify-center items-center gap-2 logo border-b border-[#3123c170] p-4">
          <span className="icon-[lucide--graduation-cap] h-5 w-5"></span>
          <h1 className="text-[#171717]">.Code</h1>
        </div>

        <ul className='flex flex-col gap-5 justify-items-start'>
          {links.map((elem, idx) => (
            <li key={idx} className='flex items-center gap-3 justify-start text-[#171717]'>
              <span className={elem.iconClass}></span>
              <Link href={elem.href}>{elem.name}</Link>
            </li>
          ))}
        </ul>

        <div className="sign-in flex justify-center items-center border-t border-[#3123c170] p-4">
          <ButtonComp text={btnText} />
        </div>

        <div className="socials">
          <ul className='border-t border-[#3123c170] p-4 flex flex-col gap-5'>
            {socials.map((elem, idx) => (
              <li className='flex gap-3 text-[#171717]' key={idx}>
                <span className={elem.iconClass}></span>
                <a href={elem.href}>{elem.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </nav>
  )
}
