import Image from 'next/image';
import React from 'react'
import { ButtonComp } from './ButtonComp';


export const CourseCard = ({data}) => {
    const obj = data;

    
  return (
   <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center'>

        <div className='left flex flex-col gap-5'>

            <p className='text-2xl font-medium tracking-wide text-amber-700'>
                CREATE CODE CONQURE
            </p>

            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight'>
                    {obj.title}
                </h1>

                <p className='text-sm sm:text-base leading-6 text-[#852a2ab0] max-w-xl'>
                    {obj.description}
                </p>
            </div>

            <div>
                <h2 className='text-xl sm:text-2xl font-semibold text-amber-500'>
                    Price: ${obj.price}
                </h2>
            </div>

            <div className='flex flex-wrap gap-3'>
                <ButtonComp text={obj.btn1} />
                <ButtonComp text={obj.btn2} />
            </div>

        </div>

        <div className='right w-full border border-[#8080802f] rounded-xl p-4 sm:p-5'>

            <div className='w-full aspect-[4/3] overflow-hidden rounded-lg'>
                <Image
                    className='w-full h-full object-cover rounded-lg'
                    src={obj.img}
                    alt={obj.title}
                    width={600}
                    height={450}
                />
            </div>

            <div className='flex flex-wrap gap-2 mt-4'>
                {obj.bubbles.map((e, idx) => {
                    return (
                        <span key={idx} className='border border-[#8080808e] text-xs rounded-md px-3 py-1.5 text-gray-600'>
                            {e}
                        </span>
                    )
                })}
            </div>

        </div>

    </div>
</div>
  )
}
