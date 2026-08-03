import React from 'react'
import { coursesData } from '../Assets/data'
import { Cards } from '@/Components/Cards'

export default function page() {
  const {title , description} = coursesData
  return (
   <section className=' hero-glow overflow-hidden   px-8  pt-28 md:pt-25  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>
    <div>
      <h1 className='text-4xl md:text-4xl font-bold text-center mb-4'>{title}</h1>
      <h2 className='text-xl md:text-2xl text-center text-gray-600'>{description}</h2>
    </div>
    <Cards/>
   </section>
  )
}
