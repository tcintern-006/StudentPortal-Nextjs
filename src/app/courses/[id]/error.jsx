"use client"

export default function Error({ error, reset }) {



    return (
        <div className='w-full flex flex-col gap-4 justify-center items-center py-20 min-h-screen md:pl-[18%]'>
            <p className='text-lg text-red-500'>Couldn't load this course. Please try again.</p>
            <button
                onClick={() => reset()}
                className='border border-[#7F22FE] text-[#7F22FE] px-4 py-2 rounded-md hover:bg-[#7F22FE]/10'
            >
                Try again
            </button>
        </div>
    );
}