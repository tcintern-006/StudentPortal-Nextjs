import { ProfileCards } from '@/Components/ProfileCards'
import React from 'react'
import { instructorsData } from '../Assets/data'
import { SectionTitle } from '@/Components/SectionTitle';


export default function page() {
    const { title, description } = instructorsData;
    return (
        <section className='hero-glow min-h-screen overflow-hidden   px-8  pt-28 md:pt-25  flex flex-col gap-6  items-center justify-center font-sans md:pl-[18%]'>
            <SectionTitle title={title} description={description} />
            <ProfileCards />
        </section>
    )
}

