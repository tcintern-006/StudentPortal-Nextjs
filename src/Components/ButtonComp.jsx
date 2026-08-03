import React from 'react'

export const ButtonComp = ({text}) => {
  return (
  <button className='border border-[#808080a1] p-2 px-4 rounded-md cursor-pointer hover:bg-[#8080802f] transition-all duration-300 active:scale-95'>
  {text}
</button>
  )
}
