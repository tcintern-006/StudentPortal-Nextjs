import { notFound } from "next/navigation";
import { coursesData } from "@/app/Assets/data";
import { CourseCard } from "@/Components/CourseCard";
import { Cards } from "@/Components/Cards";
import { SectionTitle } from "@/Components/SectionTitle";





export default async function page({ params }) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses/${id}`);

  if (!res.ok) {
    throw new Error(`Failed to fetch course: ${res.status}`);
  }

  const { Course } = await res.json();

  if (!Course) notFound();


  return (
    <section className="hero-glow overflow-hidden px-8 pt-28 md:pt-25 flex flex-col gap-6 items-center justify-center font-sans md:pl-[18%] min-h-screen">
      <CourseCard data={Course} />
      <SectionTitle title={"Related Course"} />
      <Cards />
    </section>
  )
}
