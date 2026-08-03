import { notFound } from "next/navigation";      
import { coursesData } from "@/app/Assets/data";
import { CourseCard } from "@/Components/CourseCard";



export default async function page({ params }) {
  const { slug } = await params;
  const { courses } = coursesData;

  const pageData = courses.find((e) => e.slug == slug);
   if (!pageData) notFound(); 

  return (
    <section className="hero-glow overflow-hidden px-8 pt-28 md:pt-25 flex flex-col gap-6 items-center justify-center font-sans md:pl-[18%] min-h-screen">
      <CourseCard data={pageData} />
    </section>
  )
}
