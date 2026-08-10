"use client"
import React, { useState } from 'react'
import { coursesData } from '../Assets/data'
import { Cards } from '@/Components/Cards'
import { SectionTitle } from '@/Components/SectionTitle'
import { AddCourse } from '@/Components/AddCourse'


export default function page() {
  const {title , description} = coursesData
   const [refreshKey, setRefreshKey] = useState(0);

  return (
   <section className=' hero-glow overflow-hidden   px-8  pt-28 md:pt-25  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>
    <SectionTitle title = {title} description = {description} />
    <Cards key={refreshKey} />
    <AddCourse onCourseAdded={() => setRefreshKey(prev => prev + 1)}/>    
   </section>
  )
}
