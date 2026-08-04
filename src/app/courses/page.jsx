import React from 'react'
import { coursesData } from '../Assets/data'
import { Cards } from '@/Components/Cards'
import { SectionTitle } from '@/Components/SectionTitle'


export default function page() {
  const {title , description} = coursesData
  return (
   <section className=' hero-glow overflow-hidden   px-8  pt-28 md:pt-25  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>
    <SectionTitle title = {title} description = {description} />
    <Cards/>
   </section>
  )
}
