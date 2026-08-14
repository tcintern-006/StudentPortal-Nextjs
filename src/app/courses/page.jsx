"use client"
import React, { useEffect, useState } from 'react'
import { coursesData } from '../Assets/data'
import { Cards } from '@/Components/Cards'
import { SectionTitle } from '@/Components/SectionTitle'
import { AddCourse } from '@/Components/AddCourse'
import { getToken } from '@/Components/auth'


export default function page() {
  const { title, description } = coursesData
  const [refreshKey, setRefreshKey] = useState(0);
  const AUTH_URL = process.env.NEXT_PUBLIC_API_URL;
  const [role, setRole] = useState('user');

  useEffect(() => {
    const token = getToken();


    async function checkRole() {

      if (!token) {
        return;
      }
      try {
        const res = await fetch(`${AUTH_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json()
        setRole(data.user.role)

      } catch (error) {
        console.log(error)
      }
    }
    checkRole()

  }, [])

  return (
    <section className=' hero-glow overflow-hidden   px-8  pt-28 md:pt-25  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>
      <SectionTitle title={title} description={description} />
      <Cards key={refreshKey} />
      {role === 'admin' && (
        <AddCourse onCourseAdded={() => setRefreshKey(prev => prev + 1)} />
      )}
    </section>
  )
}
