import React from 'react'
import { Cards } from './Cards'
import { SectionTitle } from './SectionTitle'
import { featureHead } from '@/app/Assets/data'

export const FeatureCards = ({ feature}) => {
  const {title , subtitle} = featureHead


  return (
    <div className=' min-h-screen   bg-background text-foreground px-8  pt-24 md:pt-2 flex flex-col  items-center justify-center font-sans md:pl-[16%] gap-8'>
      <SectionTitle title = {title} description = {subtitle} />      
      <Cards filter = {feature}/>
      </div>
  )
}
