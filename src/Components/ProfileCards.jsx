import React from 'react'
import Image from 'next/image'
import { instructorsData } from '@/app/Assets/data'

export const ProfileCards = () => {
    const { instructors } = instructorsData;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">

            {

                instructors.map((elem, idx) => {
                    return (
                        <div key={idx} className="flex flex-col  md:items-center gap-6 border border-[#8080802f] rounded-lg p-6 transition-all duration-300 hover:border-[#7F22FE]/50 hover:shadow-[0_0_20px_2px_#7F22FE1a]">
                            <Image src={elem.pic} alt={elem.name} width={320} height={320} className="rounded-lg object-cover" />
                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl font-semibold">{elem.name}</h2>
                                <p className="text-sm text-[#7F22FE]">{elem.role}</p>
                                <p className="text-sm text-gray-400">{elem.bio}</p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    {elem.expertise.map((e, i) => (
                                        <span key={i} className="border border-[#8080808e] text-xs rounded-full px-3 py-1 whitespace-nowrap">
                                            {e}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}