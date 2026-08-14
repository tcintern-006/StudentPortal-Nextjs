"use client"
import { coursesData } from '@/app/Assets/data';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ButtonComp } from './ButtonComp';
import Link from 'next/link';
import Loading from '@/app/courses/[id]/loading';


export const Cards = ({ filter }) => {

    const [courses, setCourses] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);

    useEffect(() => {

        async function fetchData() {

            setErrors(null);
            setLoading(true)
            try {


                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
                if (!res.ok) {
                    throw new Error(`Failed to fetch course: ${res.status}`);
                }
                const { allCourses } = await res.json();
                setCourses(allCourses);



            } catch (error) {
                console.log("Error while fetching cources")
                setErrors("Couldn't load courses. Please try again.");

            } finally {
                setLoading(false)
            }

        }


        if (filter) {
            setCourses(filter);
            setLoading(false);
        } else {
            fetchData();
        }
    }, [filter]);

    if (isLoading) {
        return <Loading />
    }

    if (errors) {
        return (
            <div className='w-full flex justify-center items-center py-20'>
                <p className='text-lg text-red-500'>{errors}</p>
            </div>
        );
    }


    return (
 <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-hidden'>
    {courses.map((elem, idx) => {
        return (
            <Link key={idx} href={`/courses/${elem.id}`} className='h-full'>
                <div className='flex flex-col justify-between h-full mt-3 ml-2 p-4 border border-[#8080802f] rounded-lg transition-all duration-300 hover:scale-[1.02] hover:border-[#7F22FE]/50 hover:shadow-[0_0_20px_2px_#7F22FE1a] cursor-pointer'>

                    <div className='upper-part flex flex-col gap-3'>

                        <div className='img w-full h-[200px] overflow-hidden rounded-lg bg-gray-100'>
                            <Image
                                className='w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105'
                                src={elem.img}
                                alt={elem.title}
                                width={300}
                                height={200}
                            />
                        </div>

                        <div className='bubbles flex items-center gap-3 w-full'>
                            {elem.bubbles.map((e, idx) => {
                                return (
                                    <span
                                        key={idx}
                                        className='w-full truncate px-2 py-1 border border-[#8080805c] rounded-md text-[11px] text-gray-600 text-center'
                                    >
                                        {e}
                                    </span>
                                )
                            })}
                        </div>

                        <h2 className='px-1 text-xl font-semibold leading-6 line-clamp-2'>
                            {elem.title}
                        </h2>

                        <p className='px-1 text-sm leading-5 text-gray-600 line-clamp-2 min-h-[40px]'>
                            {elem.description}
                        </p>

                    </div>

                    <div className='lower-part flex flex-col gap-4 mt-5'>

                        <div className='price flex flex-col gap-2'>

                            <div className='flex items-center gap-2'>
                                <span className='text-lg font-semibold'>
                                    ${elem.price}
                                </span>

                                <span className='text-sm text-gray-500 line-through'>
                                    ${elem.original_price}
                                </span>
                            </div>

                            <span className='w-fit text-xs font-medium text-yellow-400'>
                                {elem.off}
                            </span>

                        </div>

                        <ButtonComp text='Enroll Now' />

                    </div>

                </div>
            </Link>
        )
    })}
</div>

    )
}
