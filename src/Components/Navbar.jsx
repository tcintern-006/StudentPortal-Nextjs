"use client"
import React, { useEffect, useState } from 'react'
import { coursesData, navbarData } from '@/app/Assets/data'
import { ButtonComp } from './ButtonComp'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getToken, setToken, removeToken } from "@/Components/auth";

export const Navbar = () => {
  const { links, btnText, socials } = navbarData
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [inputData, setInputData] = useState("");
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function getallCourses() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
      let { allCourses } = await res.json();
      setCourses(allCourses)
    }
    getallCourses();
  }, [])

  useEffect(() => {
    async function checkAuth() {
      const token = getToken();
      if (!token) {
        setIsLoggedIn(false);
        setCheckingAuth(false);
        return;
      }
      try {
        const res = await fetch(`${AUTH_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setIsLoggedIn(res.ok);
        if (!res.ok) removeToken();
      } catch (err) {
        console.log(err);
        setIsLoggedIn(false);
      } finally {
        setCheckingAuth(false);
      }
    }
    checkAuth();
  }, [])

  async function handleLogout() {
    try {
      const token = getToken();
      await fetch(`${AUTH_URL}/logout`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (err) {
      console.log(err);
    } finally {
      removeToken();
      setIsLoggedIn(false);
      router.push("/");
      router.refresh();
    }
  }

  const filterdData = inputData ? courses.filter((elem) => elem.title.toLocaleLowerCase().includes(inputData.toLowerCase())) : []

  function handleClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <nav className='fixed w-full z-[90]'>
      <div className="search w-screen flex gap-3">
        <div className='absolute top-5 left-1/2 -translate-x-1/2 md:pl-[16%] md:w-[70%]'>
          <input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            className='w-full p-2 border border-[#3123c170] outline-0 px-5 ring-1 ring-[#a8a8d649] bg-white'
            type="text"
            placeholder='Search courses...'
          />

          {
            inputData && (
              <div className="searching  w-full mt-1 border-2 bg-white shadow-lg z-40 gap-2 flex flex-col border-border py-1 px-2 text-center rounded-md ">
                {filterdData.length > 0 ? (
                  filterdData.map((e, idx) => (
                    <Link href={`/courses/${e.id}`} key={idx} className="text-foreground-muted border-border border py-1 px-2 text-sm rounded hover:bg-background-secondary">{e.title}</Link>
                  ))
                ) : (
                  <p className='text-foreground-muted text-sm'>No courses found.</p>
                )}
              </div>
            )
          }
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80%] md:hidden"
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

        <div className="sign-in flex flex-col justify-center gap-3 items-center border-t border-[#3123c170] p-4">
          {checkingAuth ? null : isLoggedIn ? (
            <ButtonComp text="Logout" onClick={handleLogout} />
          ) : (
            <>
              <ButtonComp text={btnText} href='/login' />
              <ButtonComp text='Signup' href='/register' />
            </>
          )}
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
