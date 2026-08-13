import Image from "next/image";
import { homeData } from "./Assets/data";
import { ButtonComp } from "@/Components/ButtonComp";
import { FeatureCards } from "@/Components/FeatureCards";



async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
  const data = await res.json();
  return data.allCourses || [];
}

export default async function Home() {


  let courses = await getData();
  const featureData = courses?.filter((e) => e.feature == true);


  const { title, description, btn, btnDesc, logos, HeroImage, logoText } = homeData;
  return (
    <>

      <section className=" min-h-screen bg-background text-foreground px-8  pt-24 md:pt-2 flex flex-col flex-1 items-center justify-center font-sans md:pl-[16%]">
        <div className="main flex relative ">
          <div className="text md:w-[50%] flex flex-col items-start justify-center text-start gap-4">
            <h1 className="text-4xl">{title}</h1>
            <h2 className="text-2xl md:w-[90%]">{description}</h2>
            <ButtonComp text={btn} />
            <p className="text-sm ">{btnDesc}</p>
          </div>
          <div className="photo hidden  md:absolute top-6 right-10 md:flex items-center justify-center">
            <Image
              src={HeroImage}
              alt="Hero Image"
              width={300}
              height={300}
            />
          </div>
        </div>




        <div className="Customerslogos bg-background-secondary mt-10  py-3 px-4 rounded-lg flex flex-col items-center justify-center gap-4">
          <div className="">
            <p>{logoText}</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 ">
            {
              logos.map((logo, idx) => {
                return (
                  <div key={idx}>
                    <Image src={logo} alt="Customer Logo" width={70} height={70} />
                  </div>

                )
              })
            }
          </div>
        </div>

      </section>
      <FeatureCards feature={featureData} />
    </>
  );
}
