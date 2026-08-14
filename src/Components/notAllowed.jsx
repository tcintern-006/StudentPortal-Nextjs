import Link from "next/link"



export default function NotAllowed({ message = "You must be logged in to view this page." }) {
    return (
        <div className="min-h-screen flex flex-col gap-4 bg-background text-foreground px-8 pt-24 md:pt-2 flex flex-col flex-1 items-center justify-center font-sans md:pl-[16%]">
            <p className='text-lg text-gray-500'>{message}</p>
            <Link className="bg-background-secondary px-3 py-1 rounded-md " href={'/login'} >Login</Link>
        </div>
    )
}