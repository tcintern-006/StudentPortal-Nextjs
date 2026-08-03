import Image from 'next/image';
import React from 'react'
import { ButtonComp } from './ButtonComp';


export const CourseCard = ({data}) => {
    const obj = data;

    
  return (
    <div className='flex flex-col justify-center items-center gap-3 '>
        <div className="left  w-[50%] flex flex-col gap-5">
            <p className='text-amber-800'>CREATE CODE CONQURE</p>
            <div className='flex flex-col gap-5'>
                <h1 className='text-3xl'>{obj.title}</h1>
                <p className='text-[#852a2ab0]'>{obj.description}</p>
            </div>
            <div>
                <h2 className='text-amber-300'>Price: {obj.price}</h2>
            </div>
            <div>
                <ButtonComp text={obj.btn1}/>
                <ButtonComp text={obj.btn2}/>
            </div>
        </div>
        <div className="right flex  flex-col gap-3 border-2 w-[50%] border-[#8080802f] rounded-lg p-4">
            <div className="">
              <Image className='rounded-lg' src={obj.img} alt={obj.title} width={400} height={300} />
            </div>
            <div className="bubbles">
                   { obj.bubbles.map((e , idx )=>{
                                        return (
                                            <span key={idx}  className='border border-[#8080808e] text-[0.6rem] rounded-lg p-1 w-full'key={idx}>{e}</span>
                                        )
                                    })}
            </div>
        </div>

    </div>
  )
}
