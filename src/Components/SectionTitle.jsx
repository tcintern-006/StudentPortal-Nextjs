import React from 'react'

export const SectionTitle = ({title , description}) => {
  return (
     <div>
      <h1 className='text-4xl md:text-4xl font-bold text-center mb-4'>{title}</h1>
      <h2 className='text-xl md:text-2xl text-center text-gray-600'>{description}</h2>
    </div>
  )
}
