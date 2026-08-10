"use client"
import { coursesData } from '@/app/Assets/data';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { ButtonComp } from './ButtonComp';
import Link from 'next/link';
import Loading from '@/app/courses/[id]/loading';


export const Cards = ({ filter  }) => {

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
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 overflow-hidden'>
            {
                courses.map((elem, idx) => {
                    return (
                        <Link key={idx} href={`/courses/${elem.id}`}>

                            <div className='flex flex-col mt-3 ml-2 justify-between border  border-[#8080802f] rounded-lg p-4 transition-all duration-300 hover:scale-[1.02] hover:border-[#7F22FE]/50 hover:shadow-[0_0_20px_2px_#7F22FE1a] cursor-pointer '>
                                <div className="upper-part flex flex-col gap-3">
                                    <div className="img flex justify-center ">
                                        <Image className='rounded-lg' src={elem.img} alt={elem.title} width={300} height={200} />
                                    </div>
                                    <div className="bubbles w-full flex justify-start items-center text-center pl-2 gap-5">
                                        {elem.bubbles.map((e, idx) => {
                                            return (
                                                <span className='border border-[#8080808e] text-[0.6rem] rounded-lg p-1 w-full' key={idx}>{e}</span>
                                            )
                                        })}
                                    </div>
                                    <h2 className='p-1 text-2xl'>{elem.title}</h2>
                                </div>
                                <div className="lower-part flex flex-col gap-4">
                                    <div className="price flex flex-col gap-5 w-full">
                                        <h3>Price: {elem.price} <span>  ${elem.orignalPrice}</span></h3>
                                        <h3 className='text-sm text-yellow-300'>{elem.off}</h3>
                                    </div>
                                    <ButtonComp text={elem.btnText} />
                                </div>
                            </div>
                        </Link>
                    )
                })
            }
        </div>

    )
}
