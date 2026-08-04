import React from 'react'
import { AboutUsData } from '../Assets/data'
import { ButtonComp } from '@/Components/ButtonComp';
import { SectionTitle } from '@/Components/SectionTitle';


export default function page () {
    const {title ,subtitle, description} =  AboutUsData;
  return (
    <section className='hero-glow min-h-screen overflow-hidden   px-8  pt-15 md:pt-10  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>
         <SectionTitle title = {title} description = {subtitle} />
         
            <div className='flex flex-col  items-center w-[70%] gap-4'>
                <h2 className='text-xl md:text-2xl text-center text-gray-600'>{description}</h2>
                    <ButtonComp text={"Lets Connect"}/>
            </div>
        </section>
  )
}
