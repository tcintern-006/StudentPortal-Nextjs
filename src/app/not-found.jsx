import Link from 'next/link'
import { ButtonComp } from '@/Components/ButtonComp'

export default function NotFound() {
  return (
    <section className="hero-glow min-h-screen flex flex-col items-center justify-center gap-4 text-center px-8 md:pl-[18%]">
      <span className="icon-[lucide--file-question] w-16 h-16 text-[#7F22FE]"></span>
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="text-2xl font-semibold">Page Not Found</h2>
      <p className="text-gray-400 max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link href="/">
        <ButtonComp text="Back to Home" />
      </Link>
    </section>
  )
}